import axios from "axios";

export const statusTokenCheckerPage = async (
  session: any,
  pathName: string,
  SetRoleStatus: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  console.log("statusTokenCheckerPage function");
  console.log(
    "username from statusTokenCheckerPage function " + session.data?.user?.email
  );
  console.log("username from statusTokenCheckerPage function " + pathName);

  if (pathName.includes("admin")) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/statusToken`,
      {
        username: session.data?.user?.email,
      }
    );

    console.log("response data --> username");
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
