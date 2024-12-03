"use client";

import { createProduct } from "@/actions/product";
import { cn } from "@/lib/cn";
import { Plus } from "lucide-react";
import ProductForm from "../form/product-form";
import { TProductSchema } from "@/schemas/product";
import { useState, useTransition } from "react";
import Modal from "../modal";

interface IAddProductProps {
  orderId: number;
  className?: string;
  prod: any;
}

const AddProduct = ({ orderId, className, prod }: IAddProductProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isPending, handle] = useTransition();

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleSubmit = (values: TProductSchema) => {
    handle(async () => {
      try {
        const { error, success } = await createProduct({ orderId, values });

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
        className={cn("flex items-center gap-2 text-green-400", className)}
        onClick={handleClick}
      >
        <div className="w-6 h-6 rounded-full bg-green-400 text-white items-center justify-center flex">
          <Plus size={16} />
        </div>
        <span>Add product</span>
      </button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add order"
        description="Modal to add products"
      >
        <ProductForm isPending={isPending} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default AddProduct;
