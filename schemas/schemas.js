const Joi = require("joi");

const userQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(10).default(10),
  search: Joi.string(),
});

const userIdParamsSchema = Joi.object({
  id: Joi.string().required(),
});
// const updateCarSchema = Joi.object({
//   make: Joi.string().required(),
//   model: Joi.string().required(),
//   release_date: Joi.number()
//     .integer()
//     .min(1900)
//     .max(new Date().getFullYear())
//     .required(),
//   transmission_type: Joi.string()
//     .valid("MANUAL", "AUTOMATIC", "AUTOMATED_MANUAL", "DIRECT_DRIVE", "UNKNOWN")
//     .required(),
//   price: Joi.number().integer().min(1000).required(),
//   size: Joi.string().valid("Compact", "Midsize", "Large").required(),
//   style: Joi.string().required(),
// });

module.exports = { userQuerySchema, userIdParamsSchema };
