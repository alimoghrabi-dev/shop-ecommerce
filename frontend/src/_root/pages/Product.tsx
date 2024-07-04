import FetchProductReviews from "@/components/shared/FetchProductReviews";
import FetchStarsRate from "@/components/shared/FetchStarsRate";
import GetRecommendedProductForThisProduct from "@/components/shared/GetRecommendedProductForThisProduct";
import Loader from "@/components/shared/Loader";
import StarRating from "@/components/shared/StarRating";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import {
  useAddRemoveItemFromCartMutation,
  useCreateProductReviewMutation,
  useFollowUserMutation,
  useGetProductByIdQuery,
  useGetUserByIdQuery,
  useToggleFavoriteMutation,
  useUnFollowUserMutation,
} from "@/lib/react-query/queries-and-mutations";
import {
  cn,
  formatNumber,
  formatPrice,
  getFirstNumberAfterDecimal,
  getInitials,
} from "@/lib/utils";
import { CircleOff, Ellipsis, Heart, Loader2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Product = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { userInfo } = useSelector((state) => state.auth);

  const auth = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const params = useParams();

  const {
    data: product,
    isLoading,
    isPending,
    refetch,
  } = useGetProductByIdQuery(params.id);

  useEffect(() => {
    if (location.pathname.includes("/product")) {
      document.title = `Product | ${product?.data?.name}`;
    }
  }, [location.pathname, product?.data?.name]);

  const { data: loggedInUser, refetch: refetchLoggedInUser } =
    useGetUserByIdQuery(auth?.user?.id);

  const {
    data: user,
    isLoading: isLoadingUser,
    isPending: isPendingUser,
    refetch: refetchUser,
  } = useGetUserByIdQuery(product?.data.userId);

  const { mutateAsync, isPending: isAddingReview } =
    useCreateProductReviewMutation();

  const { mutateAsync: addRemoveItemFromCart, isPending: isAddingToCart } =
    useAddRemoveItemFromCartMutation();

  const { mutateAsync: toggleFavorite, isPending: isTogglingFavorite } =
    useToggleFavoriteMutation();

  const { mutateAsync: followUser, isPending: isFollowing } =
    useFollowUserMutation();

  const { mutateAsync: unFollowUser, isPending: isUnFollowing } =
    useUnFollowUserMutation();

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState(product?.data?.images[0]);
  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState<string | undefined>(
    undefined
  );

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (loggedInUser?.data.cartItems.includes(product?.data._id)) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [loggedInUser?.data.cartItems, product?.data._id]);

  useEffect(() => {
    if (loggedInUser?.data.favorites.includes(product?.data._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [loggedInUser?.data.favorites, product?.data._id]);

  const handleCart = () => {
    if (!userInfo || !auth?.user) {
      return navigate("/sign-in");
    }

    const cart = addRemoveItemFromCart({
      userId: auth?.user?.id,
      productId: product?.data._id,
    });

    if (!cart) {
      return toast.error("Failed to add to cart");
    }

    if (isInCart) {
      setIsInCart(false);

      toast.success("Product Removed from Cart");
    } else {
      setIsInCart(true);

      toast.success("Product Added to Cart");
    }
  };

  const handleToggleFavorite = () => {
    if (!userInfo || !auth?.user) {
      return navigate("/sign-in");
    }

    const favorite = toggleFavorite({
      userId: auth?.user?.id,
      productId: product?.data._id,
    });

    if (!favorite) {
      return toast.error("Failed to add to favorites");
    }

    if (isFavorite) {
      setIsFavorite(false);

      toast.success("Product Removed to Favorites");
    } else {
      setIsFavorite(true);

      toast.success("Product Added to Favorites");
    }
  };

  const handleAddReview = async () => {
    if (!auth?.token || !auth?.user) {
      return navigate("/sign-in");
    }

    if (!reviewContent || !rating) {
      return toast.error("Please fill all the fields");
    }

    const review = await mutateAsync({
      userId: auth?.user?.id,
      productId: product?.data._id,
      content: reviewContent,
      rating,
    });

    if (!review) {
      return toast.error("Failed to add review");
    }

    toast.success("Review added successfully");
    setReviewContent(undefined);
    setRating(0);
    setIsOpen(false);

    refetch();
  };

  const handleFollowUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!auth?.token || !auth?.user) {
      return navigate("/sign-in");
    }

    const follow = await followUser({
      userId: auth?.user?.id,
      follwingUserId: product?.data?.userId,
    });

    if (!follow) {
      return toast.error("Failed to follow user");
    }

    refetchUser();
    refetchLoggedInUser();

    toast.success("Followed user successfully");
  };

  const handleUnFollowUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!auth?.token || !auth?.user) {
      return navigate("/sign-in");
    }

    const unfollow = await unFollowUser({
      userId: auth?.user?.id,
      follwingUserId: product?.data?.userId,
    });

    if (!unfollow) {
      return toast.error("Failed to unfollow user");
    }

    refetchUser();
    refetchLoggedInUser();

    toast.success("Unfollowed user successfully");
  };

  if (isPending || isLoading || isPendingUser || isLoadingUser) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section className="w-full flex flex-col md:flex-row items-center md:items-start justify-center px-4 gap-x-12 mt-4">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-2">
            <img
              src={activeImage || product?.data.images[0]}
              alt="product-image-1"
              className={cn(
                "size-[500px] p-2.5 bg-secondary/70 rounded-lg object-cover object-center",
                imageLoaded
                  ? "opacity-100"
                  : "opacity-0 transition-opacity duration-500"
              )}
              onLoad={handleImageLoad}
            />
            <div className="flex items-center gap-x-2">
              {product?.data?.images.map((image: string, index: number) => (
                <img
                  key={index}
                  onClick={() => setActiveImage(image)}
                  src={image}
                  alt={image + index}
                  className={cn(
                    "size-[58px] bg-secondary/70 rounded-lg object-cover object-center cursor-pointer hover:opacity-85 transition",
                    activeImage === image
                      ? "ring-2 ring-gray-950"
                      : "hover:ring-2 hover:ring-gray-950",
                    activeImage === undefined &&
                      product?.data?.images.length === index + 3 &&
                      "ring-2 ring-gray-950"
                  )}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <span className="flex items-center w-full justify-between gap-x-4">
              <p className="text-xl font-semibold text-gray-950">Reviews</p>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                  <p className="text-primary font-medium text-base hover:text-primary/85 transition-all">
                    Add Review
                  </p>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Review</DialogTitle>
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
                      disabled={isAddingReview}
                      onClick={handleAddReview}
                      className="mt-2 font-semibold"
                    >
                      {isAddingReview ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        "Add Review"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </span>
            <FetchProductReviews productId={product?.data._id} />
          </div>
        </div>
        <div className="w-[75%] sm:w-1/2 md:w-[22.5%] flex flex-col gap-y-2 mt-16 md:mt-0">
          <div className="w-full flex items-center justify-between gap-x-3">
            <div className="flex items-center gap-x-2.5">
              {user?.data.profilePic ? (
                <img
                  src={user?.data.profilePic}
                  alt="profile"
                  className="size-9 object-cover object-center rounded-lg"
                />
              ) : (
                <div className="size-9 bg-primary text-white flex uppercase items-center justify-center font-semibold text-sm rounded-lg">
                  {getInitials(user?.data.name)}
                </div>
              )}
              <Link
                to={`/profile/${user?.data._id}`}
                className="text-base font-semibold text-gray-950"
              >
                {user?.data.name}
              </Link>
            </div>
            <Ellipsis size={21} className="text-gray-950" />
          </div>
          <div className="w-full flex items-center justify-between gap-x-3">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-950">
                {product.data.name}
              </p>

              {product?.data.averageRating === 0 ? (
                <p className="text-gray-950 font-semibold text-[13px]">
                  No reviews (0)
                </p>
              ) : (
                <div className="flex items-center gap-x-2">
                  <FetchStarsRate rate={product?.data?.averageRating} />
                  <p className="text-gray-950 font-medium text-sm">
                    ({formatNumber(product?.reviewsLength)})
                  </p>
                </div>
              )}
            </div>
            <button
              disabled={isTogglingFavorite}
              onClick={handleToggleFavorite}
              className={cn(
                "p-2.5 rounded-full transition-all",
                isFavorite
                  ? "bg-primary border border-primary hover:bg-primary/85"
                  : "border border-secondary hover:bg-secondary/40"
              )}
            >
              <Heart
                size={20}
                className={cn(
                  "text-gray-950",
                  isFavorite && "fill-white text-white"
                )}
              />
            </button>
          </div>
          <span className="flex items-center gap-x-3">
            {product.data.isOnSale && (
              <p className="text-base font-semibold text-red-500">
                {formatPrice(product.data.salePrice)}
              </p>
            )}
            <p
              className={cn(
                "text-base font-semibold text-gray-950",
                product.data.isOutOfStock && "line-through opacity-85",
                product.data.isOnSale && "text-gray-950/70 line-through"
              )}
            >
              {formatPrice(product.data.price)}
            </p>
          </span>
          {product.data.isOutOfStock ? (
            <div className="rounded-lg py-2 flex items-center justify-center font-semibold bg-black/15 hover:bg-black/15 text-black/70 cursor-not-allowed">
              Out of Stock
            </div>
          ) : (
            <div className="flex flex-col gap-y-2 w-full mt-3">
              <Button
                onClick={handleCart}
                variant={isInCart ? "destructive" : "default"}
                className="rounded-lg font-semibold"
              >
                {isAddingToCart ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isInCart ? (
                  "Remove from Cart"
                ) : (
                  "Add to Cart"
                )}
              </Button>
              <Button className="rounded-lg font-semibold bg-gray-950 hover:bg-gray-950/85">
                Buy Now
              </Button>
            </div>
          )}

          <div className="w-full h-px bg-secondary/75 mt-2" />
          <div className="w-full flex flex-col">
            <p className="text-gray-950 font-semibold text-lg">Description</p>
            <p className="text-gray-950 font-medium text-base max-w-full break-words leading-">
              {product.data.description}
            </p>
          </div>
          <div className="rounded-xl border border-secondary mt-5 flex flex-col">
            {user?.data.coverPic ? (
              <img
                src={user?.data.coverPic}
                alt="cover"
                className="w-full h-24 rounded-t-xl object-cover object-center"
              />
            ) : (
              <div className="w-full h-24 bg-secondary/60 rounded-t-xl flex items-center justify-center">
                <CircleOff size={30} className="text-gray-950" />
              </div>
            )}
            <Link
              to={`/profile/${user?.data._id}`}
              className="p-4 w-full flex items-center justify-between gap-x-3 hover:bg-secondary/40 cursor-pointer transition-all"
            >
              <span className="flex flex-col gap-y-0.5">
                <p className="text-gray-950 font-semibold text-sm">
                  {user?.data.name}
                </p>
                <span className="flex items-center gap-x-1">
                  <p className="text-gray-950 font-medium text-sm">
                    {getFirstNumberAfterDecimal(user?.data.averageRating)}
                  </p>
                  <p className="text-gray-900 text-xs font-semibold">
                    <Star size={14} className="fill-gray-900" />
                  </p>
                  <p className="text-gray-950 font-medium text-sm">
                    ({formatNumber(user?.reviewsLength)})
                  </p>
                </span>
              </span>
              {loggedInUser?.data?._id !== product?.data?.userId &&
                (loggedInUser?.data?.followings.includes(user?.data?._id) ? (
                  <Button
                    type="button"
                    disabled={isUnFollowing}
                    onClick={handleUnFollowUser}
                    size={"sm"}
                    className="bg-secondary text-gray-950 font-semibold hover:bg-secondary/50 rounded-xl"
                  >
                    Following
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled={isFollowing}
                    onClick={handleFollowUser}
                    size={"sm"}
                    className="bg-gray-950 font-semibold hover:bg-gray-950/90 rounded-xl"
                  >
                    Follow
                  </Button>
                ))}
            </Link>
          </div>
        </div>
      </section>
      <div className="w-full flex flex-col gap-y-8 px-4 sm:px-12 mt-24">
        <h3 className="text-gray-950 font-semibold text-xl sm:text-2xl">
          Recommended Products
        </h3>
        <GetRecommendedProductForThisProduct productId={product?.data?._id} />
      </div>
    </>
  );
};

export default Product;
