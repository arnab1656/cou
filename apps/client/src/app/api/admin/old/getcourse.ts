import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { dbConnect } from "db";
import { Course } from "db";

type Data = {
  course?: {};
  message?: string;
  // courseId?: string | string[] | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("I am in the getCourses route");

  await dbConnect();

  const courseId = req.headers.courseid;
  console.log(courseId);

  const course = await Course.findById(courseId);

  // console.log(course);

  if (course) {
    res.status(201).json({ message: "Course is fetched successfully", course });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
}
