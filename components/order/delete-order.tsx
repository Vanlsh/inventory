"use client";

import { useState, useTransition } from "react";
import { deleteOrder } from "@/actions/order";
import { IOrder } from "@/types/order";

import RoundedButton from "../rounded-button";
import ConfirmDeleteModal from "../delete-modal";
import { Trash2 } from "lucide-react";

interface IDeleteProductProps {
  order: IOrder;
}

const DeleteOrder = ({ order }: IDeleteProductProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isPending, handle] = useTransition();

  const handleConfirmDelete = () => {
    handle(async () => {
      try {
        const { error, success } = await deleteOrder({
          orderId: order.id,
        });
        if (success) {
          setIsOpen(false);
          return;
        }
        console.info(error);
      } catch (error) {
        console.info(error);
      }
    });
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <RoundedButton onClick={() => setIsOpen(true)}>
        <Trash2 size={20} />
      </RoundedButton>
      <ConfirmDeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleConfirmDelete}
        isPending={isPending}
        title="Are you sure, you want delete the order?"
        description="Confirm delete order"
      >
        <p className="flex px-5 py-2 border-t">{order.title}</p>
      </ConfirmDeleteModal>
    </div>
  );
};

export default DeleteOrder;
