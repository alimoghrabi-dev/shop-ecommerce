import { useParams } from "react-router-dom";
import ProductNameForm from "./forms/ProductNameForm";
import { useGetProductByIdQuery } from "@/lib/react-query/queries-and-mutations";
import Loader from "../shared/Loader";
import ProductDescriptionForm from "./forms/ProductDescriptionForm";
import ProductPriceForm from "./forms/EditProductPrice";

const AdminEditProduct = () => {
  const params = useParams();

  const {
    data: product,
    isLoading,
    isPending,
  } = useGetProductByIdQuery(params.productId);

  if (isLoading || isPending) {
    return (
      <div className="w-full flex items-center justify-center py-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-3 gap-4">
      <ProductNameForm
        productId={product?.data?._id}
        name={product?.data?.name}
      />
      <ProductDescriptionForm
        productId={product?.data?._id}
        description={product?.data?.description}
      />
      <ProductPriceForm
        productId={product?.data?._id}
        price={product?.data?.price}
      />
    </div>
  );
};

export default AdminEditProduct;
