import { useAuth } from "@/context/AuthContext";
import { useGetUserByIdQuery } from "@/lib/react-query/queries-and-mutations";
import { cn, getInitials } from "@/lib/utils";
import { logout } from "@/slices/auth-slice";
import { useLogoutMutation } from "@/slices/user-api-slice";
import {
  AlignEndHorizontal,
  ArrowLeft,
  BarChart,
  Loader2,
  LogOut,
  Store,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const sideBarEle = [
  {
    name: "Dashboard",
    path: "/dashboard/admin",
    icon: AlignEndHorizontal,
  },
  {
    name: "Analytics",
    path: "/dashboard/admin/analytics",
    icon: BarChart,
  },
  {
    name: "Stores",
    path: "/dashboard/admin/stores",
    icon: Store,
  },
];

const AdminSideBar = () => {
  const auth = useAuth();

  const location = useLocation();

  const dispatch = useDispatch();

  const { data: user } = useGetUserByIdQuery(auth?.user?.id);

  const [logOutApiCall, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      await logOutApiCall().unwrap();

      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col justify-between px-4 pb-8 pt-12">
      <Link
        to="/"
        className="absolute top-2 left-2 flex items-center gap-x-2 text-sm font-semibold border border-secondary rounded-md py-1 px-4 hover:bg-secondary/25 transition"
      >
        <ArrowLeft size={17} className="mt-0.5" />
        Back
      </Link>
      <div className="w-full flex items-center gap-x-2 mt-2">
        <div className="size-16">
          {user?.data?.profilePic ? (
            <img
              src={user?.data?.profilePic}
              alt="pfp"
              className="w-full h-full rounded-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center rounded-full bg-primary text-white text-base font-semibold">
              {getInitials(user?.data?.name)}
            </div>
          )}
        </div>
        <span className="flex flex-col gap-y-1">
          <Link
            to={`/profile/${user?.data?._id}`}
            className="text-base font-semibold text-gray-950"
          >
            {user?.data?.name}
          </Link>
          <p className="text-sm font-semibold text-neutral-600">
            {user?.data?.email}
          </p>
        </span>
      </div>
      <div className="w-full flex flex-col gap-y-1.5">
        {sideBarEle.map((ele) => (
          <Link
            to={ele.path}
            key={ele.name}
            className={cn(
              "w-full flex items-center gap-x-2.5 transition-all rounded-lg py-2 px-4",
              location.pathname === ele.path
                ? "bg-primary text-white"
                : "hover:bg-secondary/60 text-gray-950"
            )}
          >
            <ele.icon size={21} />
            <p className="text-base font-semibold">{ele.name}</p>
          </Link>
        ))}
      </div>
      <div className="w-full flex items-center justify-center border-t border-secondary/60 pt-7">
        <button
          type="button"
          disabled={isLoggingOut}
          onClick={handleLogout}
          className="text-red-500 font-semibold text-base flex items-center gap-x-2 hover:opacity-80 transition-all disabled:opacity-70"
        >
          {isLoggingOut ? (
            <Loader2 size={20} className="text-red-500 animate-spin" />
          ) : (
            <>
              <LogOut size={20} />
              Sign Out
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;
