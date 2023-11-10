"use client";

import Loginpage from "@/app/user/loginpage/page";
import axios from "axios";
import { statusTokenCheckerPage } from "lib";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GetCoursesCardComp, UserError } from "ui";

// import { useRouter } from "next/router";
// import { useRouter } from "next/router";
// import { useSession } from "next-auth/react";
// import Loginpage from "../loginpage";

export default function GetCoursePage({
  params,
}: {
  params: { getcourseid: string };
}) {
  const session = useSession();
  console.log(session);

  const courseid = params.getcourseid;

  console.log(courseid);

  const pathName = usePathname();
  const [roleStatus, SetRoleStatus] = useState("");

  console.log(session);

  useEffect(() => {
    statusTokenCheckerPage(session, pathName, SetRoleStatus);
  }, [session]);

  console.log("THe role is " + roleStatus);

  if (session.data) {
    if (pathName.includes("user") && roleStatus === "user") {
      return (
        <div>
          <GetCoursesCardComp
            init={async (
              setCourses: React.Dispatch<React.SetStateAction<object>>
            ) => {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/showSingleCourse`,

                {
                  headers: {
                    courseid,
                  },
                }
              );
              setCourses(response.data.course);
              console.log(response.data);
            }}
            buttonText="Update"
            url="http://localhost:3000/admin/updatepage"
            Header="hello fols"
          />
        </div>
      );
    } else if (pathName.includes("user") && !roleStatus)
      return (
        <div>
          <UserError />
        </div>
      );
  } else {
    return <Loginpage />;
  }
}
