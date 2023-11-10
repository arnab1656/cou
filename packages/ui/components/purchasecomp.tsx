"use client";

import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
// import axios from "axios";

export function PurchaseComp({
  init,
  buttonText,
  url,
}: {
  init: (
    setPurchasedCourses: React.Dispatch<React.SetStateAction<never[]>>
  ) => void;
  buttonText: string;
  url: string;
}): JSX.Element {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    init(setPurchasedCourses);
  }, [init]);

  // console.log(courses);

  if (purchasedCourses.length === 0) {
    return <div>No Purchased courses</div>;
  }
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {purchasedCourses.map((course) => {
        return <Course buttonText={buttonText} course={course} />;
      })}
    </div>
  );
}

function Course({
  course,
  buttonText,
}: {
  course: object;
  buttonText: string;
}): JSX.Element {
  // const navigate = useNavigate();
  const router = useRouter();
  console.log(router);

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
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Button
          onClick={() => {
            router.push(
              `${process.env.NEXT_PUBLIC_BASE_URL}/user/getcoursepage/${course._id}`
            );
          }}
          size="large"
          variant="contained"
        >
          {buttonText}
        </Button>
      </div>
    </Card>
  );
}
