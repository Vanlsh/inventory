import {
  getDefaultValue,
  productSchema,
  TProductSchema,
  typeOptions,
} from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "./input";
import LoadingButton from "../loading-button";

interface IProductFormProps {
  defaultValues?: Partial<TProductSchema>;
  onSubmit: (values: TProductSchema) => void;
  isPending: boolean;
}

const formInputs = [
  { type: "string", name: "title", title: "Title" },
  { type: "string", name: "specification", title: "Specification" },
  { type: "string", name: "description", title: "Description" },
  { type: "string", name: "photo", title: "Photo URL" },
  { type: "date", name: "guaranty_start", title: "Guaranty start" },
  { type: "date", name: "guaranty_end", title: "Guaranty end" },
  { type: "number", name: "serial_number", title: "Serial number" },
  { type: "checkbox", name: "is_new", title: "New", label: "Is product new" },
  { type: "select", name: "type", title: "Type", options: typeOptions },
  { type: "number", name: "price_usd", title: "Price in USD" },
  { type: "number", name: "price_uah", title: "Price in UAH" },
] as const;

const ProductForm = ({
  defaultValues,
  onSubmit,
  isPending,
}: IProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: getDefaultValue(defaultValues),
  });
  return (
    <form className="w-full p-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 max-h-96 overflow-y-auto p-2 -m-2">
        {formInputs.map((input) => (
          <div key={input.name}>
            <label>
              {input.title}:
              {(() => {
                switch (input.type) {
                  case "number":
                    return <Input type="number" {...register(input.name)} />;
                  case "date":
                    return <Input type="date" {...register(input.name)} />;
                  case "checkbox":
                    return (
                      <label className="flex w-full gap-2 items-center">
                        <input type="checkbox" {...register(input.name)} />
                        {input.label}
                      </label>
                    );
                  case "select":
                    return (
                      <select
                        {...register(input.name)}
                        className="border rounded p-2 w-full"
                      >
                        {input.options?.map((option) => (
                          <option key={option} value={option}>
                            {option.toLocaleUpperCase()}
                          </option>
                        ))}
                      </select>
                    );
                  default:
                    return <Input {...register(input.name)} />;
                }
              })()}
            </label>
            {errors[input.name] && (
              <p className="text-xs text-red-600">
                {errors[input.name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <LoadingButton
        isLoading={isPending}
        disabled={isPending}
        className="bg-green-400 mt-4 w-full"
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default ProductForm;
