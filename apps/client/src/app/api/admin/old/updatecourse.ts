import { NextApiRequest, NextApiResponse } from "next";

import { Course } from "db";

type Data = {
  message?: string;
  name?: string;
};

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   console.log("I am in the signIn route and handler called by me");

//   const courseId = req.headers.courseid;
//   console.log(courseId);

//   const course = await Course.findByIdAndUpdate(courseId, req.body, {
//     new: true,
//   });

//   if (course) {
//     res.json({ message: "Course updated successfully" });
//   } else {
//     res.status(404).json({ message: "Course not found" });
//   }
// }
