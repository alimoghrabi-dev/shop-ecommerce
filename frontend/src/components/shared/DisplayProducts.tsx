import { Eye } from "lucide-react";
import { useState } from "react";
import AllProducts from "./AllProducts";

type DisplayProductsProps = {
  userId: string | undefined;
};

const DisplayProducts = ({ userId }: DisplayProductsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col gap-y-4 bg-white border border-secondary rounded-md p-4">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-950">View Products</h2>
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="text-base font-medium text-primary flex items-center gap-x-1 hover:opacity-85 transition">
            <Eye size={19} className="mt-0.5" />
            View
          </button>
        )}
      </div>
      {isOpen && (
        <>
          <div className="w-full h-px bg-secondary/20" />
          <AllProducts setIsOpen={setIsOpen} userId={userId} />
        </>
      )}
    </div>
  );
};

export default DisplayProducts;
