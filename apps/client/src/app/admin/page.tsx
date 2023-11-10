"use client";

import { statusTokenCheckerPage } from "lib";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminDash, AdminError, LoginComp } from "ui";

export default function DashBoard(): JSX.Element | undefined {
  const session = useSession();
  console.log(session);
  const pathName = usePathname();
  const [roleStatus, SetRoleStatus] = useState("");

  useEffect(() => {
    statusTokenCheckerPage(session, pathName, SetRoleStatus);
  }, [session]);

  console.log("roleStatus = " + roleStatus);
  if (!session.data) {
    return (
      <div>
        {" "}
        <AdminDash username={session.data} />;
      </div>
    );
  } else {
    if (pathName.includes("admin") && roleStatus === "admin") {
      return (
        <div>
          <AdminDash username={session.data?.user?.email} />
        </div>
      );
    } else if (pathName.includes("admin") && !roleStatus) {
      return (
        <div>
          <AdminError />
        </div>
      );
    }
  }
}
