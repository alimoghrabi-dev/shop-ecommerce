import { Link } from "react-router-dom";
import FetchStarsRate from "../shared/FetchStarsRate";
import { cn, formatPrice } from "@/lib/utils";
import { FaTag } from "react-icons/fa6";

interface MostRatedProductCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  price: number;
  isOnSale: boolean;
  isOutOfStock: boolean;
  salePrice: number;
}

const MostRatedProductCard = ({
  id,
  name,
  image,
  rating,
  price,
  isOnSale,
  isOutOfStock,
  salePrice,
}: MostRatedProductCardProps) => {
  return (
    <Link
      to={`/product/${id}`}
      className="w-full flex flex-col rounded-md shadow hover:bg-secondary/40 hover:opacity-75 transition-all"
    >
      <div className="relative w-full h-56">
        {isOnSale && (
          <div className="absolute top-2 left-2 p-1 bg-red-500 rounded-lg flex items-center justify-center">
            <FaTag size={18} className="text-white" />
          </div>
        )}

        <img
          src={image}
          alt={`image-[${id}]`}
          className="w-full h-full object-cover rounded-t-md object-center"
        />
      </div>
      <div className="px-4 py-2.5 flex flex-col gap-y-2">
        <p className="text-base font-semibold text-gray-950 line-clamp-2">
          {name}
        </p>
        <FetchStarsRate rate={rating} />
        {isOutOfStock ? (
          <p className="text-center line-through text-red-500 font-semibold text-sm">
            Out of Stock
          </p>
        ) : (
          <span className="flex items-center gap-x-2">
            <p
              className={cn(
                "text-sm font-semibold text-gray-950/85",
                isOnSale && "line-through text-gray-950/60"
              )}
            >
              {formatPrice(price)}
            </p>
            {isOnSale && (
              <p className="text-red-500 font-medium text-sm">
                {formatPrice(salePrice)}
              </p>
            )}
          </span>
        )}
      </div>
    </Link>
  );
};

export default MostRatedProductCard;
