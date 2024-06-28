import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import StarRating from "./StarRating";
import { useState } from "react";
import { useCreateUserReviewMutation } from "@/lib/react-query/queries-and-mutations";
import { toast } from "react-toastify";
import FetchUserReviews from "./FetchUserReviews";

interface UserReviewsProps {
  userId: string | undefined;
  currentUserId: string | undefined;
  username: string;
}

const UserReviews = ({ userId, currentUserId, username }: UserReviewsProps) => {
  const [reviewContent, setReviewContent] = useState<string | undefined>(
    undefined
  );
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutateAsync, isPending: isAddingReview } =
    useCreateUserReviewMutation();

  const emptyFields = !reviewContent || !rating;

  const addUserReview = async () => {
    if (!reviewContent || !rating) {
      return;
    }

    const review = await mutateAsync({
      userId: currentUserId,
      content: reviewContent,
      rating,
      userToAddToId: userId,
    });

    if (!review) {
      return toast.error("An error occurred");
    }

    toast.success("Review added successfully");
    setReviewContent(undefined);
    setRating(0);
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-y-4 mt-4">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-gray-950 font-semibold text-xl">Reviews</h3>
        {userId !== currentUserId && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="text-primary font-semibold text-sm hover:opacity-85 transition">
              Add Review
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-lg font-semibold">
                <DialogTitle className="flex items-center gap-x-1.5">
                  What is your opinion about
                  <span className="text-primary">{username}</span>?
                </DialogTitle>
              </DialogHeader>
              <div className="w-full flex flex-col gap-y-1">
                <Textarea
                  style={{ resize: "none" }}
                  rows={5}
                  value={reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  placeholder="What are your thoughts?"
                  className="focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-primary/25 focus-visible:border-primary/75 transition-all outline-none"
                />
                <StarRating rating={rating} setRating={setRating} />
                <Button
                  disabled={isAddingReview || emptyFields}
                  onClick={addUserReview}
                  className="mt-2 font-semibold">
                  {isAddingReview ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Add Review"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <FetchUserReviews userId={userId} />
    </div>
  );
};

export default UserReviews;
