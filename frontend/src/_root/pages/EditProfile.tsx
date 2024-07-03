import Loader from "@/components/shared/Loader";
import UserInfoEdit from "@/components/shared/UserInfoEdit";
import { useAuth } from "@/context/AuthContext";
import { useGetUserByIdQuery } from "@/lib/react-query/queries-and-mutations";
import { getInitials } from "@/lib/utils";
import { logout } from "@/slices/auth-slice";
import { ArrowUpRight, Loader2, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const auth = useAuth();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const {
    data: user,
    isLoading,
    isPending,
  } = useGetUserByIdQuery(auth?.user?.id);

  useEffect(() => {
    if (location.pathname.includes("/profile")) {
      document.title = `Profile | ${auth?.user?.name}`;
    }
  }, [location.pathname, auth?.user?.name]);

  if (!userInfo) {
    navigate("/sign-in");
    return;
  }

  if (isPending || isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-24">
        <Loader />
      </div>
    );
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      dispatch(logout());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <section className="w-full flex flex-col items-center justify-center gap-y-5 md:gap-y-12">
      <header className="w-full flex items-center justify-center py-6 shadow md:shadow-none">
        <Link to="/">
          <svg
            width="101"
            height="42"
            viewBox="0 0 101 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[28px] w-[auto] text-primary transform-gpu"
          >
            <path
              d="M12.0288 18.2598C7.97006 17.3793 6.16191 17.0348 6.16191 15.4708C6.16191 13.9997 7.38555 13.2669 9.83283 13.2669C11.9851 13.2669 13.5584 14.2075 14.7165 16.0504C14.8039 16.1926 14.9841 16.2418 15.1316 16.1653L19.6984 13.8575C19.8623 13.7755 19.9224 13.5677 19.8295 13.4091C17.934 10.1224 14.4324 8.32324 9.82191 8.32324C3.76379 8.32324 0 11.3091 0 16.0559C0 21.098 4.58319 22.3722 8.64743 23.2527C12.7117 24.1331 14.5253 24.4776 14.5253 26.0417C14.5253 27.6057 13.2033 28.344 10.5648 28.344C8.12848 28.344 6.32033 27.2284 5.22779 25.0628C5.14585 24.9042 4.95466 24.8386 4.79624 24.9206L0.240358 27.1791C0.0819403 27.2612 0.0163881 27.4526 0.0983284 27.6166C1.90648 31.2533 5.61564 33.2986 10.5703 33.2986C16.8797 33.2986 20.6927 30.3619 20.6927 25.4675C20.6927 20.573 16.0876 19.1512 12.0288 18.2707V18.2598Z"
              fill="currentColor"
            ></path>
            <path
              d="M36.5018 8.32341C33.9125 8.32341 31.6236 9.24214 29.9794 10.8773C29.8756 10.9757 29.7062 10.9046 29.7062 10.7624V0.322772C29.7062 0.142307 29.5642 0.00012207 29.3839 0.00012207H23.67C23.4897 0.00012207 23.3477 0.142307 23.3477 0.322772V32.7245C23.3477 32.905 23.4897 33.0472 23.67 33.0472H29.3839C29.5642 33.0472 29.7062 32.905 29.7062 32.7245V18.5115C29.7062 15.7662 31.8094 13.6608 34.6445 13.6608C37.4796 13.6608 39.5336 15.7225 39.5336 18.5115V32.7245C39.5336 32.905 39.6756 33.0472 39.8559 33.0472H45.5699C45.7501 33.0472 45.8922 32.905 45.8922 32.7245V18.5115C45.8922 12.5397 41.9809 8.32887 36.5018 8.32887V8.32341Z"
              fill="currentColor"
            ></path>
            <path
              d="M57.4962 7.39915C54.3934 7.39915 51.4764 8.34522 49.3896 9.71785C49.2476 9.81082 49.1984 10.0022 49.2858 10.1499L51.8041 14.4537C51.897 14.6068 52.0937 14.6615 52.2466 14.5685C53.8308 13.6115 55.6444 13.1139 57.4962 13.1248C62.4837 13.1248 66.1491 16.6466 66.1491 21.3005C66.1491 25.2652 63.2157 28.2019 59.4956 28.2019C56.4638 28.2019 54.3607 26.4355 54.3607 23.9418C54.3607 22.5145 54.967 21.3442 56.5457 20.5184C56.7096 20.4309 56.7697 20.2286 56.6714 20.07L54.2951 16.0451C54.2186 15.9138 54.0548 15.8537 53.9073 15.9084C50.7225 17.0896 48.4883 19.9333 48.4883 23.7504C48.4883 29.5253 53.0824 33.8346 59.4901 33.8346C66.974 33.8346 72.3548 28.6448 72.3548 21.202C72.3548 13.2233 66.0945 7.39368 57.4853 7.39368L57.4962 7.39915Z"
              fill="currentColor"
            ></path>
            <path
              d="M89.0635 8.27964C86.1738 8.27964 83.5954 9.34603 81.7108 11.2272C81.607 11.3311 81.4376 11.2546 81.4376 11.1124V8.84838C81.4376 8.66791 81.2956 8.52573 81.1153 8.52573H75.5489C75.3686 8.52573 75.2266 8.66791 75.2266 8.84838V41.2009C75.2266 41.3814 75.3686 41.5236 75.5489 41.5236H81.2628C81.4431 41.5236 81.5851 41.3814 81.5851 41.2009V30.5917C81.5851 30.4495 81.7545 30.3784 81.8583 30.4714C83.7374 32.2214 86.2229 33.244 89.069 33.244C95.7717 33.244 101 27.8137 101 20.7591C101 13.7045 95.7663 8.27417 89.069 8.27417L89.0635 8.27964ZM87.9874 27.7644C84.1744 27.7644 81.2847 24.7293 81.2847 20.7153C81.2847 16.7014 84.169 13.6663 87.9874 13.6663C91.8058 13.6663 94.6846 16.6521 94.6846 20.7153C94.6846 24.7786 91.844 27.7644 87.9819 27.7644H87.9874Z"
              fill="currentColor"
            ></path>
          </svg>
        </Link>
      </header>
      <div className="w-full flex flex-col items-center gap-y-5 px-4">
        <h2 className="w-full md:w-1/2 lg:w-1/3 px-2 text-center md:text-start font-semibold text-2xl sm:text-3xl text-gray-950">
          Account
        </h2>
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white border border-secondary rounded-lg transition-all flex items-center p-4">
          <div className="flex items-center gap-x-4">
            {user?.data?.profilePic ? (
              <img
                src={user?.data?.profilePic}
                alt="profile-pic"
                className="size-12 rounded-full object-cover object-center"
              />
            ) : (
              <div className="size-12 bg-primary rounded-full flex items-center justify-center">
                <p className="text-white text-[18px] font-semibold">
                  {getInitials(user?.data?.name)}
                </p>
              </div>
            )}
            <span className="flex flex-col gap-y-0.5">
              <p className="text-sm font-semibold text-gray-900">
                {user?.data?.email}
              </p>
              <p className="text-sm font-medium text-neutral-600">
                {user?.data?.phoneNumber}
              </p>
            </span>
          </div>
        </div>
        <UserInfoEdit
          userId={user?.data?._id}
          name={user?.data?.name}
          username={user?.data?.username}
          bio={user?.data?.bio}
          profilePic={user?.data?.profilePic}
          coverImage={user?.data?.coverPic}
          phoneNumber={user?.data?.phoneNumber}
          websiteUrl={user?.data?.websiteUrl}
        />
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white border border-secondary rounded-lg transition-all flex items-center justify-between p-4 hover:bg-secondary/10">
          <p className="text-lg font-medium text-gray-950">Store Settings</p>
          <Link
            to={`/profile/store/${user?.data._id}`}
            className="text-primary hover:underline hover:opacity-90 text-base font-medium transition flex items-center gap-x-1"
          >
            <ArrowUpRight size={19} className="mt-0.5" />
            view store settings
          </Link>
        </div>
      </div>
      <div className="fixed z-40 bg-white bottom-0 inset-x-0 border-t border-secondary py-6 flex items-center justify-center">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-base font-semibold text-red-500 hover:text-red-400 flex items-center gap-x-2 transition-all disabled:opacity-65"
        >
          {isLoggingOut ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <LogOut size={18} className="mt-0.5" />
              Logout
            </>
          )}
        </button>
      </div>
    </section>
  );
};

export default EditProfile;
