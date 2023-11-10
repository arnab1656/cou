"use client";

// import axios from "axios";
import { LoginComp, UserError } from "ui";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import DashBoard from "../page";
import axios from "axios";
import { useEffect, useState } from "react";
import { statusTokenCheckerPage } from "lib";

export default function LoginPage() {
  const session = useSession();
  console.log(session);
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
        <LoginComp
          onClick={async (username: string, password: string) => {
            const response = axios
              .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/exist`,

                {
                  username,
                  password,
                }
              )
              .then(async (response) => {
                console.log("response status");
                console.log(response.data.status);

                if (response.data.status === 200) {
                  alert("You can login as user ");
                  await signIn("credentials", {
                    username: username,
                    password: password,
                    redirect: false,
                    // callbackUrl: "/user/coursepage",
                    role: "user old",
                  });
                  router.push(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/user/coursepage`
                  );
                } else {
                  alert("first register redirecting to register page");
                  router.push(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/user/registerpage`
                  );
                }
              });
          }}
          url="http://localhost:3000/user/coursepage"
          header="Welcome to user login"
        />
      </div>
    );
  } else if (pathName.includes("user") && !roleStatus) {
    return (
      <div>
        <UserError />
      </div>
    );
  } else {
    return <DashBoard />;
  }
}
