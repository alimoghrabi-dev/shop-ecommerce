import { useGetUserByIdQuery } from "@/lib/react-query/queries-and-mutations";
import { Link, redirect, useLocation, useParams } from "react-router-dom";
import Loader from "./Loader";
import { useAuth } from "@/context/AuthContext";
import { cn, getInitials } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ArrowLeft, CircleSlashed, EditIcon } from "lucide-react";
import AddProduct from "./AddProduct";
import DisplayProducts from "./DisplayProducts";
import { useEffect } from "react";

const EditUserStore = () => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.user) redirect("/sign-in");

  const params = useParams();

  const { data: user, isLoading, isPending } = useGetUserByIdQuery(params.id);

  useEffect(() => {
    if (location.pathname.includes("/profile")) {
      document.title = `Profile | ${auth?.user?.name}`;
    }
  }, [location.pathname, auth?.user?.name]);

  if (isPending || isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-24">
        <Loader />
      </div>
    );
  }

  return (
    <section className="w-full relative p-8 flex flex-col gap-y-8">
      <Link
        to={`/profile/edit/${user?.data?._id}`}
        className={cn(
          buttonVariants({
            variant: "outline",
            className:
              "w-24 flex items-center text-gray-950 font-semibold gap-x-2 self-start",
          })
        )}>
        <ArrowLeft size={18} className="mt-0.5" />
        Back
      </Link>
      <div className="w-full flex items-center justify-center sm:justify-between gap-x-4">
        <div className="relative w-80 h-40">
          {user?.data.coverPic ? (
            <img
              src={user?.data.coverPic}
              alt="cover"
              className="w-full h-full object-cover rounded-sm shadow shadow-black/30"
            />
          ) : (
            <div className="w-full h-full rounded-lg flex items-center bg-secondary/30 justify-center border border-secondary">
              <CircleSlashed size={32} />
            </div>
          )}

          {user?.data.profilePic ? (
            <img
              src={user?.data.profilePic}
              alt="profile"
              className="absolute -bottom-9 left-4 w-20 h-20 rounded-full shadow object-cover object-center border-4 border-white"
            />
          ) : (
            <div className="absolute -bottom-9 text-white text-xl font-semibold left-4 w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow bg-primary">
              {getInitials(user?.data?.name)}
            </div>
          )}
        </div>
        <Link
          to={`/profile/edit/${user?.id}`}
          className="hidden sm:flex items-center gap-x-2 text-lg font-semibold text-gray-950 hover:opacity-90 transition">
          <EditIcon size={21} />
          Edit Profile
        </Link>
      </div>
      <div className="w-full h-px bg-secondary/50 mt-8" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
        <div className="flex-grow-0">
          <AddProduct userId={auth?.user?.id} />
        </div>
        <div className="flex-grow-0">
          <DisplayProducts userId={auth?.user?.id} />
        </div>
      </div>
    </section>
  );
};

export default EditUserStore;
