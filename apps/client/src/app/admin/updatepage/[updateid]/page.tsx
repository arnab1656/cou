"use client";

import { AdminError, UpdateCardComp } from "ui";
import { useSession } from "next-auth/react";
import axios from "axios";
import Loginpage from "../../loginpage/page";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { statusTokenCheckerPage } from "lib";

export default function UpdatePage({
  params,
}: {
  params: { updateid: string };
}) {
  const updateid = params.updateid;
  console.log(updateid);

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
          <UpdateCardComp
            onClick={async (
              title: string,
              description: string,
              image: string,
              price: string
            ) => {
              axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/updatecourse`,
                {
                  title,
                  description,
                  imageLink: image,
                  published: true,
                  price,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    courseid: updateid,
                  },
                }
              );
              // const updatedCourse = {
              //   _id: updateid,
              //   title,
              //   description,
              //   imageLink: image,
              //   price,
              // };
              // setCourse({ course: updatedCourse, isLoading: false });
            }}
          />
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
  } else {
    return <Loginpage />;
  }
}
