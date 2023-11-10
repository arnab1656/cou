"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { AddCourseComp, AdminError } from "ui";
import Loginpage from "../loginpage/page";
import { useEffect, useState } from "react";
import { statusTokenCheckerPage } from "lib";
import { usePathname } from "next/navigation";

export default function CreateCoursePage() {
  const session = useSession();

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
          <AddCourseComp
            onClick={async (title, description, image, price) => {
              await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/createcourse`,
                {
                  title,
                  description,
                  imageLink: image,
                  published: true,
                  price,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              alert("Added course!");
            }}
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
