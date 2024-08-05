const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minLength: [6, "Minimum password length is 6"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(6);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

//static function login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("incorrect email");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("incorrect password");
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
