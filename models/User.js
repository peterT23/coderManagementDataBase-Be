const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ["employee", "manager"],
      default: "employee",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// userSchema.pre(/^find/, function (next) {
//   if (!("_conditions" in this)) return next();
//   if (!("isDeleted" in userSchema.paths)) {
//     delete this["_conditions"]["all"];
//     return next();
//   }
//   if (!("all" in this["_conditions"])) {
//     //@ts-ignore
//     this["_conditions"].isDeleted = false;
//   } else {
//     delete this["_conditions"]["all"];
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
