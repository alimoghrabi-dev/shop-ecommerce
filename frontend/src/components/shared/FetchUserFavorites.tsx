import ProductFavoriteCard from "./ProductFavoriteCard";

type FetchUserFollowingsProps = {
  userFavorites: string[];
};

const FetchUserFavorites = ({ userFavorites }: FetchUserFollowingsProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <h3 className="text-2xl font-semibold text-gray-950">
        Favorites ({userFavorites?.length})
      </h3>
      <div className="flex flex-wrap items-center gap-4">
        {userFavorites?.length === 0 && (
          <p className="text-base font-semibold text-gray-950/70 italic mt-2">
            No favorites Yet.
          </p>
        )}
        {userFavorites?.map((product: string) => (
          <ProductFavoriteCard key={product} productId={product} />
        ))}
      </div>
    </div>
  );
};

export default FetchUserFavorites;
