import { useGetRecommendedProductsQuery } from "@/lib/react-query/queries-and-mutations";
import { Product } from "@/types";
import RecommendedProductCard from "./RecommendedProductCard";
import { Skeleton } from "../ui/skeleton";

const GetRecommendedProductForThisProduct = ({
  productId,
}: {
  productId: string;
}) => {
  const {
    data: products,
    isLoading,
    isPending,
  } = useGetRecommendedProductsQuery(productId);

  return isLoading || isPending ? (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      <Skeleton className="w-full h-52 bg-secondary" />
      <Skeleton className="w-full h-52 bg-secondary" />
      <Skeleton className="w-full h-52 bg-secondary" />
      <Skeleton className="w-full h-52 bg-secondary" />
      <Skeleton className="w-full h-52 bg-secondary" />
    </div>
  ) : products?.data?.length === 0 ? (
    <p className="text-neutral-600 font-semibold text-base italic">
      No recommended products
    </p>
  ) : (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      {products?.data?.map((product: Product) => (
        <RecommendedProductCard
          key={product._id}
          productId={product._id}
          name={product.name}
          image={product.images?.[0]}
          price={product.price}
          averageRating={product.averageRating}
          isOnSale={product.isOnSale}
          salePrice={product.salePrice}
          isOutOfStock={product.isOutOfStock}
          userOfProduct={product.userId}
        />
      ))}
    </div>
  );
};

export default GetRecommendedProductForThisProduct;
