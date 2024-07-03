import { cn } from "@/lib/utils";
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";

const FetchStarsRate = ({
  rate,
  isCard,
}: {
  rate: number;
  isCard?: boolean;
}) => {
  const fullStars = Math.floor(rate);
  const decimalPart = rate - fullStars;

  let fractionalStar = null;

  if (decimalPart >= 0.85) {
    fractionalStar = (
      <FaStar
        key={`full`}
        className={cn("text-gold", isCard ? "w-3 h-3" : "h-4 w-4")}
      />
    );
  } else if (decimalPart >= 0.25 && decimalPart < 0.85) {
    fractionalStar = (
      <FaRegStarHalfStroke
        key={`half`}
        className={cn("text-gold", isCard ? "w-3 h-3" : "h-4 w-4")}
      />
    );
  } else {
    fractionalStar = null;
  }

  const emptyStars = 5 - fullStars - (fractionalStar ? 1 : 0);

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <FaStar
        key={i}
        className={cn("text-gold", isCard ? "w-3 h-3" : "h-4 w-4")}
      />
    );
  }
  if (fractionalStar) {
    stars.push(fractionalStar);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <FaStar
        key={`empty-${i}`}
        className={cn("text-gray-300", isCard ? "w-3 h-3" : "h-4 w-4")}
      />
    );
  }

  return <div className="flex items-center gap-x-1">{stars}</div>;
};

export default FetchStarsRate;
