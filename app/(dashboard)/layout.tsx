import Aside from "@/components/aside/aside";
import Header from "@/components/header/header";
import React from "react";

interface IDashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: IDashboardLayoutProps) => {
  return (
    <>
      <Header />
      <main className="flex h-full max-h-full overflow-hidden">
        <Aside />
        <div className="p-10 container h-full overflow-y-auto">{children}</div>
      </main>
    </>
  );
};

export default DashboardLayout;
