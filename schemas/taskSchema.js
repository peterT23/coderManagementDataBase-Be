const Joi = require("joi");

const taskQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(10).default(10),
  search: Joi.string(),
  description: Joi.string(),
  status: Joi.string().valid("pending", "working", "review", "done", "archive"),
});

const taskIdParamsSchema = Joi.object({
  id: Joi.string().required(),
});

const assignTaskToUserSchema = Joi.object({
  assignee: Joi.string().required(),
});

const updateTaskBodySchema = Joi.object({
  status: Joi.string()
    .valid("pending", "working", "review", "done", "archive")
    .required(),
});

module.exports = {
  taskIdParamsSchema,
  taskQuerySchema,
  assignTaskToUserSchema,
  updateTaskBodySchema,
};
