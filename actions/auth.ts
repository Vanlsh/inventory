"use server";

import { TAuthSchema } from "@/schemas/auth";
import { saltAndHashPassword } from "@/lib/saltAndHashPassword";
import { db } from "@/db";

export const registerAction = async ({ name, password }: TAuthSchema) => {
  try {
    const hash = saltAndHashPassword(password);

    await db.user.create({
      data: {
        name,
        password: hash,
      },
    });
    return { success: "User created!" };
  } catch (error) {
    console.log(error);

    return { error: "Something went wrong!" };
  }
};
