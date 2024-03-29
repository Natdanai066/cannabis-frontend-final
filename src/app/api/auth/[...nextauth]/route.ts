import { Backend_URL } from '../../../lib/Constants'; 
// import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
// import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions } from "next-auth";



async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(Backend_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token?.backendTokens?.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}


const authOptions: AuthOptions = {
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
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(Backend_URL + "/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);
          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (
        token.backendTokens &&
        new Date().getTime() < token.backendTokens.expiresIn
      ) {
        return token;
      }

      return await refreshToken(token);
    },
    

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },

    // async admin({ user, session }) {
    //   if (user && user.isAdmin) {
    //     session.isAdmin = true;
    //   }

    //   return session;
    // },
  },
};

const handler = NextAuth(authOptions);



export { handler as GET, handler as POST };
