import { useDeleteProductMutation } from "@/lib/react-query/queries-and-mutations";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface AdminPageUserProductCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

const AdminPageUserProductCard = ({
  id,
  name,
  image,
  description,
}: AdminPageUserProductCardProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const {
    mutateAsync: deleteProduct,
    isPending,
    isError,
  } = useDeleteProductMutation();

  const handleDelete = async () => {
    await deleteProduct(id);

    if (isError) {
      return toast.error("Failed to delete product");
    }

    toast.success("Product deleted successfully");

    setIsDeleting(false);
  };

  return isDeleting ? (
    <div className="w-full flex flex-col items-center justify-center gap-y-2 py-[21px]">
      <div className="flex items-center gap-x-2">
        <button
          onClick={() => setIsDeleting(false)}
          className="py-1.5 px-5 border border-neutral-200 rounded-md text-gray-950 font-semibold hover:opacity-75 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="py-1.5 px-5 border border-red-500 bg-red-500 rounded-md text-white font-semibold hover:opacity-75 transition disabled:opacity-65 disabled:cursor-default"
        >
          Confirm
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full flex items-center justify-between">
      <div className="flex gap-x-3">
        <div className="size-20 relative">
          <img
            src={image}
            alt="pfp"
            className="w-full h-full object-cover object-center rounded-xl shadow"
          />
        </div>
        <span className="flex flex-col gap-y-0.5">
          <Link
            to={`/product/${id}`}
            className="text-gray-950 font-semibold text-base max-w-[255px] truncate"
          >
            {name}
          </Link>
          <p className="text-neutral-600 font-medium text-sm line-clamp-2 max-w-[255px] break-words">
            {description}
          </p>
        </span>
      </div>
      <div className="flex items-center gap-x-2">
        <Link
          to={`/dashboard/admin/stores/edit/product/${id}`}
          className="text-gray-950 hover:opacity-85 tansition"
        >
          <Edit size={21} />
        </Link>
        <button
          onClick={() => setIsDeleting(true)}
          className="text-red-500 hover:opacity-85 transition"
        >
          <Trash2 size={21} />
        </button>
      </div>
    </div>
  );
};

export default AdminPageUserProductCard;
