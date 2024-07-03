import { Product } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { useGetOnSaleProductsQuery } from "@/lib/react-query/queries-and-mutations";
import MostRatedProductCard from "./MostRatedProductCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { cn, formatPrice } from "@/lib/utils";
import FetchStarsRate from "../shared/FetchStarsRate";
import { FaTag } from "react-icons/fa6";

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
          <DialogContent className="max-w-[450px] sm:max-w-xl lg:max-w-3xl rounded-lg p-2.5 md:p-4">
            <DialogHeader className="w-full flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold">On Sale Products</h3>
              <div className="w-16 h-px bg-black/25" />
            </DialogHeader>
            <div className="h-[375px] flex flex-col gap-4 overflow-y-auto">
              {products?.data?.map((product: Product) => (
                <Link
                  key={product?._id}
                  to={`/product/${product?._id}`}
                  className="w-full flex items-center justify-between gap-x-0.5 md:gap-x-4 p-2 md:p-4 border border-black/15 rounded-md hover:bg-gray-900/5 transition-all"
                >
                  <div className="flex gap-x-2.5">
                    <div className="size-20 relative">
                      <div className="absolute top-1 left-1 p-1 bg-red-500 rounded-lg flex items-center justify-center">
                        <FaTag size={12} className="text-white" />
                      </div>
                      <img
                        src={product?.images?.[0]}
                        alt={product?.name}
                        className="ww-full h-full object-cover object-center rounded-sm shadow-md shadow-black/20"
                      />
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <p className="text-gray-950 font-semibold text-base md:text-lg max-w-xs line-clamp-1">
                        {product?.name}
                      </p>
                      <p className="text-gray-950/70 text-xs md:text-sm font-medium max-w-[300px] md:max-w-xs line-clamp-3 md:line-clamp-2">
                        {product?.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-2 items-end">
                    {product?.isOutOfStock ? (
                      <p className="text-center line-through text-red-500 font-semibold text-sm">
                        Out of Stock
                      </p>
                    ) : (
                      <span className="flex items-center gap-x-2">
                        <p
                          className={cn(
                            "text-sm font-semibold text-gray-950/85",
                            product?.isOnSale && "line-through text-gray-950/60"
                          )}
                        >
                          {formatPrice(product?.price)}
                        </p>
                        {product?.isOnSale && (
                          <p className="text-red-500 font-medium text-sm">
                            {formatPrice(product?.salePrice)}
                          </p>
                        )}
                      </span>
                    )}
                    <FetchStarsRate rate={product?.averageRating} />
                  </div>
                </Link>
              ))}
            </div>
          </DialogContent>
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

export default GetOnSaleProducts;
