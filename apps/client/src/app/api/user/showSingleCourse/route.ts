import { Course, User, dbConnect } from "db";
import { NextResponse } from "next/server";

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<Data>
//   ) {
//     console.log("I am in the showSingleCourse route ");

//     await dbConnect();

//     console.log("Header");
//     console.log(req.headers);

//     const courseId = req.headers.courseid;
//     console.log("I am from router " + courseId);

//     const course = await Course.findById(courseId);
//     console.log("I am from router " + course);

//     if (course) {
//       res.json({ message: "Course Found ", course });
//     } else {
//       res.json({ message: "Course not Found " });
//     }
//   }

export async function GET(req: Request) {
  await dbConnect();

  const requestHeaders = new Headers(req.headers);
  const courseId = requestHeaders.get("courseid");

  const course = await Course.findById(courseId);

  if (course) {
    return NextResponse.json({ message: "Course Found ", status: 200, course });
  } else {
    return NextResponse.json({
      message: "Course not  Found ",
      status: 400,
    });
  }
}

export async function POST(req: Request) {
  return NextResponse.json({
    message: "User show single post",
    status: "200",
  });
}
