import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminEditProductNameMutation } from "@/lib/react-query/queries-and-mutations";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { MdEdit, MdCancel } from "react-icons/md";
import { toast } from "react-toastify";

interface ProductNameFormProps {
  productId: string;
  name: string;
}

const ProductNameForm = ({ productId, name }: ProductNameFormProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(name || "");

  const {
    mutateAsync: editName,
    isPending,
    isError,
    error,
  } = useAdminEditProductNameMutation();

  const handleSave = async () => {
    await editName({
      productId,
      name: value,
    });

    if (isError || error) {
      return toast.error("Failed to edit product name");
    }

    setIsOpen(false);

    toast.success("Product name updated successfully");
  };

  return (
    <div className="w-full border border-secondary p-4 rounded-lg flex flex-col gap-y-4">
      <div className="w-full flex items-center justify-between">
        <p className="text-base font-semibold text-gray-950">Product Name</p>
        {isOpen ? (
          <button
            onClick={() => {
              setIsOpen(false);
              setValue(name);
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
          placeholder="Product Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-neutral-500 placeholder:font-semibold font-semibold text-gray-950"
        />
      ) : (
        <p className="text-neutral-700 font-medium text-sm italic">{name}</p>
      )}
      {isOpen && (
        <Button
          onClick={handleSave}
          disabled={value === name || !value || isPending}
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

export default ProductNameForm;
