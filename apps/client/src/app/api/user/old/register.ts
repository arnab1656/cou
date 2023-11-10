import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { User } from "db";
import { dbConnect } from "db";

const SECRET = "SECRET";

type Data = {
  message?: string;
  token?: string;
  status: string;
  user?: {};
  newUser?: {};
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("I am in the User Register route");

  await dbConnect();

  const { username, password } = req.body;

  console.log(username);
  console.log(password);

  const user = await User.findOne({ username });

  console.log(user);

  if (user) {
    res
      .status(403)
      .json({ message: "User already exists", status: "403", user });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();

    console.log(newUser);
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "User created successfully",
      token,
      status: "200",
      newUser,
    });
  }
}
