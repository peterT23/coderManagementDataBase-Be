// Import any necessary modules or dependencies

const { AppError, sendResponse } = require("../helpers/utils");
const Task = require("../models/Task");
const User = require("../models/User");

const taskController = {};

//create Task
taskController.createTask = async (req, res, next) => {
  // Logic to create a new task based on the request body

  const info = req.body;
  try {
    if (!info) throw new AppError(400, "Bad Request", "Create Task Error");
    // Send the created task as a response
    const created = await Task.create(info);

    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create Task Success"
    );
  } catch (error) {
    next(error);
  }
};

// get all tasks or search by name
taskController.getAllTasks = async (req, res, next) => {
  // Logic to get all tasks from the database
  try {
    let filter = { isDeleted: false };
    const { page, limit, search: name, description, status } = req.query;

    if (name) filter.name = new RegExp(name, "i"); // case-insensitive name search
    if (description) filter.description = new RegExp(name, "i");
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const task = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    // Send the tasks as a response
    sendResponse(res, 200, true, {
      message: "Get Task list successfully",
      task,
      page,
    });
  } catch (error) {
    next();
  }
};

//get tast by id

taskController.getTaskById = async (req, res, next) => {
  try {
    const { id: targetId } = req.params;
    const task = await Task.findById(targetId).populate("assignee");
    if (!task) throw new AppError(404, "Bad request", "Task not found");
    sendResponse(res, 200, true, { message: "get user successfully", task });
  } catch (error) {
    next(error);
  }
};

//assign task to user

taskController.assignTaskToUser = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const { assignee: userId } = req.body;

    const task = await Task.findById(taskId);
    if (!task) throw new AppError(404, "Bad request", "Task not found");
    if (task.assignee)
      throw new AppError(404, "Bad request", "Task is already assigned");

    const user = await User.findById(userId);
    if (!user) throw new AppError(404, "Bad request", "User doesnot exist");

    task.assignee = userId;
    await task.save();
    sendResponse(res, 200, true, {
      message: "Task assigned successfully",
      task,
    });
  } catch (error) {
    next(error);
  }
};

//unassign task to user

taskController.unAssignTask = async (req, res, next) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findByIdAndUpdate(
      taskId,
      { assignee: undefined },
      { new: true }
    );
    if (!task) throw new AppError(404, "Bad request", "Task not found");
    if (!task.assignee)
      throw new AppError(404, "Bad request", "Task is not assigned yet!");

    sendResponse(res, 200, true, {
      message: "Unassigned Task successfully!",
      task,
    });
  } catch (error) {
    next(error);
  }
};

//Update Task Status
taskController.updateTask = async (req, res, next) => {
  // Logic to update an existing task based on the request body and parameters
  try {
    const { id: taskId } = req.params;
    const { status } = req.body;

    // const task = await Task.findByIdAndUpdate(
    //   taskId,
    //   { status },
    //   { new: true }
    // );

    const task = await Task.findById(taskId);
    if (!task) throw new AppError(404, "Bad request", "Task not found");

    if (task.status === "done" && status !== "archive") {
      throw new AppError(
        400,
        "Bad request",
        "Cannot change status from 'done' to other values except 'archive'"
      );
    }
    task.status = status;
    await task.save();

    // Send the updated task as a response
    sendResponse(res, 200, true, { message: "update Task Successfully", task });
  } catch (error) {
    next(error);
  }
};

//softDeleteTask
taskController.deleteTask = async (req, res, next) => {
  // Logic to delete an existing task based on the request parameters
  try {
    // Send a success message as a response\
    const { id: taskId } = req.params;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { isDeleted: true },
      { new: true }
    );

    if (!task) throw new AppError(404, "Bad request", "Task not found");

    sendResponse(res, 200, true, { message: "delete Task successfully", task });
  } catch (error) {
    next(error);
  }
};

// Export the task controller object
module.exports = taskController;
