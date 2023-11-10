import { NextApiRequest, NextApiResponse } from "next";
import { User } from "db";

type Data = {
  message?: string;
  purchasedCourse?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = req.headers.username;

  const user = await User.findOne({ username }).populate("purchasedCourses");

  console.log(user);

  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses });
  } else {
    res.status(403).json({ message: "User not found" });
  }
}
