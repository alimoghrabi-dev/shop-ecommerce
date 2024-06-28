import { Link } from "react-router-dom";
import FetchStarsRate from "./FetchStarsRate";
import { useGetUserByIdQuery } from "@/lib/react-query/queries-and-mutations";
import { cn, formatPrice, getInitials } from "@/lib/utils";

interface RecommendedProductCardProps {
  productId: string;
  name: string;
  image: string;
  price: number;
  averageRating: number;
  isOnSale: boolean;
  salePrice: number;
  isOutOfStock: boolean;
  userOfProduct: string | undefined;
}

const RecommendedProductCard = ({
  productId,
  name,
  image,
  price,
  averageRating,
  isOnSale,
  salePrice,
  isOutOfStock,
  userOfProduct,
}: RecommendedProductCardProps) => {
  const { data: user } = useGetUserByIdQuery(userOfProduct);

  return (
    <Link
      to={`/product/${productId}`}
      className="w-full flex flex-col shadow rounded-md hover:opacity-75 transition-all"
    >
      <div className="relative w-full h-44">
        <img
          src={image}
          alt={`image-of-${name}`}
          className="w-full h-full rounded-t-md object-cover object-center"
        />
      </div>
      <div className="p-4 flex flex-col gap-y-2">
        <p className="text-gray-950 font-semibold text-base line-clamp-2">
          {name}
        </p>
        <FetchStarsRate rate={averageRating} />
        {!isOutOfStock && (
          <span className="flex items-center gap-x-2">
            <p
              className={cn("text-gray-950 font-semibold text-base", {
                "line-through opacity-75": isOnSale,
              })}
            >
              {formatPrice(price)}
            </p>
            {isOnSale && (
              <p className="text-red-500 font-semibold text-sm">
                {formatPrice(salePrice)}
              </p>
            )}
          </span>
        )}

        <span className="flex items-center gap-x-2 mt-1.5">
          {user?.data?.profilePic ? (
            <img
              src={user?.data?.profilePic}
              alt="pfp"
              className="size-8 rounded-full object-cover object-center"
            />
          ) : (
            <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
              {getInitials(user?.data?.name)}
            </div>
          )}
          <Link
            to={`/profile/${user?.data?._id}`}
            className="text-gray-950 font-semibold text-sm hover:opacity-80 transition"
          >
            {user?.data?.name}
          </Link>
        </span>
        {isOutOfStock && (
          <p className="text-red-500 font-semibold text-sm line-through text-center">
            Out of stock
          </p>
        )}
      </div>
    </Link>
  );
};

export default RecommendedProductCard;
