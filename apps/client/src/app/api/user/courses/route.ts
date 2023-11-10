import { Course, dbConnect } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type Data = {
  message: string;
};

export async function GET(req: Request) {
  console.log("I am from get route of courses user " + process.env.BASE_URL);

  await dbConnect();
  const courses = await Course.find({
    published: true,
  });

  return NextResponse.json({
    message: "got the courses",
    status: 200,
    courses,
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  return NextResponse.json({ message: "hello" });
}

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<Data>
//   ) {
//     console.log("I am in user Courses route");

//     const courses = await Course.find({
//       published: true,
//     });

//     res.json({ message: "All of your Courses", courses });
//   }
