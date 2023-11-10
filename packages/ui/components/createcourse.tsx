"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { BASE_URL } from "../config.js";

export function AddCourseComp({
  onClick,
}: {
  onClick: (
    title: string,
    description: string,
    image: string,
    price: number
  ) => void;
}): JSX.Element {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}
          varint="outlined"
        >
          <TextField
            fullWidth
            label="Title"
            onChange={(e) => {
              setTitle(e.target.value);

              console.log(title);
            }}
            style={{ marginBottom: 10 }}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Description"
            onChange={(e) => {
              setDescription(e.target.value);
              console.log(description);
            }}
            style={{ marginBottom: 10 }}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Image link"
            onChange={(e) => {
              setImage(e.target.value);
              console.log(image);
            }}
            style={{ marginBottom: 10 }}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Price"
            onChange={(e) => {
              setPrice(e.target.value);
              console.log(price);
            }}
            style={{ marginBottom: 10 }}
            variant="outlined"
          />

          <Button
            onClick={() => {
              onClick(title, description, image, price);
              router.push(
                `${process.env.NEXT_PUBLIC_BASE_URL}/admin/coursepage`
              );
            }}
            size="large"
            variant="contained"
          >
            {" "}
            Add course
          </Button>
        </Card>
      </div>
    </div>
  );
}
