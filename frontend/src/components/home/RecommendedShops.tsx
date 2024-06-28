import { useGetPopularUserShopsQuery } from "@/lib/react-query/queries-and-mutations";
import { Skeleton } from "../ui/skeleton";
import RecommendedShopCard from "../shared/RecommendedShopCard";
import { Recommended } from "@/types";

const RecommendedShops = () => {
  const {
    data: shops,
    isLoading,
    isPending,
    refetch,
  } = useGetPopularUserShopsQuery();

  return (
    <div className="flex items-start flex-col gap-y-6 px-6 sm:px-24 md:px-32 lg:px-36 mt-8">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-950">
        {"Shops we think you'll love"}
      </h2>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {isLoading || isPending ? (
          <>
            <Skeleton className="w-full h-40 rounded-lg" />
            <Skeleton className="w-full h-40 rounded-lg" />
            <Skeleton className="w-full h-40 rounded-lg" />
            <Skeleton className="w-full h-40 rounded-lg" />
            <Skeleton className="w-full h-40 rounded-lg" />
          </>
        ) : (
          shops?.data?.map((shop: Recommended) => (
            <RecommendedShopCard
              key={shop?._id}
              id={shop?._id}
              name={shop?.name}
              coverPic={shop?.coverPic}
              refetch={refetch}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendedShops;
