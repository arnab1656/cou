import { NextApiRequest, NextApiResponse } from "next";

import { Course } from "db";
import { NextResponse } from "next/server";

type Data = {
  message?: string;
  name?: string;
};

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   console.log("I am in Delete course Route");

//   const courseId = req.headers.courseid;
//   console.log(courseId);

//   const ret = await Course.deleteOne({ _id: courseId });

//   console.log(ret.deletedCount);

//   if (ret.deletedCount === 1) {
//     res.json({ message: "Course Deleted successfully" });
//   } else {
//     res.status(404).json({ message: "Course not found" });
//   }
// }

export async function GET(req: Request) {
  return new Response("Hello from get of deletecourse route");
}

export async function POST(req: Request) {
  const body = await req.json();

  console.log(body);

  console.log("I am in post Delete course Route");

  const requestHeaders = new Headers(req.headers);
  const courseid = requestHeaders.get("courseid");

  console.log(requestHeaders);

  console.log(courseid);

  const ret = await Course.deleteOne({ _id: courseid });

  console.log(ret);

  if (ret.deletedCount === 1) {
    return NextResponse.json({
      message: "deleted successfully",
      status: "200",
    });
  } else {
    return NextResponse.json({
      message: "not deleted successfully",
      status: "400",
    });
  }

  // return new Response(JSON.stringify({ body }));
}
