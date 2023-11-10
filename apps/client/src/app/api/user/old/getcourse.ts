import { NextApiRequest, NextApiResponse } from "next";

import { Course } from "db";
import { User } from "db";
import { dbConnect } from "db";

type Data = {
  course?: {};
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("I am in the getcourse route ");

  await dbConnect();

  const courseId = req.headers.courseid;
  console.log(courseId);
  const username = req.headers.username;
  console.log(username);

  const course = await Course.findById(courseId);

  const user = await User.findOne({ username });

  console.log(user);

  if (course) {
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully", course });
    } else {
      res.json({ message: "User not found" });
    }
  } else {
    res.json({ message: "Course not Found" });
  }
}
