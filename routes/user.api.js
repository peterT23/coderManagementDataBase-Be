const express = require("express");
const validateSchema = require("../middleWare/validateSchema");
const { userQuerySchema, userIdParamsSchema } = require("../schemas/schemas");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
} = require("../controllers/user.controllers");

// CREATE
router.post("/", createUser);

// READ ALL USERS
router.get("/", validateSchema(userQuerySchema, "query"), getAllUsers);

//get user by id
router.get("/:id", validateSchema(userIdParamsSchema, "params"), getUserById);

// UPDATE
// router.put(
//   "/:id",
//   validateSchema(userIdParamsSchema, "params"),

//   editCar
// );

// // DELETE
// router.delete("/:id", validateSchema(carIdParamsSchema, "params"), deleteCar);

module.exports = router;
