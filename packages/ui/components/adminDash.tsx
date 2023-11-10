import { Grid, Typography, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { userEmailState } from "../store/selectors/userEmail";
// import { isUserLoading } from "../store/selectors/isUserLoading.js";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export function AdminDash({
  username,
}: {
  username: string | null | undefined;
}): JSX.Element {
  //   const navigate = useNavigate();
  //   const userEmail = useRecoilValue(userEmailState);
  //   const userLoading = useRecoilValue(isUserLoading);

  const router = useRouter();
  const session = useSession();
  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item lg={6} md={6} xs={12}>
          <div style={{ marginTop: 100 }}>
            <Typography variant="h2">
              Welcome{username ? ` ${username}` : ",be a Instructor"}
            </Typography>
            <Typography variant="h5">
              A place to Teach, Inspire and earn
            </Typography>
            {session.data ? (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    onClick={() => {
                      router.push(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/coursepage`
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
                        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/registerpage`
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
                        `${process.env.NEXT_PUBLIC_BASE_URL}/admin/loginpage`
                      );
                    }}
                    size="large"
                    variant="contained"
                  >
                    Sign in
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
