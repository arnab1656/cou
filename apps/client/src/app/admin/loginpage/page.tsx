"use client";

// import axios from "axios";
import { AdminError, LoginComp } from "ui";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { statusTokenCheckerPage } from "lib";
import DashBoard from "../page";

export default function Loginpage() {
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

  if (!session.data)
    return (
      <div>
        <LoginComp
          onClick={async (username: string, password: string) => {
            const response = axios
              .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/exist`, {
                username,
                password,
              })
              .then(async (response) => {
                console.log("response status");
                console.log(response.data.status);

                if (response.data.status === 200) {
                  console.log("Username exist you can login");
                  await signIn("credentials", {
                    username: username,
                    password: password,
                    redirect: false,
                    // callbackUrl: "/user/coursepage",
                    role: "admin old",
                  });
                  router.push(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/coursepage`
                  );
                } else {
                  alert("first register redirecting to register page");
                  router.push(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/registerpage`
                  );
                }
              });
          }}
          // url="http://localhost:3000/admin/coursepage"
          header="Welcome to admin login"
        />
      </div>
    );
  else if (pathName.includes("admin") && !roleStatus) {
    return (
      <div>
        <AdminError />
      </div>
    );
  } else {
    return <DashBoard />;
  }
}
