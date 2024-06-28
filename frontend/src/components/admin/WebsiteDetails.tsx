import { useGetAdminSiteDetailsQuery } from "@/lib/react-query/queries-and-mutations";
import { formatNumber, formatPrice } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const WebsiteDetails = () => {
  const { data: details, isPending, isLoading } = useGetAdminSiteDetailsQuery();

  return (
    <div className="w-full flex flex-wrap justify-center gap-x-20 gap-y-6">
      <div className="flex flex-col gap-y-1">
        <p className="text-gray-950 font-semibold text-lg">Total Users</p>
        <p className="text-base font-semibold text-primary">
          {isLoading || isPending ? (
            <Loader2
              size={18}
              className="opacity-70 text-primary animate-spin"
            />
          ) : (
            formatNumber(details?.data?.nbOfUsers)
          )}
        </p>
      </div>
      <div className="flex flex-col gap-y-1">
        <p className="text-gray-950 font-semibold text-lg">Total Products</p>
        <p className="text-base font-semibold text-primary">
          {isLoading || isPending ? (
            <Loader2
              size={18}
              className="opacity-70 text-primary animate-spin"
            />
          ) : (
            formatNumber(details?.data?.nbOfProducts)
          )}
        </p>
      </div>
      <div className="flex flex-col gap-y-1">
        <p className="text-gray-950 font-semibold text-lg">Active Users</p>
        <p className="text-base font-semibold text-primary">
          {isLoading || isPending ? (
            <Loader2
              size={18}
              className="opacity-70 text-primary animate-spin"
            />
          ) : (
            formatNumber(details?.data?.activeUsers)
          )}
        </p>
      </div>
      <div className="flex flex-col gap-y-1">
        <p className="text-gray-950 font-semibold text-lg">Average Price</p>
        <p className="text-base font-semibold text-primary">
          {isLoading || isPending ? (
            <Loader2
              size={18}
              className="opacity-70 text-primary animate-spin"
            />
          ) : (
            formatPrice(details?.data?.averagePrice)
          )}
        </p>
      </div>
      <div className="flex flex-col gap-y-1">
        <p className="text-gray-950 font-semibold text-lg">Number Of Orders</p>
        <p className="text-base font-semibold text-primary">0</p>
      </div>
    </div>
  );
};

export default WebsiteDetails;
