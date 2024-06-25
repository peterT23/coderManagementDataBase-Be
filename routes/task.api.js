const express = require("express");
const {
  taskIdParamsSchema,
  taskQuerySchema,
  assignTaskToUserSchema,
  updateTaskBodySchema,
} = require("../schemas/taskSchema");
const validateSchema = require("../middleWare/validateSchema");
const {
  createTask,
  getAllTasks,
  getTaskById,
  assignTaskToUser,
  unAssignTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const router = express.Router();

// POST a new task / create new task
router.post("/", createTask);

// GET all tasks
router.get("/", validateSchema(taskQuerySchema, "query"), getAllTasks);

// GET a specific task by ID
router.get("/:id", validateSchema(taskIdParamsSchema, "params"), getTaskById);

// DELETE a task by ID
router.delete("/:id", validateSchema(taskIdParamsSchema), deleteTask);

// Assign task to user by ID
router.put(
  "/:id/assign",
  validateSchema(taskIdParamsSchema, "params"),
  validateSchema(assignTaskToUserSchema),
  assignTaskToUser
);
// // unAssign task to user By ID
router.put(
  "/:id/unassign",
  validateSchema(taskIdParamsSchema, "params"),
  unAssignTask
);

// PUT/update a task by ID with status or description
router.put(
  "/:id",
  validateSchema(taskIdParamsSchema, "params"),
  validateSchema(updateTaskBodySchema),
  updateTask
);

module.exports = router;
