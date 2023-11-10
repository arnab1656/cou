import type { NextApiRequest, NextApiResponse } from "next";

import { Course } from "db";
import { dbConnect } from "db";
import { NextResponse } from "next/server";

interface CourseArray {}
[];

type Data = {
  courses: CourseArray;
};
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   console.log("I am in the courses route");

//   await dbConnect();

//   const course = await Course.find();

//   console.log(course);

//   res.status(200).json({ courses: course });
// }

export async function GET(req: Request) {
  console.log("I am in the courses route");

  await dbConnect();

  const courses = await Course.find();

  // console.log(course);

  return NextResponse.json({
    message: "courses of admin ",
    status: "200",
    courses,
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  return new Response(JSON.stringify({ hello: "post courses" }));
}
