"use client";

import { typeOptions } from "@/schemas/product";
import { ProductSubtype } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ISearchProductProps {
  type: ProductSubtype | "all";
}

const SearchProduct = ({ type }: ISearchProductProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("type");
    } else {
      params.set("type", value);
    }
    const queryString = params.toString();
    router.push(pathname + "?" + queryString);
  };
  return (
    <select
      defaultValue={type}
      onChange={handleOnChange}
      className="border rounded p-2 w-sm"
    >
      <option value="all">ALL</option>
      {typeOptions.map((option) => (
        <option key={option} value={option}>
          {option.toLocaleUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default SearchProduct;
