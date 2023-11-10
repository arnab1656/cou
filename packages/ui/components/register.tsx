"use client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// import axios from "axios";
// import { BASE_URL } from "../config.js";
// import { useNavigate } from "react-router-dom";
// import { useSetRecoilState } from "recoil";
// import { userState } from "../store/atoms/user.js";

export function RegisterComp({
  onClick,
  header,
  url,
}: {
  onClick: (email: string, password: string) => void;
  header: string;
  url: string;
}): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const setUser = useSetRecoilState(userState);

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">{header}</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 400, padding: 20 }} varint="outlined">
          <TextField
            fullWidth
            label="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            fullWidth
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            variant="outlined"
          />
          <br />
          <br />

          <Button
            onClick={() => {
              onClick(email, password);
            }}
            size="large"
            variant="contained"
          >
            {" "}
            Signup
          </Button>
        </Card>
      </div>
    </div>
  );
}
