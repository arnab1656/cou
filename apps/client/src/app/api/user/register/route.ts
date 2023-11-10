import { User, dbConnect } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type Data = {
  message: string;
};

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<Data>
//   ) {
//     console.log("I am in the User Register route");

//     await dbConnect();

//     const { username, password } = req.body;

//     console.log(username);
//     console.log(password);

//     const user = await User.findOne({ username });

//     console.log(user);

//     if (user) {
//       res
//         .status(403)
//         .json({ message: "User already exists", status: "403", user });
//     } else {
//       const newUser = new User({ username, password });
//       await newUser.save();

//       console.log(newUser);
//       const token = jwt.sign({ username, role: "user" }, SECRET, {
//         expiresIn: "1h",
//       });
//       res.status(200).json({
//         message: "User created successfully",
//         token,
//         status: "200",
//         newUser,
//       });
//     }
//   }

export async function GET(req: Request) {
  await dbConnect();

  // const body = await req.json();

  // console.log({ username, password });

  // const user = await User.findOne({ username });

  // if (user) {
  return NextResponse.json({
    message: "User exists",
    status: "200",
    // user,
  });
  // }

  // return NextResponse.json({ message: "get route in register" });
}

export async function POST(req: Request) {
  const SECRET = process.env.NEXT_SECRET;
  await dbConnect();
  const { username, password } = await req.json();
  const user = await User.findOne({ username });

  console.log(username, password);

  if (user) {
    return NextResponse.json({
      message: "User already exists",
      status: "403",
      user,
    });
  } else {
    const statusToken = jwt.sign({ username, role: "user" }, SECRET);

    const newUser = new User({ username, password, statusToken });
    await newUser.save();

    console.log(newUser);

    return NextResponse.json({
      message: "User created successfully",
      status: "200",
      newUser,
    });
  }
}
