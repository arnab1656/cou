import { Grid, Typography, Button, Card } from "@mui/material";

export function UserError(): JSX.Element {
  return (
    <div>
      <Grid item lg={6} md={6} xs={12}>
        <Typography marginTop="210px" textAlign="center" variant="h2">
          Cant access User side with Admin auth
        </Typography>
      </Grid>
    </div>
  );
}
