import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminEditProductPriceMutation } from "@/lib/react-query/queries-and-mutations";
import { formatPrice } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { MdEdit, MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

interface ProductPriceFormProps {
  productId: string;
  price: number;
}

const ProductPriceForm = ({ productId, price }: ProductPriceFormProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(price || 0);

  const {
    mutateAsync: editPrice,
    isPending,
    isError,
    error,
  } = useAdminEditProductPriceMutation();

  const handleSave = async () => {
    await editPrice({
      productId,
      price: value,
    });

    if (isError || error) {
      return toast.error("Failed to edit product price");
    }

    setIsOpen(false);

    toast.success("Product price updated successfully");
  };

  return (
    <div className="w-full border border-secondary p-4 rounded-lg flex flex-col gap-y-4">
      <div className="w-full flex items-center justify-between">
        <p className="text-base font-semibold text-gray-950">Product Price</p>
        {isOpen ? (
          <button
            onClick={() => {
              setIsOpen(false);
              setValue(price);
            }}
            className="flex items-center gap-x-1 text-neutral-500 font-semibold text-sm hover:opacity-80 transition-all"
          >
            <MdCancel size={16} />
            Cancel
          </button>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-x-1 text-primary font-semibold text-sm hover:opacity-80 transition-all"
          >
            <MdEdit size={16} />
            Edit
          </button>
        )}
      </div>
      {isOpen ? (
        <Input
          type="number"
          placeholder="Product Price"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-neutral-500 placeholder:font-semibold font-semibold text-gray-950"
        />
      ) : (
        <p className="text-neutral-700 font-medium text-sm italic">
          {formatPrice(price)}
        </p>
      )}
      {isOpen && (
        <Button
          onClick={handleSave}
          disabled={value === price || !value || isPending}
          className="w-[125px] font-semibold"
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Save Changes"
          )}
        </Button>
      )}
    </div>
  );
};

export default ProductPriceForm;
