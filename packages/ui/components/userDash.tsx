"use client";

import { Grid, Typography, Button } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
// import { useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { userEmailState } from "../store/selectors/userEmail";
// import { isUserLoading } from "../store/selectors/isUserLoading.js";
import { useRouter } from "next/navigation";

export function UserDash({
  username,
}: {
  username?: string | null | undefined;
}): JSX.Element {
  //   const navigate = useNavigate();
  //   const userEmail = useRecoilValue(userEmailState);
  //   const userLoading = useRecoilValue(isUserLoading);

  const router = useRouter();
  const session = useSession();

  console.log(session);

  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item lg={6} md={6} xs={12}>
          <div style={{ marginTop: 100 }}>
            <Typography variant="h2">
              Welcome {username ? username : "to Coursera"}
            </Typography>
            <Typography variant="h5">A place to learn, do and earn</Typography>
            {session.data ? (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    onClick={() => {
                      router.push(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/user/coursepage`
                      );
                    }}
                    size="large"
                    variant="contained"
                  >
                    Courses
                  </Button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    onClick={() => {
                      router.push(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/user/registerpage`
                      );
                    }}
                    size="large"
                    variant="contained"
                  >
                    Sign Up
                  </Button>
                </div>
                <div style={{ marginRight: 10 }}>
                  <Button
                    onClick={() => {
                      router.push(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/user/loginpage`
                      );
                    }}
                    size="large"
                    variant="contained"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div />
        </Grid>
        <Grid item lg={6} md={6} style={{ marginTop: 20 }} xs={12}>
          <img
            alt="teacher"
            src="data:image/jpeg;base64,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"
            width="100%"
          />
        </Grid>
      </Grid>
    </div>
  );
}
