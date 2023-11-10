"use client";

import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function GetCoursesCardComp({
  init,
  buttonText,
  url,
  Header,
}: {
  init: (setCourse: React.Dispatch<React.SetStateAction<object>>) => void;
  buttonText: string;
  url: string;
  Header: string;
}): JSX.Element {
  //   const title = useRecoilValue(courseTitle);
  //   const imageLink = useRecoilValue(courseImage);

  const [course, setCourse] = useState({});

  useEffect(() => {
    init(setCourse);
  }, [init]);

  return (
    <div
      style={{
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <img src={course.imageLink} style={{ width: 350 }} />
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{course.title}</Typography>
          <Typography variant="h5">{course.description}</Typography>
          {/* <Typography variant="h5">{course.price}</Typography> */}
          <Price price={course.price} />
        </div>
      </Card>
    </div>
  );
}

function Price({ price }: { price: string }): JSX.Element {
  //   const price = useRecoilValue(coursePrice);
  return (
    <>
      <Typography style={{ color: "gray" }} variant="subtitle2">
        Price
      </Typography>
      <Typography variant="subtitle1">
        <b>Rs {price} </b>
      </Typography>
    </>
  );
}
