import { getInitials } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { Loader2, LogOut } from "lucide-react";
import { useLogoutMutation } from "@/slices/user-api-slice";
import { useDispatch } from "react-redux";
import { logout } from "@/slices/auth-slice";
import { useEffect, useState } from "react";

interface UserProfileDropMenuProps {
  user: {
    _id: string;
    name: string;
    username?: string | undefined;
    email: string;
    isAdmin: boolean;
    profilePic: string | undefined;
  };
}

const menuLinks = [
  {
    name: "View Profile",
    path: "/profile",
  },
  {
    name: "Settings",
    path: "/settings",
  },
];

const UserProfileDropMenu = ({ user }: UserProfileDropMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const dispatch = useDispatch();

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
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      {user?.profilePic ? (
        <DropdownMenuTrigger className="w-9 h-9 rounded-full shadow cursor-pointer outline-none">
          <img
            src={user?.profilePic}
            alt="profile-pic"
            className="w-full h-full object-cover object-center rounded-full"
          />
        </DropdownMenuTrigger>
      ) : (
        <DropdownMenuTrigger className="w-9 h-9 rounded-full shadow flex items-center justify-center bg-primary cursor-pointer hover:bg-primary/90 transition-all">
          <p className="text-white font-semibold text-base mb-px">
            {getInitials(user?.name)}
          </p>
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent className="mt-1 mr-4 px-2 shadow rounded-lg bg-white/90 backdrop-blur-sm flex items-center flex-col w-48">
        <DropdownMenuLabel className="text-base">
          {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="w-full flex items-start flex-col gap-y-0.5">
          {menuLinks.map((link) => (
            <DropdownMenuItem
              key={link.name}
              className="w-full px-4 cursor-pointer focus:bg-primary/15"
            >
              <Link
                to={
                  link.path === "/profile"
                    ? `/profile/${user?._id}`
                    : link.path === "/settings"
                    ? `/profile/edit/${user?._id}`
                    : link.path
                }
                className="w-full flex justify-start"
              >
                {link.name}
              </Link>
            </DropdownMenuItem>
          ))}
          {user?.isAdmin && (
            <DropdownMenuItem className="w-full px-4 flex items-center justify-center cursor-pointer focus:bg-primary/15">
              <Link
                to="/dashboard/admin"
                className="text-primary font-semibold"
              >
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          )}
        </div>
        <DropdownMenuSeparator />
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-sm my-0.5 h-8 py-1.5 flex items-center justify-center gap-x-2 w-full font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-55 transition-all"
        >
          {isLoggingOut ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <LogOut size={17} />
              Logout
            </>
          )}
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropMenu;
