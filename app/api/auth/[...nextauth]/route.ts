/* eslint-disable no-console */
// import axios from "axios";
import NextAuth, { AuthOptions, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import { User as APIUser } from "@/types/api/User";

export const OPTIONS: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) {
            return null;
          }

          //   const tokenRes = await axios.post(
          //     "https://api/auth/token/",
          //     {
          //       email: credentials.username,
          //       password: credentials.password,
          //     },
          //     {
          //       withCredentials: true,
          //     }
          //   );

          const tokenRes = {
            data: {
              access_token: "abc123",
            },
          };

          const userRes: { data: APIUser } = {
            data: {
              id: 1,
              email: "test@test.com",
              enabled: true,
              first_name: "Test",
              last_name: "User",
              userProfile: {
                site_admin: true,
                UUID: "27641cb7-c472-418b-9ba8-cb6a11947d21",
                description: "Test User",
              },
            },
          };

          //   if (tokenRes.status === 200) {
          //   const userRes = await axios.get<APIUser>("https://api/auth/user", {
          //     headers: {
          //       Authorization: `Bearer ${tokenRes.data.access_token}`,
          //     },
          //     withCredentials: true,
          //   });

          //   if (userRes.status === 200) {
          // This user object will be returned in the JWT, and will be available in the session
          // Include the access_token here so it can be used by your server on future requests

          const userData = userRes.data;

          const user: User = {
            id: userData.id.toString(),
            name: `${userData.first_name} ${userData.last_name}`,
            email: userData.email,
            apiUser: userData,
            access_token: tokenRes.data.access_token,
          };

          return Promise.resolve(user);
          //   }
          //   }

          //   return Promise.resolve(null);
        } catch (err) {
          console.error(err);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // if user is defined, it's the sign in process
      if (user) {
        token.access_token = user.access_token;
        token.apiUser = user.apiUser;
      }

      return token;
    },
    session: async ({ session, token }) => {
      // add access_token to session
      session.user.access_token = token.access_token;
      session.user.apiUser = token.apiUser;
      return session;
    },
  },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
