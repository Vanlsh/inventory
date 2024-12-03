"use server";

import { auth } from "@/auth/auth";
import { db } from "@/db";
import { TOrderSchema } from "@/schemas/order";
import { revalidatePath } from "next/cache";

export const createOrder = async (data: TOrderSchema) => {
  const user = await auth();

  if (!user) return { error: "Unauthenticated" };

  try {
    await db.orders.create({
      data: {
        title: data.title,
        description: data.description,
        user_id: user.user.user_id,
      },
    });
    revalidatePath("/order");
    return { success: "Order successfully created" };
  } catch (error) {
    return { error: "Something went when create order" };
  }
};

export const deleteOrder = async ({ orderId }: { orderId: number }) => {
  const user = await auth();

  if (!user) return { error: "Unauthenticated" };

  try {
    await db.orders.delete({
      where: {
        id: orderId,
      },
    });
    revalidatePath("/order");
    return { success: "Order successfully deleted" };
  } catch (error) {
    return { error: "Something went when delete order" };
  }
};
