"use client";

import { Courses } from "ui";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loginpage from "../loginpage/page";
import { useEffect, useState } from "react";
import { statusTokenCheckerPage } from "lib";
import { usePathname } from "next/navigation";

export default function CoursePage() {
  const session = useSession();
  const pathName = usePathname();
  const [roleStatus, SetRoleStatus] = useState("");

  console.log(session);
  console.log("HIiiii " + process.env.NEXT_PUBLIC_BASE_URL);

  useEffect(() => {
    statusTokenCheckerPage(session, pathName, SetRoleStatus);
  }, [session]);

  console.log("THe role is " + roleStatus);

  if (session.data) {
    if (pathName.includes("user") && roleStatus === "user") {
      console.log("hey you are real user");
      return (
        <div>
          <Courses
            init={async (
              setCourses: React.Dispatch<React.SetStateAction<never[]>>
            ) => {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/courses`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              console.log(response.data.courses);
              setCourses(response.data.courses);
            }}
            buttonText="Buy"
            buttonText2="View"
            url="http://localhost:3000/admin/getcoursepage"
          ></Courses>
        </div>
      );
    } else if (pathName.includes("user") && !roleStatus) {
      return <div>You are from admin and you cant be auth under user</div>;
    }
  } else {
    return <Loginpage />;
  }
}
