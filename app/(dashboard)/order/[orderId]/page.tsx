import { auth } from "@/auth/auth";
import Card from "@/components/card";
import AddProduct from "@/components/order/add-product";
import Table from "@/components/product/table";
import { getOrderProducts } from "@/services/products";
import { X } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface IOrderPageProps {
  params: {
    orderId: string;
  };
}

const OrderPage = async ({ params }: IOrderPageProps) => {
  const orderId = Number(params.orderId);

  const session = await auth();

  if (!session) redirect("/");
  const {
    user: { user_id },
  } = session;

  const { products, orderTitle } = await getOrderProducts({ orderId, user_id });

  return (
    <Card className="w-full p-0">
      <Link
        className="z-20 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border shadow flex items-center justify-center bg-white text-gray-400"
        href="/order"
      >
        <X />
      </Link>
      <div className="p-4">
        <h2 className="mb-2 font-semibold uppercase">{orderTitle}</h2>
        <AddProduct orderId={Number(params.orderId)} prod={products} />
      </div>
      <Table products={products} />
    </Card>
  );
};

export default OrderPage;
