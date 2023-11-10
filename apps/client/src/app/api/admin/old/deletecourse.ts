import { NextApiRequest, NextApiResponse } from "next";

import { Course } from "db";

type Data = {
  message?: string;
  name?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("I am in Delete course Route");

  const courseId = req.headers.courseid;
  console.log(courseId);

  const ret = await Course.deleteOne({ _id: courseId });

  console.log(ret.deletedCount);

  if (ret.deletedCount === 1) {
    res.json({ message: "Course Deleted successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
}
