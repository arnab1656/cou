"use client";

import { AdminError, RegisterComp } from "ui";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { statusTokenCheckerPage } from "lib";
import { Button } from "@mui/material";

export default function RegisterPage() {
  const session = useSession();
  const router = useRouter();
  console.log(session);
  const pathName = usePathname();
  const [roleStatus, SetRoleStatus] = useState("");

  console.log(session);

  useEffect(() => {
    statusTokenCheckerPage(session, pathName, SetRoleStatus);
  }, [session]);

  console.log("THe role is " + roleStatus);
  if (!session.data) {
    return (
      <div>
        <RegisterComp
          onClick={async (username: string, password: string) => {
            alert("I am ans " + username + password);

            const response = axios
              .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/exist`, {
                username,
                password,
              })
              .then(async (response) => {
                console.log("response status");
                console.log(response.data.status);

                if (response.data.status === 200) {
                  alert("Username or email is alredy taken. Try with another");
                } else {
                  console.log("Now you can register as new admin");
                  await signIn("credentials", {
                    username: username,
                    password: password,
                    redirect: false,
                    // callbackUrl: "/user/coursepage",
                    role: "admin new",
                  });
                  router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin`);
                }
              });
          }}
          header="Welcome admin register"
          url="http://localhost:3000/admin/coursepage"
        />
      </div>
    );
  } else {
    if (pathName.includes("admin") && roleStatus === "admin") {
      return (
        <div>
          you are already logged In please signout for registering
          <Button
            onClick={() => {
              signOut();
            }}
            size="large"
            variant="contained"
          >
            {"  "}
            signout
          </Button>
        </div>
      );
    } else if (pathName.includes("admin") && !roleStatus) {
      return (
        <div>
          {" "}
          <AdminError />
        </div>
      );
    }
  }
}
