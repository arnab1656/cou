"use client";

import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { statusTokenCheckerPage } from "lib";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserDash, UserError } from "ui";
// import { useNavigate } from "react-router-dom";
// import { useRecoilValue } from "recoil";
// import { userEmailState } from "../store/selectors/userEmail";
// import { isUserLoading } from "../store/selectors/isUserLoading.js";

export default function DashBoard(): JSX.Element | undefined {
  // const navigate = useNavigate();
  // const userEmail = useRecoilValue(userEmailState);
  // const userLoading = useRecoilValue(isUserLoading);

  const session = useSession();
  console.log(session);
  const pathName = usePathname();
  const [roleStatus, SetRoleStatus] = useState("");

  console.log(session);

  useEffect(() => {
    statusTokenCheckerPage(session, pathName, SetRoleStatus);
  }, [session]);

  console.log("THe role is " + roleStatus);

  if (session.data) {
    if (pathName.includes("user") && roleStatus === "user") {
      return <UserDash username={session.data.user?.email} />;
    } else if (pathName.includes("user") && !roleStatus)
      return (
        <div>
          <UserError />
        </div>
      );
  } else {
    return (
      <div>
        <UserDash username={null} />
      </div>
    );
  }
}
