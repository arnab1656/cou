"use client";

import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginComp({
  onClick,
  header,
  url,
}: {
  onClick: (email: string, password: string) => void;
  url?: string;
  header: string;
}): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // const setUser = useSetRecoilState(userState);

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
            Login
          </Button>
        </Card>
      </div>
    </div>
  );
}
