import { getDefaultValue, orderSchema, TOrderSchema } from "@/schemas/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Input from "./input";
import LoadingButton from "../loading-button";

interface IOrderFormProps {
  defaultValues?: Partial<TOrderSchema>;
  onSubmit: (values: TOrderSchema) => void;
  isPending: boolean;
}

const formInputs = [
  { name: "title", title: "Title" },
  { name: "description", title: "Description" },
] as const;

const OrderForm = ({ defaultValues, onSubmit, isPending }: IOrderFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TOrderSchema>({
    resolver: zodResolver(orderSchema),
    defaultValues: getDefaultValue(defaultValues),
  });

  return (
    <form
      className="flex flex-col gap-2 w-full p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      {formInputs.map((input) => (
        <div key={input.name}>
          <label>
            {input.title}:
            <Input {...register(input.name)} />
          </label>
          {errors[input.name] && (
            <p className="text-xs text-red-600">
              {errors[input.name]?.message}
            </p>
          )}
        </div>
      ))}
      <LoadingButton
        isLoading={isPending}
        disabled={isPending}
        className="bg-green-400"
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default OrderForm;
