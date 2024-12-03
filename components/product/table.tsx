import { TProduct } from "@/types/product";
import DeleteProduct from "./delete-product";

interface ITableProps {
  products: TProduct[];
}

const Table = ({ products }: ITableProps) => {
  return (
    <table className="w-full border-collapse  border-gray-200">
      <tbody>
        {products.map((product) => (
          <tr
            key={product.id}
            className="[&:not(:last-child)]:border-y [&:last-child]:rounded-b border-gray-300  transition-shadow duration-300  hover:shadow-md"
          >
            <td className="p-2 w-28">
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
            </td>
            <td className="p-2">
              <p className="underline">{product.title}</p>
              <p className="text-gray-400">{product.serial_number}</p>
            </td>
            <td className="p-2 w-20 text-right">
              <DeleteProduct product={product} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
