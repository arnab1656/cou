import { Course, User, dbConnect } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type Data = {
  message: string;
};

export async function GET(req: Request) {
  await dbConnect();

  const requestHeaders = new Headers(req.headers);
  const courseId = requestHeaders.get("courseid");
  const username = requestHeaders.get("username");

  console.log(courseId);
  console.log(username);

  const course = await Course.findById(courseId);

  const user = await User.findOne({ username });

  console.log(user);

  if (course) {
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();

      return NextResponse.json({
        message: "Course purchased successfully",
        status: 200,
        course,
      });
    } else {
      return NextResponse.json({
        message: "user not found",
        status: 400,
      });
    }
  } else {
    return NextResponse.json({
      message: "course not found",
      status: 400,
    });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  return NextResponse.json({ message: "post of getcourse user" });
}

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<Data>
//   ) {
//     console.log("I am in the getcourse route ");

//     await dbConnect();

//     const courseId = req.headers.courseid;
//     console.log(courseId);
//     const username = req.headers.username;
//     console.log(username);

//     const course = await Course.findById(courseId);

//     const user = await User.findOne({ username });

//     console.log(user);

//     if (course) {
//       if (user) {
//         user.purchasedCourses.push(course);
//         await user.save();
//         res.json({ message: "Course purchased successfully", course });
//       } else {
//         res.json({ message: "User not found" });
//       }
//     } else {
//       res.json({ message: "Course not Found" });
//     }
//   }
