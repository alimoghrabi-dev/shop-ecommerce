import { Loader2, Minus, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  useFollowUserMutation,
  useGetUserByIdQuery,
  useUnFollowUserMutation,
} from "@/lib/react-query/queries-and-mutations";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { formatNumber, getFirstNumberAfterDecimal } from "@/lib/utils";

interface RecommendedShopCardProps {
  id: string;
  name: string;
  coverPic: string | undefined;
  refetch: () => void;
}

const RecommendedShopCard = ({
  id,
  name,
  coverPic,
  refetch,
}: RecommendedShopCardProps) => {
  const auth = useAuth();

  const { data: user, refetch: refetchUser } = useGetUserByIdQuery(id);
  const { data: currentUser, refetch: refetchCurrentUser } =
    useGetUserByIdQuery(auth?.user?.id);

  const { mutateAsync: followUser, isPending: isFollowing } =
    useFollowUserMutation();

  const { mutateAsync: unFollowUser, isPending: isUnFollowing } =
    useUnFollowUserMutation();

  const isFollowed = currentUser?.data?.followings.includes(id);

  const handleFollow = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const follow = await followUser({
      userId: auth?.user?.id,
      follwingUserId: id,
    });

    if (!follow) {
      return toast.error("An error occurred");
    }

    toast.success(`You've followed ${name}`);

    refetch();
    refetchUser();
    refetchCurrentUser();
  };

  const handleUnFollow = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const unfollow = await unFollowUser({
      userId: auth?.user?.id,
      follwingUserId: id,
    });

    if (!unfollow) {
      return toast.error("An error occurred");
    }

    toast.success(`You've unfollowed ${name}`);

    refetch();
    refetchUser();
    refetchCurrentUser();
  };

  return (
    <Link
      to={`/profile/${id}`}
      className="w-full rounded-lg shadow hover:bg-secondary/50 flex flex-col transition-all">
      <div className="w-full h-28">
        {coverPic ? (
          <img
            src={coverPic}
            alt="cover"
            className="w-full h-full object-cover object-center rounded-t-lg"
          />
        ) : (
          <div className="w-full h-full bg-secondary/30 flex items-center justify-center rounded-t-lg">
            <Minus size={24} className="text-gray-950" />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-y-3">
        <span className="flex flex-col gap-y-1">
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-950 font-semibold text-base">{name}</p>
            {user?.data?._id === auth?.user?.id && auth?.user && (
              <p className="flex items-center justify-center bg-secondary text-gray-950 text-[13px] font-semibold px-2.5 py-0.5 rounded-2xl opacity-95">
                You
              </p>
            )}
          </div>
          {user?.reviewsLength === 0 ? (
            <p className="italic font-medium text-sm text-neutral-500">
              no reviews
            </p>
          ) : auth?.user ? (
            <span className="flex items-center gap-x-1">
              <Star size={13} className="text-gray-950 fill-gray-950" />
              <p className="text-[13px] font-semibold text-gray-950">
                {getFirstNumberAfterDecimal(user?.data?.averageRating)}
              </p>
              <p className="text-[13px] font-semibold text-gray-950">
                ({formatNumber(user?.reviewsLength)})
              </p>
            </span>
          ) : null}
        </span>
        {user?.data?._id !== auth?.user?.id ? (
          isFollowed ? (
            <Button
              onClick={handleUnFollow}
              disabled={isUnFollowing}
              size={"sm"}
              className="w-full text-base font-semibold rounded-lg bg-secondary/70 hover:bg-secondary/50 text-gray-950">
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
              size={"sm"}
              className="w-full text-base font-semibold rounded-lg bg-gray-950 hover:bg-gray-950/80 text-white">
              {isFollowing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Follow"
              )}
            </Button>
          )
        ) : null}
      </div>
    </Link>
  );
};

export default RecommendedShopCard;
