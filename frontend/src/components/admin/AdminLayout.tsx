import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import { useGetUserByIdQuery } from "@/lib/react-query/queries-and-mutations";

const AdminLayout = () => {
  const auth = useAuth();

  const {
    data: user,
    isPending,
    isLoading,
  } = useGetUserByIdQuery(auth?.user?.id);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isPending) {
      if (!auth?.user) {
        navigate("/sign-in");
      }
    }
  }, [auth?.user, navigate]);

  useEffect(() => {
    if (!isLoading && !isPending) {
      if (!user?.data?.isAdmin) {
        navigate("/");
      }
    }
  }, [auth?.user, navigate, user?.data?.isAdmin]);

  useEffect(() => {
    if (location.pathname.includes("/dashboard/admin")) {
      document.title = "Admin | Shop";
    }
  }, [location.pathname]);

  return (
    <div className="w-full flex">
      <div className="bg-white fixed left-0 inset-y-0 w-72 border-r border-secondary/60">
        <AdminSideBar />
      </div>

      <main className="w-[calc(100%-288px)] ml-auto p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
