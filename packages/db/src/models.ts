import mongoose, { model, models } from "mongoose";

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  statusToken: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  statusToken: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

export const User = models.User || model("User", userSchema);
export const Admin = models.Admin || model("Admin", adminSchema);
export const Course = models.Course || model("Course", courseSchema);
