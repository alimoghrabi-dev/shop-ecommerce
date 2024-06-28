import { Plus } from "lucide-react";
import { useState } from "react";
import AddProductForm from "../forms/AddProductForm";

const AddProduct = ({ userId }: { userId: string | undefined }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col gap-y-4 bg-white border border-secondary rounded-md p-4">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-950">New Product</h2>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="text-base font-medium text-primary flex items-center gap-x-1 hover:opacity-85 transition">
            <Plus size={19} className="mt-0.5" />
            Create
          </button>
        )}
      </div>
      {isOpen && (
        <>
          <div className="w-full h-px bg-secondary/20" />
          <AddProductForm setIsOpen={setIsOpen} userId={userId} />
        </>
      )}
    </div>
  );
};

export default AddProduct;
