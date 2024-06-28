import { useGetHomeSearchResultsQuery } from "@/lib/react-query/queries-and-mutations";
import {
  formatNumber,
  getFirstNumberAfterDecimal,
  getInitials,
} from "@/lib/utils";
import { Product, SearchedUser } from "@/types";
import { Loader2, Star } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const FetchNavSearchResults = ({ search }: { search: string }) => {
  const {
    data: results,
    isPending,
    isLoading,
    refetch,
  } = useGetHomeSearchResultsQuery(search);

  useEffect(() => {
    refetch();
  }, [search, refetch]);

  if (isPending || isLoading) {
    return (
      <div className="w-full flex items-center justify-center py-4">
        <Loader2 className="w-6 h-6 animate-spin opacity-75" />
      </div>
    );
  }

  return (
    <div className="w-full max-h-[450px] flex flex-col gap-y-3 overflow-y-scroll">
      {results?.data?.users.length > 0 ? (
        <div className="w-full flex flex-col gap-y-1">
          <p className="text-gray-950 text-base font-semibold italic">Stores</p>
          <div className="w-full flex flex-col">
            {results?.data?.users.map((user: SearchedUser) => (
              <Link
                to={`/profile/${user?._id}`}
                key={user?._id}
                className="w-full flex items-center gap-x-2.5 hover:bg-secondary/60 transition-all rounded-lg p-1.5"
              >
                <div className="size-9">
                  {user?.profilePic ? (
                    <img
                      src={user?.profilePic}
                      alt="profile-pic"
                      className="w-full h-full rounded-lg object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-primary flex items-center justify-center text-white font-semibold text-sm">
                      {getInitials(user?.name)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-[15px] font-semibold text-gray-950 max-w-[300px] truncate">
                    {user?.name}
                  </p>
                  <span className="flex items-center gap-x-1.5">
                    <p className="text-xs font-medium text-gray-900">
                      {getFirstNumberAfterDecimal(user?.averageRating)}
                    </p>
                    <Star
                      size={12}
                      className="text-gray-950/70 fill-gray-950/70"
                    />
                    <p className="text-xs font-medium text-gray-900">
                      ({formatNumber(user?.reviews?.length)})
                    </p>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {results?.data?.products.length > 0 ? (
        <div className="w-full flex flex-col gap-y-1">
          <p className="text-gray-950 text-base font-semibold italic">
            Products
          </p>
          <div className="w-full flex flex-col">
            {results?.data?.products.map((product: Product) => (
              <Link
                to={`/product/${product?._id}`}
                key={product?._id}
                className="w-full flex items-center gap-x-2.5 hover:bg-secondary/60 transition-all rounded-lg p-1.5"
              >
                <img
                  src={product?.images?.[0]}
                  alt="profile-pic"
                  className="size-14 rounded-lg object-cover object-center"
                />

                <div className="flex flex-col gap-y-1">
                  <p className="text-lg font-semibold text-gray-950 max-w-[300px] truncate">
                    {product?.name}
                  </p>
                  <span className="flex items-center gap-x-1.5">
                    <p className="text-sm font-semibold text-gray-900">
                      {getFirstNumberAfterDecimal(product?.averageRating)}
                    </p>
                    <Star
                      size={15}
                      className="text-gray-950/70 fill-gray-950/70"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
      {results?.data?.products.length === 0 &&
      results?.data?.users.length === 0 ? (
        <p className="text-neutral-600 text-base font-semibold italic text-center py-4">
          No results found.
        </p>
      ) : null}
    </div>
  );
};

export default FetchNavSearchResults;
