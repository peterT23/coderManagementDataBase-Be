var express = require("express");
var router = express.Router();
const { sendResponse, AppError } = require("../helpers/utils.js");
const userAPI = require("./user.api.js");
const taskAPI = require("./task.api.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send("welcome to coderManagement");
});

router.get("/codermanagement/:test", async (req, res, next) => {
  const { test } = req.params;
  try {
    //turn on to test error handling
    if (test === "error") {
      throw new AppError(401, "Access denied", "Authentication Error");
    } else {
      sendResponse(
        res,
        200,
        true,
        { data: "template" },
        null,
        "template success"
      );
    }
  } catch (err) {
    next(err);
  }
});

router.use("/users", userAPI);
router.use("/tasks", taskAPI);

module.exports = router;
