import { User } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type Data = {
  message: string;
};

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const username = req.headers.username;

//   const user = await User.findOne({ username }).populate("purchasedCourses");

//   console.log(user);

//   if (user) {
//     res.json({ purchasedCourses: user.purchasedCourses });
//   } else {
//     res.status(403).json({ message: "User not found" });
//   }
// }

export async function GET(req: Request) {
  const requestHeaders = new Headers(req.headers);
  const username = requestHeaders.get("username");

  const user = await User.findOne({ username }).populate("purchasedCourses");

  if (user) {
    return NextResponse.json({
      message: "got purchased courses",
      status: 200,
      purchasedCourses: user.purchasedCourses,
    });
  } else {
    // res.status(403).json({ message: "User not found" });

    return NextResponse.json({
      message: "User not found",
      status: 403,
    });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  return NextResponse.json({
    message: "post of purchased courses",
    status: 200,
  });
}
