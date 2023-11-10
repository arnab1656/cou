"use client";

// import { RegisterComp } from "ui";
// // import axios from "axios";
// import { signIn } from "next-auth/react";

// export default function DashBoard(): JSX.Element {
//   return <div> i am dashboard user</div>;
// }

import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { userEmailState } from "../store/selectors/userEmail";
// import { isUserLoading } from "../store/selectors/isUserLoading.js";

export default function Home(): JSX.Element {
  // const navigate = useNavigate();
  // const userEmail = useRecoilValue(userEmailState);
  // const userLoading = useRecoilValue(isUserLoading);
  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={"h2"}>Coursera User</Typography>
            <Typography variant={"h5"}>
              A place to learn, earn and grow
            </Typography>
            {/* {!userLoading && !userEmail && ( */}
            <div style={{ display: "flex", marginTop: 20 }}>
              <div style={{ marginRight: 10 }}>
                <Button
                  size={"large"}
                  variant={"contained"}
                  onClick={() => {
                    // navigate("/signup");
                  }}
                >
                  Signup
                </Button>
              </div>
              <div>
                <Button
                  size={"large"}
                  variant={"contained"}
                  onClick={() => {
                    // navigate("/signin");
                  }}
                >
                  Signin
                </Button>
              </div>
            </div>
            {/* )} */}
          </div>
          <div></div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <img
            src={
              "data:image/jpeg;base64,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"
            }
            width={"100%"}
            height={"100%"}
          />
        </Grid>
      </Grid>
    </div>
  );
}
