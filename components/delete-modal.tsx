"use client";

import Modal, { IModalProps } from "@/components/modal";
import LoadingButton from "@/components/loading-button";
import { Trash2 } from "lucide-react";

interface IConfirmDeleteModalProps extends IModalProps {
  handleDelete: () => void;
  isPending: boolean;
}

const ConfirmDeleteModal = (props: IConfirmDeleteModalProps) => {
  const { isPending, handleDelete, children, ...rest } = props;

  const handleCancel = () => rest.setIsOpen(false);

  return (
    <Modal {...rest} className="max-w-2xl p-0 gap-0">
      {children}
      <div className="flex items-center justify-end gap-4 bg-green-400 p-5 rounded-b-lg font-bold">
        <button
          className="py-2 px-6 text-white"
          type="button"
          onClick={handleCancel}
        >
          Скасувати
        </button>
        <LoadingButton
          className="bg-white text-destructive ml-2 rounded-full"
          disabled={isPending}
          isLoading={isPending}
          type="button"
          onClick={handleDelete}
        >
          <Trash2 size={20} />
          Видалити
        </LoadingButton>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
