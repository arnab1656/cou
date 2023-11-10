import { Grid, Typography, Button, Card } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { userEmailState } from "../store/selectors/userEmail";
// import { isUserLoading } from "../store/selectors/isUserLoading.js";

export function AdminError(): JSX.Element {
  //   const navigate = useNavigate();
  //   const userEmail = useRecoilValue(userEmailState);
  //   const userLoading = useRecoilValue(isUserLoading);

  return (
    <div>
      <Grid item lg={6} md={6} xs={12}>
        <Typography marginTop="210px" textAlign="center" variant="h2">
          Cant access admin side with user auth
        </Typography>
      </Grid>
    </div>
  );
}
