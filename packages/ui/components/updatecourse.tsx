"use client";

import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function UpdateCardComp({
  onClick,
}: {
  onClick: (
    title: string,
    description: string,
    image: string,
    price: string
  ) => void;
}): JSX.Element {
  const router = useRouter();
  // const [courseDetails, setCourse] = useRecoilState(courseState);

  // const [title, setTitle] = useState(courseDetails.course.title);
  // const [description, setDescription] = useState(
  //   courseDetails.course.description
  // );
  // const [image, setImage] = useState(courseDetails.course.imageLink);
  // const [price, setPrice] = useState(courseDetails.course.price);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ maxWidth: 600, marginTop: 200 }} varint="outlined">
        <div style={{ padding: 20 }}>
          <Typography style={{ marginBottom: 10 }}>
            Update course details
          </Typography>
          <TextField
            fullWidth
            label="Title"
            onChange={(e) => {
              setTitle(e.target.value);
              // console.log(title);
            }}
            style={{ marginBottom: 10 }}
            value={title}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Description"
            onChange={(e) => {
              setDescription(e.target.value);
              // console.log(description);
            }}
            style={{ marginBottom: 10 }}
            value={description}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Image link"
            onChange={(e) => {
              setImage(e.target.value);
              // console.log(image);
            }}
            style={{ marginBottom: 10 }}
            value={image}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Price"
            onChange={(e) => {
              setPrice(e.target.value);
              // console.log(price);
            }}
            style={{ marginBottom: 10 }}
            value={price}
            variant="outlined"
          />

          <Button
            onClick={() => {
              onClick(title, description, image, price);
              router.push(
                `${process.env.NEXT_PUBLIC_BASE_URL}/admin/coursepage`
              );
            }}
            variant="contained"
          >
            {" "}
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}
