import { useGetAdminAllUsersQuery } from "@/lib/react-query/queries-and-mutations";
import Loader from "../shared/Loader";
import { User } from "@/types";
import { getInitials } from "@/lib/utils";
import { CgDetailsMore, CgShoppingBag } from "react-icons/cg";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import GetUserProducts from "./GetUserProducts";

const AdminStores = () => {
  const { data: users, isLoading, isPending } = useGetAdminAllUsersQuery();

  return (
    <div className="flex flex-col gap-y-3">
      <span className="flex flex-col gap-y-4 mb-2.5">
        <h2 className="text-2xl font-semibold text-gray-950">
          Manage All Stores
        </h2>
        <div className="w-28 h-px bg-gray-950/10" />
      </span>
      {isLoading || isPending ? (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        users?.data.map((user: User) => (
          <>
            <div
              key={user._id}
              className="px-4 py-2.5 w-full flex items-center justify-between"
            >
              <div className="flex gap-x-4">
                <div className="size-16">
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      alt="pfp"
                      className="w-full h-full object-cover object-center rounded-xl shadow"
                    />
                  ) : (
                    <div className="rounded-xl bg-primary w-full h-full flex items-center justify-center text-white font-semibold text-lg">
                      {getInitials(user?.name)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-y-0.5">
                  <Link
                    to={`/profile/${user?._id}`}
                    className="text-lg font-semibold text-gray-950 max-w-[320px] truncate"
                  >
                    {user?.name}
                  </Link>
                  <p className="text-sm font-semibold text-neutral-600">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="p-1 rounded-full hover:bg-secondary/50 transition cursor-pointer flex items-center justify-center">
                        <CgDetailsMore size={25} className="text-gray-950" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="font-semibold">
                      Details
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Dialog>
                  <DialogTrigger>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="p-1 rounded-full hover:bg-secondary/50 transition cursor-pointer flex items-center justify-center">
                            <CgShoppingBag
                              size={22}
                              className="text-gray-950"
                            />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent className="font-semibold">
                          Products
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </DialogTrigger>
                  <DialogContent className="max-h-[450px] overflow-y-scroll max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="mb-3">
                        {user?.name}'s Products
                      </DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-y-5">
                      <GetUserProducts userId={user?._id} />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="w-full h-px bg-secondary/50" />
          </>
        ))
      )}
    </div>
  );
};

export default AdminStores;
