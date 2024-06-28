import { useGetProductReviewsQuery } from "@/lib/react-query/queries-and-mutations";
import { Loader2 } from "lucide-react";
import SingleProductReview from "./SingleProductReview";
import { Review } from "@/types";

const FetchProductReviews = ({ productId }: { productId: string }) => {
  const {
    data: reviews,
    isLoading,
    isPending,
  } = useGetProductReviewsQuery(productId);

  if (isLoading || isPending) {
    return (
      <div className="w-full flex items-center justify-center mt-6">
        <Loader2 className="w-6 h-6 animate-spin opacity-80" />
      </div>
    );
  }

  const lastSixReviews = reviews.data.slice(-6);

  return reviews.data.length === 0 ? (
    <p className="text-base font-semibold text-gray-950/85 text-center italic mt-4">
      No reviews for this product.
    </p>
  ) : (
    <div className="mt-4 w-full grid grid-cols-2 gap-4">
      {lastSixReviews.map((review: Review) => (
        <SingleProductReview
          key={review._id}
          rating={review.rating}
          userId={review.userId}
          content={review.content}
          createdAt={review.createdAt}
        />
      ))}
    </div>
  );
};

export default FetchProductReviews;
