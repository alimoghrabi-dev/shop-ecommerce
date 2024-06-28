import { Star } from "lucide-react";
import { useState } from "react";

type StarRatingProps = {
  rating: number;
  setRating: (value: number) => void;
};

const StarRating = ({ rating, setRating }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="w-full flex items-center justify-center gap-x-1 mt-3 mb-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              className="hidden"
              value={ratingValue}
              onClick={() => handleRatingClick(ratingValue)}
            />
            <Star
              className={
                ratingValue <= (hover || rating)
                  ? "text-[#ffc107] fill-[#ffc107] cursor-pointer"
                  : "text-secondary fill-secondary cursor-pointer"
              }
              size={24}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
