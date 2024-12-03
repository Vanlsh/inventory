"use client";

import { IOrder } from "@/types/order";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { ChevronRight, Trash2 } from "lucide-react";
import RoundedButton from "../rounded-button";
import { motion } from "framer-motion";
import { List, ListItem } from "./list";
import DeleteOrder from "./delete-order";

interface ITableProps {
  orders: IOrder[];
}

const Table = ({ orders }: ITableProps) => {
  const route = useRouter();
  const { orderId } = useParams();

  const handleRowClick = (id: number) => {
    route.push(`/order/${id}`);
  };

  return (
    <List fullWidth={!orderId}>
      {orders.map((order, i) => (
        <ListItem
          key={order.id}
          fullWidth={!orderId}
          onClick={() => handleRowClick(order.id)}
        >
          {!orderId && (
            <div className="block text-lg font-bold text-gray-700  hover:text-blue-500">
              {order.title}
            </div>
          )}

          <p className="text-sm text-gray-500">
            <span>{order.productCount}</span>
            <br /> Products
          </p>
          <div className="text-center ">
            <p className="text-gray-400 text-sm">
              {format(new Date(order.date), "dd / MM")}
            </p>
            <p>{format(new Date(order.date), "dd / MMM / yyyy")}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-xs">{order.totalUSD}$</p>
            <p>{order.totalUAH} UAN</p>
          </div>
          {!orderId && <DeleteOrder order={order} />}
          {Number(orderId) === order.id && (
            <motion.div
              className="absolute top-0 bottom-0 right-0 w-11 bg-gray-500 opacity-50 flex items-center justify-center rounded-e-md"
              initial={{ width: 0 }}
              animate={{ width: "2.75rem" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ChevronRight />
            </motion.div>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default Table;
