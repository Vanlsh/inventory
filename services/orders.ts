import { db } from "@/db";
import { IOrder } from "@/types/order";

export enum Valuta {
  USD = "USD",
  UAH = "UAH",
}

export const getOrders = async (user_id: number): Promise<IOrder[]> => {
  const orders = await db.orders.findMany({
    where: { user_id },
    select: {
      id: true,
      title: true,
      date: true,
      description: true,
      _count: { select: { products: true } },
      products: {
        select: {
          prices: {
            select: {
              value: true,
              symbol: true,
              is_default: true,
            },
          },
        },
      },
    },
  });

  return orders.map((order) => {
    const { products, _count, ...rest } = order;

    const totals = products.reduce(
      (acc, product) => {
        product.prices.forEach((price) => {
          if (price.symbol === Valuta.UAH) acc.totalUAH += price.value;
          if (price.symbol === Valuta.USD) acc.totalUSD += price.value;
        });
        return acc;
      },
      { totalUAH: 0, totalUSD: 0 }
    );

    return {
      ...rest,
      ...totals,
      productCount: _count.products,
    };
  });
};
