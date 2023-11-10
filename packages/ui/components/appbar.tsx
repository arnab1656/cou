"use client";

import { Typography, Button } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

// import { isUserLoading } from "../store/selectors/isUserLoading";
// import { useSetRecoilState, useRecoilValue } from "recoil";
// import { userState } from "../store/atoms/user.js";
// import { userEmailState } from "../store/selectors/userEmail";

export function Appbar(): JSX.Element {
  //   const navigate = useNavigate();
  //   const userLoading = useRecoilValue(isUserLoading);
  //   const userEmail = useRecoilValue(userEmailState);
  //   const setUser = useSetRecoilState(userState);

  const router = useRouter();

  const session = useSession();
  console.log(session);
  const pathName = usePathname();
  // console.log(pathName);

  const [roleStatus, SetRoleStatus] = useState("");

  const statusTokenChecker = async (): Promise<void> => {
    console.log("statusTokenChecker");
    console.log(session.data?.user?.email);

    if (pathName.includes("admin")) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/statusToken`,
        {
          username: session.data?.user?.email,
        }
      );

      console.log("response data username");
      console.log(response.data.decode.username);
      console.log("response data role");
      console.log(response.data.decode.role);
      SetRoleStatus(response.data.decode.role);
    } else {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/statusToken`,
        {
          username: session.data?.user?.email,
        }
      );
      console.log("response data username");
      console.log(response.data.decode.username);
      console.log("response data role");
      console.log(response.data.decode.role);
      SetRoleStatus(response.data.decode.role);
    }
  };

  useEffect(() => {
    void statusTokenChecker();
  }, [statusTokenChecker]);

  console.log(`roleStatus = ${roleStatus}`);
  if (session.data) {
    if (pathName.includes("admin") && roleStatus === "admin") {
      // return <div>app bar render only for Admin</div>;
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1,
          }}
        >
          <div
            style={{ marginLeft: 10, cursor: "pointer" }}
            //   onClick={() => {
            //     navigate("/");
            //   }}
          >
            <Typography
              onClick={() => {
                router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin`);
              }}
              variant="h6"
            >
              {session.data.user?.email}
            </Typography>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ marginRight: 10, display: "flex" }}>
              <div style={{ marginRight: 10 }}>
                <Button
                  onClick={() => {
                    router.push(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/createcoursepage`
                    );
                  }}
                >
                  Add courses
                </Button>
              </div>

              <div style={{ marginRight: 10 }}>
                <Button
                  onClick={() => {
                    router.push(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/coursepage`
                    );
                  }}
                >
                  Courses
                </Button>
              </div>

              <Button
                //   onClick={() => {
                //     localStorage.setItem("token", null);
                //     setUser({
                //       isLoading: false,
                //       userEmail: null,
                //     });
                //   }}
                onClick={() => {
                  void signOut({ redirect: false }).then(() => {
                    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/admin`);
                  });
                }}
                variant="contained"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      );
    } else if (pathName.includes("user") && !roleStatus) {
      return (
        <div style={{ marginLeft: "550px" }}>
          Cant access...Go back to admin side please
        </div>
      );
    } else if (pathName.includes("user") && roleStatus === "user") {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4,
            zIndex: 1,
          }}
        >
          <div
            style={{ marginLeft: 10, cursor: "pointer" }}
            //   onClick={() => {
            //     navigate("/");
            //   }}
          >
            <Typography
              onClick={() => {
                router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/user`);
              }}
              variant="h6"
            >
              {session.data.user?.email}
            </Typography>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ marginRight: 10, display: "flex" }}>
              <div style={{ marginRight: 10 }}>
                <Button
                  onClick={() => {
                    router.push(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/user/purchasedpage`
                    );
                  }}
                >
                  Purchased courses
                </Button>
              </div>

              <div style={{ marginRight: 10 }}>
                <Button
                  onClick={() => {
                    router.push(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/user/coursepage`
                    );
                  }}
                >
                  Courses
                </Button>
              </div>

              <Button
                //   onClick={() => {
                //     localStorage.setItem("token", null);
                //     setUser({
                //       isLoading: false,
                //       userEmail: null,
                //     });
                //   }}
                onClick={() => {
                  void signOut({ redirect: false }).then(() => {
                    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/user`);
                  });
                }}
                variant="contained"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      );
    } else if (pathName.includes("admin") && !roleStatus) {
      return (
        <div style={{ marginLeft: "550px" }}>
          Cant access...Go back to user side please
        </div>
      );
    }
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        zIndex: 1,
      }}
    >
      <div
        // onClick={() => {}}

        style={{ marginLeft: 10, cursor: "pointer" }}
      >
        <Typography
          onClick={() => {
            router.push(`/`);
          }}
          variant="h6"
        >
          Coursera
        </Typography>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Button
            onClick={() => {
              pathName.includes("user")
                ? router.push(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/user/registerpage`
                  )
                : router.push(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/registerpage`
                  );
            }}
            variant="contained"
          >
            Signup
          </Button>
        </div>
        <div>
          <Button
            onClick={() => {
              pathName.includes("user")
                ? router.push(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/user/loginpage`
                  )
                : router.push(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/admin/loginpage`
                  );
            }}
            variant="contained"
          >
            Signin
          </Button>
        </div>
      </div>
    </div>
  );
}
