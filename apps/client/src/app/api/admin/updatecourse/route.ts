import { Course, dbConnect } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  message: string;
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

export async function GET(req: Request) {
  return new Response("Hello from get of updatecourse route");
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();

  console.log("I am in the post of update course route");

  const requestHeaders = new Headers(req.headers);
  const courseId = requestHeaders.get("courseid");

  console.log(courseId);
  console.log(body);

  const course = await Course.findByIdAndUpdate(courseId, body, {
    new: true,
  });

  if (course) {
    return NextResponse.json({
      message: " updated successfully",
      status: "200",
      course,
    });
  } else {
    return NextResponse.json({
      message: "cannot updated ",
      status: "400",
    });
  }
}
