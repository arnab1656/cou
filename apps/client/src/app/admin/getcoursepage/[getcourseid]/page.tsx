"use client";

import axios from "axios";
import { AdminError, GetCoursesCardComp } from "ui";
// import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loginpage from "../../loginpage/page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { statusTokenCheckerPage } from "lib";

export default function GetCoursePage({
  params,
}: {
  params: { getcourseid: string };
}) {
  const session = useSession();
  const courseid = params.getcourseid;

  // console.log(session);
  console.log(courseid);

  const pathName = usePathname();
  const [roleStatus, SetRoleStatus] = useState("");

  useEffect(() => {
    statusTokenCheckerPage(session, pathName, SetRoleStatus);
  }, [session]);

  console.log("roleStatus = " + roleStatus);

  if (session.data) {
    if (pathName.includes("admin") && roleStatus === "admin") {
      return (
        <div>
          <GetCoursesCardComp
            init={async (
              setCourses: React.Dispatch<React.SetStateAction<object>>
            ) => {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/getcourse`,
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
