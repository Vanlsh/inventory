"use client";

import { TProduct } from "@/types/product";

import RoundedButton from "../rounded-button";
import { Trash2 } from "lucide-react";
import ConfirmDeleteModal from "../delete-modal";
import { useState, useTransition } from "react";
import { deleteProduct } from "@/actions/product";

interface IDeleteProductProps {
  product: TProduct;
}

const DeleteProduct = ({ product }: IDeleteProductProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isPending, handle] = useTransition();

  const handleConfirmDelete = () => {
    handle(async () => {
      try {
        const { error, success } = await deleteProduct({
          productId: product.id,
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
    <>
      <RoundedButton onClick={() => setIsOpen(true)}>
        <Trash2 size={20} />
      </RoundedButton>
      <ConfirmDeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={handleConfirmDelete}
        isPending={isPending}
        title="Are you sure, you want delete the product?"
        description="Confirm delete products"
      >
        <div className="flex gap-3 px-5 py-2 border-t">
          <div className="flex items-center gap-5">
            <div className="w-3 h-3 bg-green-400 rounded-full" />
            {product.photo && (
              <img
                src={product.photo}
                alt={product.title}
                width={50}
                height={50}
              />
            )}
          </div>
          <div>
            <p className="underline">{product.title}</p>
            <p className="text-gray-400">{product.serial_number}</p>
          </div>
        </div>
      </ConfirmDeleteModal>
    </>
  );
};

export default DeleteProduct;
