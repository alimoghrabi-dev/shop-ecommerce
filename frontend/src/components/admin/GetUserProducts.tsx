import { useGetUserProductsQuery } from "@/lib/react-query/queries-and-mutations";
import { Product } from "@/types";
import { Loader2 } from "lucide-react";
import AdminPageUserProductCard from "./AdminPageUserProductCard";

const GetUserProducts = ({ userId }: { userId: string | undefined }) => {
  const {
    data: products,
    isLoading,
    isPending,
  } = useGetUserProductsQuery(userId);

  return isLoading || isPending ? (
    <div className="w-full flex items-center justify-center py-4">
      <Loader2 size={21} className="text-gray-950 animate-spin opacity-85" />
    </div>
  ) : products?.data?.length === 0 ? (
    <p className="text-neutral-600 font-semibold italic text-sm">
      This user has no products
    </p>
  ) : (
    products?.data?.map((product: Product) => (
      <AdminPageUserProductCard
        key={product._id}
        id={product._id}
        name={product.name}
        image={product.images[0]}
        description={product.description}
      />
    ))
  );
};

export default GetUserProducts;
