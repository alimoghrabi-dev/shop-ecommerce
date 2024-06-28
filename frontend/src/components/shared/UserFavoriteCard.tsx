import { useGetUserByIdQuery } from "@/lib/react-query/queries-and-mutations";
import { Skeleton } from "../ui/skeleton";
import { getInitials } from "@/lib/utils";
import { Link } from "react-router-dom";

const UserFavoriteCard = ({ userId }: { userId: string }) => {
  const { data: user, isLoading, isPending } = useGetUserByIdQuery(userId);

  return isLoading || isPending ? (
    <Skeleton className="w-24 h-24 rounded-xl" />
  ) : (
    <div className="w-20 flex flex-col gap-y-2">
      {user?.data?.profilePic ? (
        <img
          src={user?.data?.profilePic}
          alt="profile-pic"
          className="w-full h-20 rounded-xl object-cover object-center"
        />
      ) : (
        <div className="w-full h-20 bg-secondary text-gray-950 font-semibold text-xl rounded-xl flex items-center justify-center">
          {getInitials(user?.data?.name)}
        </div>
      )}
      <Link
        to={`/profile/${user?.data?._id}`}
        className="text-[13px] font-medium text-gray-950 max-w-full break-words text-center">
        {user?.data?.name}
      </Link>
    </div>
  );
};

export default UserFavoriteCard;
