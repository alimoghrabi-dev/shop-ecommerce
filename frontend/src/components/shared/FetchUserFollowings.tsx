import UserFavoriteCard from "./UserFavoriteCard";

type FetchUserFollowingsProps = {
  userFollowings: string[];
};

const FetchUserFollowings = ({ userFollowings }: FetchUserFollowingsProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <h3 className="text-2xl font-semibold text-gray-950">
        Shops you follow {`(${userFollowings?.length})`}
      </h3>
      <div className="flex flex-wrap items-center gap-4">
        {userFollowings?.length === 0 && (
          <p className="text-base font-semibold text-gray-950/70 italic mt-2">
            No followings Yet.
          </p>
        )}
        {userFollowings?.map((shop: string) => (
          <UserFavoriteCard key={shop} userId={shop} />
        ))}
      </div>
    </div>
  );
};

export default FetchUserFollowings;
