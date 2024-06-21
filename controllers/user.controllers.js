const { sendResponse, AppError } = require("../helpers/utils");
const Task = require("../models/Task");
const User = require("../models/User");

const userControllers = {};

//Create a user
userControllers.createUser = async (req, res, next) => {
  const info = req.body;
  try {
    if (!info) throw new AppError(400, "Bad request", "Create user error!");
    const existingUser = await User.findOne(info);
    console.log("ex", info);
    if (existingUser)
      throw new AppError(
        400,
        "Bad request",
        "name is already existed, please choose unique name"
      );
    const createdUser = await User.create(info);
    sendResponse(
      res,
      200,
      true,
      { data: createdUser },
      null,
      "Create User Success"
    );
  } catch (error) {
    next(error);
  }
};

//Get all user
userControllers.getAllUsers = async (req, res, next) => {
  try {
    let filter = {};
    const { page, limit, search: name } = req.query;
    if (name) filter.name = new RegExp(name, "i"); // case-insensitive name search
    const skip = (page - 1) * limit;
    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    sendResponse(res, 200, true, {
      message: "Get user list successfully",
      users,
      page,
    });
  } catch (error) {
    next(error);
  }
};

//getuser by id
userControllers.getUserById = async (req, res, next) => {
  try {
    const { id: targetId } = req.params;
    const user = await User.findById(targetId);
    if (!user) throw new AppError(404, "Bad request", "User not found");
    sendResponse(res, 200, true, { message: "get user successfully", user });
  } catch (error) {
    next(error);
  }
};
//get all task of user
userControllers.getTasksOfUser = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const user = await User.findById(userId);
    if (!user) throw new AppError(404, "Bad request", "User not found");
    const task = await Task.find({ assignee: userId });
    if (!task)
      throw new AppError(404, "Bad request", "user does not have task");

    sendResponse(res, 200, true, { task }, null, "Get user tasks success");
  } catch (error) {
    next(error);
  }
};

module.exports = userControllers;
