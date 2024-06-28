import CartItemCard from "@/components/shared/CartItemCard";
import Loader from "@/components/shared/Loader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  useGetCartTotalQuery,
  useGetUserByIdQuery,
} from "@/lib/react-query/queries-and-mutations";
import { formatPrice } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const CartPage = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { userInfo } = useSelector((state) => state.auth);

  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
      return;
    }
  }, [auth, navigate, userInfo]);

  const {
    data: user,
    isLoading,
    isPending,
  } = useGetUserByIdQuery(auth?.user?.id);

  const {
    data: cartTotal,
    isPending: isPendingCartTotal,
    isLoading: isLoadingCartTotal,
    refetch: refetchCartTotal,
  } = useGetCartTotalQuery(user?.data?._id);

  useEffect(() => {
    if (location.pathname === "/cart") {
      document.title = `Cart | ${auth?.user?.name} (${user?.data?.cartItems.length}) `;
    }
  }, [location.pathname, auth?.user?.name, user?.data?.cartItems.length]);

  useEffect(() => {
    refetchCartTotal();
  }, [user?.data?.cartItems.length]);

  if (isPending || isLoading) {
    return (
      <div className="w-full flex items-center justify-center mt-24">
        <Loader />
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col gap-y-8 px-4 sm:px-12 md:px-20 lg:px-44 mt-16">
      {user?.data?.cartItems.length === 0 ? (
        <span className="w-full flex flex-col items-center justify-center gap-y-2.5">
          <p className="text-xl font-semibold text-gray-950">
            Your cart is empty
          </p>
          <p className="text-neutral-600 text-sm font-semibold">
            Add products while you shop, so they'll be ready for checkout later.
          </p>
        </span>
      ) : (
        <>
          <h2 className="text-gray-950 font-semibold text-2xl text-start">
            Cart {`(${user?.data?.cartItems.length})`}
          </h2>
          <div className="flex flex-col md:flex-row w-full border border-secondary rounded-2xl">
            <div className="w-full flex flex-col gap-y-8 p-7 border-r border-secondary">
              {user?.data?.cartItems.map((item: string) => (
                <CartItemCard
                  key={item}
                  item={item}
                  loggedInUserId={user?.data?._id}
                />
              ))}
            </div>
            <div className="w-[93%] bg-secondary h-px block md:hidden mx-auto" />
            <div className="p-7 flex flex-col gap-y-4">
              <span className="w-full flex items-center justify-between">
                <p className="text-base font-semibold text-gray-950">
                  Subtotal
                </p>
                <p className="text-lg font-bold text-primary">
                  {isLoadingCartTotal || isPendingCartTotal ? (
                    <Loader2 className="w-5 h-5 animate-spin opacity-80" />
                  ) : (
                    formatPrice(cartTotal?.total)
                  )}
                </p>
              </span>
              <Button className="rounded-lg font-semibold text-base">
                Continue to Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;
