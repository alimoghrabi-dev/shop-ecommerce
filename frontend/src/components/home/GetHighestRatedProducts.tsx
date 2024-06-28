import { useGetMostRatedProductsQuery } from "@/lib/react-query/queries-and-mutations";
import { Product } from "@/types";
import MostRatedProductCard from "./MostRatedProductCard";
import { Skeleton } from "../ui/skeleton";

const GetHighestRatedProducts = () => {
  const {
    data: products,
    isLoading,
    isPending,
  } = useGetMostRatedProductsQuery();

  return (
    <div className="flex items-start flex-col gap-y-6 px-6 sm:px-24 md:px-32 lg:px-36 mt-4">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-950">
        Most Rated Products
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
          products?.data
            ?.slice(0, 5)
            .map((product: Product) => (
              <MostRatedProductCard
                key={product?._id}
                id={product?._id}
                name={product?.name}
                image={product?.images?.[0]}
                rating={product?.averageRating}
                price={product?.price}
                isOnSale={product?.isOnSale}
                isOutOfStock={product?.isOutOfStock}
                salePrice={product?.salePrice}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default GetHighestRatedProducts;
