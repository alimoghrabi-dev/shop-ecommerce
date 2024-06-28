import { useGetUserByIdQuery } from "@/lib/react-query/queries-and-mutations";
import { formatDate } from "@/lib/utils";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

type SignleProductReviewProps = {
  rating: number;
  userId: string | undefined;
  content: string;
  createdAt: Date;
};

const SingleProductReview = ({
  rating,
  userId,
  content,
  createdAt,
}: SignleProductReviewProps) => {
  const { data: user } = useGetUserByIdQuery(userId);

  return (
    <div className="w-full flex flex-col gap-y-1.5">
      <span className="flex items-center gap-x-1">
        {Array.from({ length: rating }, (_, i) => (
          <Star key={i} size={17} className="text-gray-950 fill-gray-950" />
        ))}
      </span>
      <span className="text-xs font-medium text-neutral-600 flex items-center gap-x-1.5">
        <Link to={`/profile/${user?.data._id}`}>{user?.data.name}</Link>-
        <p>{formatDate(createdAt)}</p>
      </span>
      <p className="text-gray-950 font-semibold text-sm max-w-[200px] line-clamp-3 break-words">
        {content}
      </p>
    </div>
  );
};

export default SingleProductReview;
