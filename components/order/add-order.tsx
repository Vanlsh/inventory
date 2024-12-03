"use client";

import { createOrder } from "@/actions/order";
import { Plus } from "lucide-react";
import React, { useState, useTransition } from "react";
import Modal from "../modal";
import OrderForm from "../form/order-form";
import { TOrderSchema } from "@/schemas/order";

const AddOrder = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [isPending, handle] = useTransition();

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSubmit = (value: TOrderSchema) => {
    handle(async () => {
      try {
        const { error, success } = await createOrder(value);

        if (success) {
          setIsOpen(false);
          return;
        }
        console.error(error);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="border-4 flex items-center justify-center text-white border-green-500 bg-green-400 h-10 w-10 rounded-full  transition-opacity duration-300  hover:opacity-80 cursor-pointer"
      >
        <Plus size={16} />
      </button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add order"
        description="Modal to add products"
      >
        <OrderForm isPending={isPending} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default AddOrder;
