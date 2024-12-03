"use client";
import { TProduct } from "@/types/product";
import { format } from "date-fns";

interface IProductsProps {
  products: TProduct[];
}
const Products = ({ products }: IProductsProps) => {
  console.log(products);

  return (
    <ul className="flex flex-col gap-4 overflow-x-auto">
      {products.map((product) => (
        <li
          key={product.id}
          className="border rounded-lg bg-white shadow-md p-4 grid grid-cols-8 gap-4 items-center min-w-[1000px]"
        >
          <div className="flex-shrink-0">
            {product.photo ? (
              <img
                src={product.photo}
                alt={product.title}
                className="w-16 h-16 object-cover rounded"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
            )}
          </div>
          <div className="mb-2 col-span-3">
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-xs text-gray-500">{product.type}</p>
          </div>
          <div className="text-sm text-gray-500 mb-2 col-span-2">
            {product.guarantees && (
              <>
                <p>
                  From:{" "}
                  {format(
                    new Date(product.guarantees.start_date),
                    "dd/MM/yyyy"
                  )}
                </p>
                <p>
                  to{" "}
                  {format(new Date(product.guarantees.end_date), "dd/MM/yyyy")}
                </p>
              </>
            )}
          </div>
          <div className="space-y-2">
            {product.prices.map((price) => (
              <p key={price.symbol} className="text-sm font-bold">
                {price.value} {price.symbol}
              </p>
            ))}
          </div>
          <p className="text-xs text-gray-500">{product.order.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default Products;
