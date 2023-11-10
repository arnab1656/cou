import type { NextApiRequest, NextApiResponse } from "next";

import { Course } from "db";
import { dbConnect } from "db";

interface CourseArray {}
[];

type Data = {
  courses: CourseArray;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("I am in the courses route");

  await dbConnect();

  const course = await Course.find();

  console.log(course);

  res.status(200).json({ courses: course });
}
