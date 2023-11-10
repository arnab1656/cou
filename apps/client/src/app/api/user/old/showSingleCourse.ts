import { NextApiRequest, NextApiResponse } from "next";

import { Course } from "db";
import { User } from "db";
// import dbConnect from "db/src/lib/dbConnection";
import { dbConnect } from "db";

type Data = {
  course?: any;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("I am in the showSingleCourse route ");

  await dbConnect();

  console.log("Header");
  console.log(req.headers);

  const courseId = req.headers.courseid;
  console.log("I am from router " + courseId);

  const course = await Course.findById(courseId);
  console.log("I am from router " + course);

  if (course) {
    res.json({ message: "Course Found ", course });
  } else {
    res.json({ message: "Course not Found " });
  }
}
