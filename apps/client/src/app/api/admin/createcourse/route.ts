import { NextApiRequest, NextApiResponse } from "next";

import { Course } from "db";
import { dbConnect } from "db";
import { NextResponse } from "next/server";

type InputData = {
  title: String;
  description: String;
  price: Number;
  imageLink: String;
  published: Boolean;
};

type Data = {
  message?: string;
  course?: {};
};
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   console.log("I am in the createcourse route");

//   await dbConnect();

//   console.log(req.body);

//   // await Test.create(req.body);

//   const newCourse = new Course(req.body);
//   newCourse.save();

//   res
//     .status(200)
//     .json({ message: "The new course is created", course: newCourse });
// }

export async function GET(req: Request) {
  return new Response("Hello from get of createcourse route");
}

export async function POST(req: Request) {
  const body = await req.json();
  // console.log(body);

  await dbConnect();
  const newCourse = new Course(body);
  newCourse.save();

  return NextResponse.json({
    message: "course created successfully",
    status: "200",
    newCourse,
  });
}
