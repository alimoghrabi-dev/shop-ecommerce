import Loader from "@/components/shared/Loader";
import UserProductsProfile from "@/components/shared/UserProductsProfile";
import UserReviews from "@/components/shared/UserReviews";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import {
  useFollowUserMutation,
  useGetUserByIdQuery,
  useUnFollowUserMutation,
} from "@/lib/react-query/queries-and-mutations";
import {
  formatNumber,
  getFirstNumberAfterDecimal,
  getInitials,
} from "@/lib/utils";
import { Edit, Ellipsis, Loader2, ShieldAlert, Star } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Profile = () => {
  const auth = useAuth();

  const location = useLocation();

  const params = useParams();

  const {
    data: user,
    isLoading,
    isPending,
    refetch,
  } = useGetUserByIdQuery(params.id);

  useEffect(() => {
    if (location.pathname.includes("/profile")) {
      document.title = `Profile | ${user?.data?.name}`;
    }
  }, [location.pathname, user?.data?.name]);

  const { mutateAsync: handleFollowMutate, isPending: isFollowing } =
    useFollowUserMutation();

  const { mutateAsync: handleUnFollowMutate, isPending: isUnFollowing } =
    useUnFollowUserMutation();

  const isFollowed = user?.data.followers.includes(auth?.user?.id);

  if (isLoading || isPending) {
    return (
      <div className="w-full mt-12 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleFollow = async () => {
    const follow = await handleFollowMutate({
      userId: auth?.user?.id,
      follwingUserId: user?.data._id,
    });

    if (!follow) {
      return toast.error("An error occurred");
    }

    toast.success(`You've followed ${user?.data.name}`);
    refetch();
  };

  const handleUnFollow = async () => {
    const unfollow = await handleUnFollowMutate({
      userId: auth?.user?.id,
      follwingUserId: user?.data._id,
    });

    if (!unfollow) {
      return toast.error("An error occurred");
    }

    toast.success(`You've unfollowed ${user?.data.name}`);
    refetch();
  };

  return (
    <section className="w-full flex flex-col gap-y-4 px-4 sm:px-20 md:px-32 lg:px-52 py-8">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-x-4">
        <div className="flex flex-col items-start gap-y-3">
          <div className="flex items-center gap-x-5">
            {user?.data?.profilePic ? (
              <img
                src={user?.data?.profilePic}
                alt="profile-pic"
                className="size-16 rounded-xl object-cover object-center"
              />
            ) : (
              <span className="size-16 rounded-xl bg-secondary/80 text-gray-950 text-lg font-semibold flex items-center justify-center">
                {getInitials(user?.data?.name)}
              </span>
            )}
            <span className="flex flex-col items-start gap-y-1.5">
              <p className="font-semibold text-gray-950 text-xl">
                {user?.data?.name}
              </p>
              <span className="flex items-center text-xs text-gray-950 gap-x-1.5">
                <p className="font-medium">
                  {getFirstNumberAfterDecimal(user?.data?.averageRating)}
                </p>
                <Star size={13} className="fill-gray-950" />
                <p className="font-semibold">
                  ({formatNumber(user?.reviewsLength)})
                </p>
              </span>
            </span>
          </div>
          {user?.data.bio ? (
            <p className="text-gray-900 text-sm font-semibold max-w-[90%] md:max-w-[75%] break-words">
              {user?.data.bio}
            </p>
          ) : (
            <p className="text-neutral-600 font-medium text-sm italic">
              No bio yet.
            </p>
          )}
          {user?.data.websiteUrl && (
            <a
              href={user?.data.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold text-base hover:underline cursor-pointer transition"
            >
              {user?.data.websiteUrl}
            </a>
          )}
        </div>
        <div className="flex flex-shrink-0 flex-row-reverse md:flex-row items-center gap-x-3 mt-5 md:mt-0">
          <p className="text-neutral-600 text-sm font-semibold">
            {formatNumber(user?.data.followers.length)}{" "}
            {user?.data.followers.length === 1 ? "Follower" : "Followers"}
          </p>
          {auth?.user?.id !== params.id ? (
            isFollowed ? (
              <Button
                onClick={handleUnFollow}
                disabled={isUnFollowing}
                className="bg-secondary/60 w-24 font-semibold text-gray-950 rounded-xl hover:bg-secondary/40"
              >
                {isUnFollowing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Following"
                )}
              </Button>
            ) : (
              <Button
                onClick={handleFollow}
                disabled={isFollowing}
                className="bg-gray-950 w-20 font-semibold rounded-xl hover:bg-gray-950 hover:bg-opacity-85"
              >
                {isFollowing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Follow"
                )}
              </Button>
            )
          ) : null}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Button variant={"outline"} className="px-2 rounded-xl">
                <Ellipsis className="text-gray-950" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl py-2.5 px-0 w-48 mt-1 mr-2">
              {auth?.user?.id === params.id ? (
                <Link
                  to={`/profile/edit/${auth?.user?.id}`}
                  className="w-full px-4 py-1.5 flex items-center gap-x-2.5 hover:bg-secondary/40 transition-all text-base font-semibold text-gray-950 cursor-pointer"
                >
                  <Edit size={19} />
                  Edit Store
                </Link>
              ) : (
                <p className="w-full px-4 py-1.5 flex items-center gap-x-2.5 hover:bg-secondary/40 transition-all text-base font-semibold text-red-500 cursor-pointer">
                  <ShieldAlert size={19} />
                  Report Store
                </p>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <UserProductsProfile userId={params.id} name={user?.data?.name} />
      <UserReviews
        userId={user?.data?._id}
        currentUserId={auth?.user?.id}
        username={user?.data?.name}
      />
    </section>
  );
};

export default Profile;
