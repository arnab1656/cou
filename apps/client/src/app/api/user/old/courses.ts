// router.get("/courses", authenticateJwt, async (req, res) => {
//     const courses = await Course.find({ published: true });
//     res.json({ courses });
//   });

import { NextApiRequest, NextApiResponse } from "next";

import { User } from "db";
import { Course } from "db";

type Data = {
  message?: string;
  courses?: any;
};

const SECRET = "SECRET";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("I am in user Courses route");

  const courses = await Course.find({
    published: true,
  });

  res.json({ message: "All of your Courses", courses });
}
