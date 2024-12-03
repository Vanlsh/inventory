import Layout from "@/components/order/layout";
import { Suspense } from "react";

interface IOrderLayout {
  children: React.ReactNode;
}
const OrderLayout = ({ children }: IOrderLayout) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>{children}</Layout>
    </Suspense>
  );
};

export default OrderLayout;
