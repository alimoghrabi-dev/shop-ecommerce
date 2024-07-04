import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className="flex flex-col">
      <Navbar />
      <div className="mt-[88px]">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default RootLayout;
