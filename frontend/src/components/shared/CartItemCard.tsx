import {
  useGetCartProductByIdQuery,
  useGetUserByIdQuery,
  useRemoveItemFromCartMutation,
} from "@/lib/react-query/queries-and-mutations";
import { cn, formatPrice, getInitials } from "@/lib/utils";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { FaTag } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type CartItemCardProps = {
  item: string;
  loggedInUserId: string;
};

const CartItemCard = ({ item, loggedInUserId }: CartItemCardProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const { data: product } = useGetCartProductByIdQuery(item);

  const { data: user } = useGetUserByIdQuery(product?.data?.userId);

  const { mutateAsync: removeFromCart, isPending } =
    useRemoveItemFromCartMutation();

  const handleRemoveFromCart = async () => {
    const cart = await removeFromCart({
      userId: loggedInUserId,
      productId: product?.data?._id,
    });

    if (!cart) {
      return toast.error("Failed to remove from cart");
    }

    toast.success("Product Removed from Cart");
  };

  if (product?.data?.isOutOfStock) {
    handleRemoveFromCart();
  }

  return (
    <div className="w-full flex items-start justify-between">
      <div className="flex gap-x-4 h-32">
        <img
          src={product?.data?.images[0]}
          alt="image-of-product"
          className="w-[120px] h-full rounded-lg object-cover object-center"
        />
        <div className="h-full flex flex-col justify-between py-1">
          <span className="flex items-center gap-x-2">
            {product?.data?.isOnSale && (
              <div className="p-1 bg-red-500 rounded-md flex items-center justify-center">
                <FaTag size={16} className="text-white" />
              </div>
            )}
            <Link
              to={`/product/${product?.data?._id}`}
              className="text-xl font-semibold text-gray-950">
              {product?.data?.name}
            </Link>
          </span>
          <div className="flex flex-col gap-y-1.5">
            <Link
              to={`/profile/${user?.data?._id}`}
              className="flex items-center gap-x-2">
              {user?.data?.profilePic ? (
                <img
                  src={user?.data?.profilePic}
                  alt="user-image"
                  className="w-7 h-7 rounded-full object-cover object-center"
                />
              ) : (
                <div className="size-7 bg-primary uppercase flex items-center justify-center text-white text-[12px] font-semibold rounded-full">
                  {getInitials(user?.data?.name)}
                </div>
              )}
              <p className="text-base font-semibold text-gray-900">
                {user?.data?.name}
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-y-2.5">
        <span className="flex items-center gap-x-3">
          {product?.data?.isOnSale && (
            <p className="text-lg font-semibold text-red-500">
              {formatPrice(product?.data?.salePrice)}
            </p>
          )}
          <p
            className={cn(
              "text-xl font-semibold text-gray-950",
              product?.data?.isOnSale && "line-through opacity-80"
            )}>
            {formatPrice(product?.data?.price)}
          </p>
        </span>
        <div className="px-2.5 py-1.5 rounded-md bg-secondary/75 flex items-center justify-center gap-x-1.5">
          {quantity === 1 ? (
            <button
              onClick={handleRemoveFromCart}
              disabled={isPending}
              className="justify-center hover:opacity-85 transition-all disabled:opacity-60">
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash2 size={18} className="text-gray-950" />
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                if (quantity === 1) {
                  return;
                } else {
                  setQuantity(quantity - 1);
                }
              }}
              className="justify-center hover:opacity-85 transition-all disabled:opacity-60">
              <Minus size={17} className="text-gray-950" />
            </button>
          )}

          <p className="text-gray-950 font-semibold text-base w-[25px] text-center mb-[1px]">
            {quantity}
          </p>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="justify-center hover:opacity-85 transition-all disabled:opacity-60">
            <Plus size={17} className="text-gray-950" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
