import {
  useGetProductByIdQuery,
  useGetUserByIdQuery,
} from "@/lib/react-query/queries-and-mutations";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { FaTag } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const ProductFavoriteCard = ({ productId }: { productId: string }) => {
  const {
    data: product,
    isLoading,
    isPending,
  } = useGetProductByIdQuery(productId);

  const { data: user } = useGetUserByIdQuery(product?.data?.userId);

  return isLoading || isPending ? (
    <Skeleton className="w-36 h-40" />
  ) : (
    <Link
      to={`/product/${productId}`}
      className="w-40 flex flex-col hover:opacity-90 shadow rounded-lg transition-all">
      <div className="relative w-full h-40">
        {product?.data?.isOnSale && (
          <div className="absolute top-2 left-2 p-1 bg-red-500 rounded-md flex items-center justify-center">
            <FaTag size={16} className="text-white" />
          </div>
        )}
        <img
          src={product?.data?.images[0]}
          alt="product-image"
          className="w-full h-full rounded-t-lg object-cover object-center bg-secondary"
        />
      </div>
      <div className="p-2 flex flex-col">
        <p className="text-neutral-600 text-sm font-semibold">
          {user?.data?.name}
        </p>
        <p className="text-neutral-800 text-sm font-semibold">
          {product?.data?.name}
        </p>
        <span className="flex items-center gap-x-2">
          <p
            className={cn(
              "text-base font-semibold text-gray-950",
              product?.data?.isOnSale && "line-through opacity-75"
            )}>
            ${product?.data?.price}
          </p>
          {product?.data?.isOnSale && (
            <p className="text-sm font-semibold text-red-500">
              ${product?.data?.salePrice}
            </p>
          )}
        </span>
      </div>
    </Link>
  );
};

export default ProductFavoriteCard;
