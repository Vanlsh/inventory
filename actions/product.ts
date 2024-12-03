"use server";

import { auth } from "@/auth/auth";
import { db } from "@/db";
import { TProductSchema } from "@/schemas/product";
import { revalidatePath } from "next/cache";

interface IProductPayload {
  orderId: number;
  values: TProductSchema;
}

export const createProduct = async ({ orderId, values }: IProductPayload) => {
  const user = await auth();

  if (!user) return { error: "Unauthenticated" };

  const {
    serial_number,
    is_new,
    photo,
    title,
    type,
    specification,
    guaranty_end,
    guaranty_start,
    price_uah,
    price_usd,
  } = values;
  try {
    await db.product.create({
      data: {
        serial_number,
        is_new,
        photo,
        title,
        type,
        specification,
        order_id: orderId,
        user_id: user.user.user_id,

        guarantees: {
          create: {
            start_date: new Date(guaranty_start),
            end_date: new Date(guaranty_end),
          },
        },

        prices: {
          create: [
            {
              value: price_usd,
              symbol: "USD",
              is_default: false,
            },
            {
              value: price_uah,
              symbol: "UAH",
              is_default: true,
            },
          ],
        },
      },
    });
    revalidatePath("/order");
    return { success: "Product successfully created" };
  } catch (error) {
    console.log(error);

    return { error: "Something went when create Product" };
  }
};

export const deleteProduct = async ({ productId }: { productId: number }) => {
  const user = await auth();

  if (!user) return { error: "Unauthenticated" };

  try {
    await db.product.delete({
      where: {
        id: productId,
      },
    });
    revalidatePath("/order");
    return { success: "Product successfully deleted" };
  } catch (error) {
    return { error: "Something went when delete product" };
  }
};
