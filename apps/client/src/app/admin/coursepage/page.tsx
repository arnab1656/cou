"use client";

import { AdminError, Courses } from "ui";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loginpage from "../loginpage/page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { statusTokenCheckerPage } from "lib";

export default function CoursePage() {
  const session = useSession();
  console.log(session);
  const pathName = usePathname();
  const [roleStatus, SetRoleStatus] = useState("");

  useEffect(() => {
    statusTokenCheckerPage(session, pathName, SetRoleStatus);
  }, [session]);

  console.log("roleStatus = " + roleStatus);

  if (session.data) {
    if (pathName.includes("admin") && roleStatus === "admin") {
      console.log("You are a auth admin ");
      return (
        <div>
          <Courses
            init={async (
              setCourses: React.Dispatch<React.SetStateAction<never[]>>
            ) => {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/courses`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              //   console.log(response.data.courses);
              setCourses(response.data.courses);
            }}
            buttonText="Edit"
            url="http://localhost:3000/admin/getcoursepage"
          ></Courses>
        </div>
      );
    } else if (pathName.includes("admin") && !roleStatus) {
      return (
        <div>
          <AdminError />
        </div>
      );
    }
  } else {
    return <Loginpage />;
  }
}
