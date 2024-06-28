import { Product } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { useGetOnSaleProductsQuery } from "@/lib/react-query/queries-and-mutations";
import MostRatedProductCard from "./MostRatedProductCard";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Eye } from "lucide-react";

const GetOnSaleProducts = () => {
  const { data: products, isLoading, isPending } = useGetOnSaleProductsQuery();

  return (
    <div className="flex items-start flex-col gap-y-6 px-6 sm:px-24 md:px-32 lg:px-36 mt-4">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-950">
          On Sale Products
        </h2>
        <Dialog>
          <DialogTrigger className="text-primary hover:text-primary/80 cursor-pointer transition flex items-center gap-x-2">
            <Eye size={18} className="mt-0.5" />
            View all
          </DialogTrigger>
        </Dialog>
      </div>
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
          products?.data?.map((product: Product) => (
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

export default GetOnSaleProducts;
