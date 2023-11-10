"use client";

import { RegisterComp, UserError } from "ui";
// import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { statusTokenCheckerPage } from "lib";
import { useState, useEffect } from "react";

export default function RegisterPage() {
  const session = useSession();
  const router = useRouter();
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
            alert(username);
            alert(password);
            alert("Checking for the existing user");

            const response = axios
              .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/exist`, {
                username,
                password,
              })
              .then(async (response) => {
                console.log("response status");
                console.log(response.data.status);

                if (response.data.status === 200) {
                  console.log(
                    "The username or the Email is already taken Try another"
                  );
                } else {
                  console.log("new user can register");

                  await signIn("credentials", {
                    username: username,
                    password: password,
                    redirect: false,
                    // callbackUrl: "/user/coursepage",
                    role: "user new",
                  });

                  router.push(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/user/coursepage`
                  );
                }
              });
          }}
          header="Welcome user register"
          url="http://localhost:3000/user/coursepage"
        />
      </div>
    );
  } else if (pathName.includes("user") && roleStatus === "user") {
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
  } else
    return (
      <div>
        <UserError />
      </div>
    );
}
