import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      ADMIN: any;
      accessToken: any;
      id: number;
      email: string;
      name: string;
      role: string;
    };

    admin:{
      ADMIN: any;
      accessToken: any;
      id: number;
      email: string;
      name: string;
      role: Admin;
    }

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      ADMIN: any;
      accessToken: any;
      id: number;
      email: string;
      name: string;
      role: user;
    };

    admin:{
      ADMIN: any;
      accessToken: any;
      id: number;
      email: string;
      name: string;
      role: Admin;
    }

    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
