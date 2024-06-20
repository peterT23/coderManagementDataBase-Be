const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "wprking", "review", "done", "archive"],
      default: "pending",
    },
    assignee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

TaskSchema.pre(/^find/, function (next) {
  if (!("_conditions" in this)) return next();
  if (!("isDeleted" in TaskSchema.paths)) {
    delete this["_conditions"]["all"];
    return next();
  }
  if (!("all" in this["_conditions"])) {
    //@ts-ignore
    this["_conditions"].isDeleted = false;
  } else {
    delete this["_conditions"]["all"];
  }
  next();
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
