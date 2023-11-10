import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";

// import { ensureDbConnected } from "@/lib/dbConnect";
// import { Admin } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // GoogleProvider({
    //   clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    // }),
    // GithubProvider({
    //   clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    // }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "role", type: "text" },
      },
      async authorize(credentials, req) {
        console.log("Hey I am, called authorize");

        if (!credentials) {
          return null;
        }
        const username = credentials?.username;
        const password = credentials?.password;
        // Add logic here to look up the user from the credentials supplied
        console.log(" i     sdad a am " + credentials.role);

        if (credentials.role === "user new") {
          console.log("Hello i am in user new");

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/register`,
            {
              username,
              password,
            }
          );

          const data = response.data;

          return {
            id: data.newUser._id,
            email: data.newUser.username,
          };
        }
        if (credentials.role === "user old") {
          console.log("Hello i am in old user");

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`,
            {
              username,
              password,
            }
          );

          const data = response.data;
          console.log(data);

          return {
            id: data.user._id,
            email: data.user.username,
          };
        }

        if (credentials.role === "admin new") {
          console.log("Hello I am in admin new");

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/register`,
            {
              username,
              password,
            }
          );

          const data = response.data;

          console.log(data);
          return {
            id: data.newAdmin._id,
            email: data.newAdmin.username,
          };
        }
        if (credentials.role === "admin old") {
          console.log("Hello i am in admin old");

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/login`,
            {
              username,
              password,
            }
          );

          const data = response.data;

          console.log(data);
          return {
            id: data.admin._id,
            email: data.admin.username,
          };
        }
      },
    }),
  ] as Provider[],
  pages: {
    signIn: "/user/loginpage",
    // signOut: "/",
    // error: "/user/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/user/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: "Secr3T",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    encryption: true,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
