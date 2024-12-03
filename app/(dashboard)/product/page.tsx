import { auth } from "@/auth/auth";
import Products from "@/components/product/products";
import SearchProduct from "@/components/product/search-product";
import { db } from "@/db";
import { typeOptions } from "@/schemas/product";
import { getProducts } from "@/services/products";
import { ProductSubtype } from "@prisma/client";
import { redirect } from "next/navigation";

interface IProductPageProps {
  searchParams: {
    type?: ProductSubtype;
  };
}

const ProductPage = async ({ searchParams }: IProductPageProps) => {
  const session = await auth();
  if (!session) redirect("/");

  const {
    user: { user_id },
  } = session;

  const { type } = searchParams;
  const isValidType = type && typeOptions.includes(type);
  const query = isValidType ? { type } : {};

  const products = await getProducts({ user_id, query });

  return (
    <>
      <div className="flex gap-4 mb-14 items-center">
        <p className="font-semibold text-lg ">Products / {products.length}</p>
        <SearchProduct type={isValidType ? type : "all"} />
      </div>
      <Products products={products} />
    </>
  );
};

export default ProductPage;
