"use client";

import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export function Courses({
  init,
  buttonText,
  buttonText2,
  url,
}: {
  init: (setCourses: React.Dispatch<React.SetStateAction<never[]>>) => void;
  buttonText: string;
  buttonText2?: string;
  url: string;
}): JSX.Element {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    init(setCourses);
  }, [init]);

  // console.log(courses);
  console.log(`Hiiiii from courses comp ${process.env.NEXT_PUBLIC_BASE_URL}`);

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return (
          <Course
            buttonText={buttonText}
            buttonText2={buttonText2}
            course={course}
          />
        );
      })}
    </div>
  );
}

function Course({
  course,
  buttonText,
  buttonText2,
}: {
  course: object;
  buttonText: string;
  buttonText2?: string;
}): JSX.Element {
  // const navigate = useNavigate();

  const router = useRouter();
  const pathName = usePathname();
  const session = useSession();

  // console.log(pathName.includes("user"));

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign="center" variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign="center" variant="subtitle1">
        {course.description}
      </Typography>
      <img src={course.imageLink} style={{ width: 300, height: 300 }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: 20,
        }}
      >
        {pathName.includes("admin") ? (
          <div>
            <Button
              onClick={async () => {
                router.push(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/admin/updatepage/${course._id}`
                );
              }}
              size="large"
              variant="contained"
            >
              Update
            </Button>{" "}
            <Button
              onClick={async () => {
                router.push(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/admin/getcoursepage/${course._id}`
                );
              }}
              size="large"
              variant="contained"
            >
              View Card
            </Button>
          </div>
        ) : null}
        {pathName.includes("user") ? (
          <div>
            <Button
              onClick={async () => {
                // navigate(`/course/${course._id}`);

                const response = await axios.get(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/buycourse`,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                      courseid: course._id,
                      username: session.data.user?.email,
                    },
                  }
                );

                console.log(response.data);
                // setCourses(response.data.courses);

                alert("Course Succesfully Purchased");

                router.push(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/user/purchasedpage`
                );
              }}
              size="large"
              variant="contained"
            >
              {buttonText}
            </Button>{" "}
            <Button
              onClick={() => {
                router.push(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/user/getcoursepage/${course._id}`
                );
              }}
              size="large"
              variant="contained"
            >
              {buttonText2}
            </Button>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
