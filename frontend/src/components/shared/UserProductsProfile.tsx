import { useGetUserProductsQuery } from "@/lib/react-query/queries-and-mutations";
import { Product } from "@/types";
import { Link, useSearchParams } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { cn, formatPrice } from "@/lib/utils";
import Categories from "./Categories";
import { useEffect } from "react";
import ProfileSearchBar from "./ProfileSearchBar";
import FetchStarsRate from "./FetchStarsRate";
import { FaTag } from "react-icons/fa6";

const UserProductsProfile = ({
  userId,
  name,
}: {
  userId: string | undefined;
  name: string;
}) => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const onSale = searchParams.get("onSale");
  const search = searchParams.get("search");

  const {
    data: products,
    isLoading,
    isPending,
    refetch,
  } = useGetUserProductsQuery(userId, category, onSale, search);

  useEffect(() => {
    refetch();
  }, [category, onSale, search, refetch]);

  return (
    <div className="w-full flex flex-col gap-y-3 mt-4">
      <h3 className="text-start font-semibold text-gray-950 text-2xl">
        Products
      </h3>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-x-2">
          <Categories />
          <p className="text-neutral-500 font-semibold text-sm">
            {products?.data.length}{" "}
            {products?.data.length === 1 ? "product" : "products"}
          </p>
        </div>
        <ProfileSearchBar name={name} />
      </div>

      {isLoading || isPending ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <Skeleton className="w-full h-44" />
          <Skeleton className="w-full h-44" />
          <Skeleton className="w-full h-44" />
          <Skeleton className="w-full h-44" />
          <Skeleton className="w-full h-44" />
          <Skeleton className="w-full h-44" />
        </div>
      ) : products?.data.length === 0 ? (
        <div className="w-full flex items-center justify-center mt-10">
          <p className="text-gray-950/90 text-lg font-semibold">
            No Products Where Found.
          </p>
        </div>
      ) : (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {products?.data.map((product: Product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="relative flex flex-col shadow rounded-lg hover:opacity-85 transition-all">
              {product.isOnSale && (
                <div className="absolute top-2 left-2 p-1 bg-red-500 rounded-lg flex items-center justify-center">
                  <FaTag size={16} className="text-white" />
                </div>
              )}
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-44 object-center object-cover rounded-t-lg"
              />
              <div className="flex flex-col p-2 gap-y-1">
                <p className="text-sm font-semibold text-gray-700">
                  {product.name}
                </p>
                {product.averageRating ? (
                  <FetchStarsRate rate={product.averageRating} isCard />
                ) : (
                  <p className="text-[13px] leading-3 font-medium text-neutral-500">
                    No reviews
                  </p>
                )}
                {!product.isOutOfStock && (
                  <span className="flex items-center gap-x-3">
                    {product.isOnSale && (
                      <p className="text-sm font-semibold text-red-500">
                        {formatPrice(product.salePrice)}
                      </p>
                    )}
                    <p
                      className={cn(
                        "text-sm font-semibold text-gray-950",
                        product.isOnSale && "line-through opacity-80"
                      )}>
                      {formatPrice(product.price)}
                    </p>
                  </span>
                )}

                {product.isOutOfStock && (
                  <p className="text-sm text-center font-semibold text-red-500 line-through">
                    Out of Stock
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProductsProfile;
