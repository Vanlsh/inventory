import { db } from "@/db";
import { TProduct } from "@/types/product";
import { ProductSubtype } from "@prisma/client";

export const getOrderProducts = async ({
  user_id,
  orderId,
}: {
  user_id: number;
  orderId: number;
}) => {
  const productsPromise = db.product.findMany({
    where: {
      order_id: orderId,
      user_id: user_id,
    },

    include: {
      prices: {
        select: {
          value: true,
          is_default: true,
          symbol: true,
        },
      },
      order: {
        select: {
          title: true,
        },
      },
      guarantees: {
        select: {
          end_date: true,
          start_date: true,
        },
      },
    },
  });

  const orderTitlePromise = db.orders.findUnique({
    where: {
      id: orderId,
    },
  });

  const [products, orderTitle] = await Promise.all([
    productsPromise,
    orderTitlePromise,
  ]);

  return {
    orderTitle: orderTitle?.title || "No title",
    products,
  };
};

interface IProductsPayload {
  user_id: number;
  query?: {
    type?: ProductSubtype;
  };
}

export const getProducts = ({
  user_id,
  query = {},
}: IProductsPayload): Promise<TProduct[]> => {
  return db.product.findMany({
    where: {
      user_id,
      ...query,
    },

    include: {
      prices: {
        select: {
          value: true,
          is_default: true,
          symbol: true,
        },
      },
      order: {
        select: {
          title: true,
        },
      },
      guarantees: {
        select: {
          end_date: true,
          start_date: true,
        },
      },
    },
  });
};
