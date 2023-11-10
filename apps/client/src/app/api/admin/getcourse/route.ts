import { Course, dbConnect } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type Data = {
  message: string;
};

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   console.log("I am in the getCourses route");

//   await dbConnect();

//   const courseId = req.headers.courseid;
//   console.log(courseId);

//   const course = await Course.findById(courseId);

//   // console.log(course);

//   if (course) {
//     res.status(201).json({ message: "Course is fetched successfully", course });
//   } else {
//     res.status(404).json({ message: "Course not found" });
//   }
// }

export async function GET(req: Request) {
  await dbConnect();

  const requestHeaders = new Headers(req.headers);
  const courseId = requestHeaders.get("courseid");

  const course = await Course.findById(courseId);

  // return new Response("Hello from get of getcourse route");

  console.log(course);

  if (course) {
    return NextResponse.json({
      message: "got the course successfully",
      status: "200",
      course,
    });
  } else {
    return NextResponse.json({
      message: "not got the course",
      status: "400",
    });
  }
}

export async function POST(req: Request) {
  console.log("I am in the post of  getCourses route");

  return new Response(JSON.stringify({ Message: "post get course" }));
}
