"use client";

import Loginpage from "@/app/user/loginpage/page";
import axios from "axios";
import { statusTokenCheckerPage } from "lib";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PurchaseComp, UserError } from "ui";

export default function PurchasePage(): JSX.Element | undefined {
  const session = useSession();
  console.log(session);

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
          <PurchaseComp
            init={async (
              setPurchasedCourses: React.Dispatch<React.SetStateAction<never[]>>
            ) => {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/purchasedcourses`,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    username: session.data.user?.email,
                  },
                }
              );

              console.log(response.data.purchasedCourses);
              setPurchasedCourses(response.data.purchasedCourses);
            }}
            buttonText="View Card"
            url="http://localhost:3000/admin/getcoursepage"
          ></PurchaseComp>
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
