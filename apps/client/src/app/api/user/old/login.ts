import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { User } from "db";
import { dbConnect } from "db";

type Data = {
  message: string;
  token?: string;
  status: string;
  user?: object;
};

const SECRET = "SECRET";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("I am in the User Signin");

  console.log(req.body);

  const { username, password } = req.body;

  await dbConnect();

  const user = await User.findOne({ username, password });

  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", status: "200", token, user });
  } else {
    res
      .status(403)
      .json({ message: "Invalid username or password", status: "404" });
  }
}
