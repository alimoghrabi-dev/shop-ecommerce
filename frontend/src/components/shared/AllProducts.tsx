import { useGetUserProductsQuery } from "@/lib/react-query/queries-and-mutations";
import { X } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import UserProductCard from "./UserProductCard";
import { Product } from "@/types";

type AllProductsProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
};

const AllProducts = ({ setIsOpen, userId }: AllProductsProps) => {
  const {
    data: products,
    isLoading,
    isPending,
  } = useGetUserProductsQuery(userId);

  return (
    <div className="h-[607px] w-full relative">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-0 right-2 z-20 p-1 hover:opacity-85 transition-all rounded-full">
        <X size={20} className="text-primary" />
      </button>
      {isLoading || isPending ? (
        <Skeleton className="w-full h-full" />
      ) : products.data.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-xl text-center font-semibold text-gray-950">
            No products yet, <br />{" "}
            <span className="text-primary">Create some.</span>
          </p>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-y-2 mt-10 overflow-y-auto">
          {products.data.map((product: Product) => (
            <UserProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              description={product.description}
              image={product.images[0]}
              price={product.price}
              isOnSale={product.isOnSale}
              salePrice={product.salePrice}
              isOutOfStock={product.isOutOfStock}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
