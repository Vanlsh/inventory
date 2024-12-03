import { DefaultSession, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/db";

export const authConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        name: { label: "Username", type: "string" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.name || !credentials.password) {
          return null;
        }

        const { name, password } = credentials as {
          name: string;
          password: string;
        };

        const user = await db.user.findUnique({
          where: {
            name,
          },
        });

        if (!user) {
          throw new Error("Incorrect credential");
        }

        const isMatch = bcrypt.compareSync(password as string, user.password);

        if (!isMatch) {
          throw new Error("Incorrect credential");
        }

        return { name: user.name, user_id: user.id };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user_id = user.user_id;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.user_id = token.user_id as number;
      return session;
    },
  },
} satisfies NextAuthConfig;

declare module "next-auth" {
  interface User {
    user_id: number;
  }

  interface Session {
    user: {
      user_id: number;
    } & DefaultSession["user"];
  }
}
