import React from "react";
import AddOrder from "./add-order";
import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import Table from "./order-list";
import { getOrders } from "@/services/orders";

interface ILayout {
  children: React.ReactNode;
}

const Layout = async ({ children }: ILayout) => {
  const session = await auth();
  if (!session) redirect("/");

  const {
    user: { user_id },
  } = session;

  const orders = await getOrders(user_id);

  console.log("orders", orders);

  return (
    <>
      <div className="flex gap-4 items-center mb-14">
        <AddOrder />
        <p className="font-semibold text-lg">Orders / {orders.length}</p>
      </div>
      <div className="flex gap-2 items-start">
        <Table orders={orders} />
        {children}
      </div>
    </>
  );
};

export default Layout;
