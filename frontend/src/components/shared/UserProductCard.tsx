import { cn, formatPrice } from "@/lib/utils";
import { Edit, Loader2, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import EditProductForm from "../forms/EditProductForm";
import { Button } from "../ui/button";
import { useDeleteProductMutation } from "@/lib/react-query/queries-and-mutations";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaTag } from "react-icons/fa6";

type UserProductCardProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  isOnSale: boolean;
  salePrice: number;
  isOutOfStock: boolean;
};

const UserProductCard = ({
  id,
  name,
  description,
  image,
  price,
  isOnSale,
  salePrice,
  isOutOfStock,
}: UserProductCardProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

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

    setIsDeleteOpen(false);
    toast.success("Product deleted successfully");
  };

  return (
    <div className="w-full border border-secondary rounded-md flex items-center gap-x-2 justify-between p-4 hover:bg-secondary/20 transition-all">
      <div className="flex items-center gap-x-2.5">
        <img
          src={image}
          alt="product-image"
          className="size-16 object-cover object-center rounded-md border border-secondary"
        />
        <div className="flex flex-col gap-y-0.5">
          <span className="flex items-center gap-x-2">
            {isOnSale && (
              <div className="p-[3px] bg-red-500 rounded-md flex items-center justify-center">
                <FaTag size={12} className="text-white" />
              </div>
            )}
            <Link
              to={`/product/${id}`}
              className="text-lg font-semibold text-gray-950 max-w-[200px] truncate"
            >
              {name}
            </Link>
          </span>
          <p className="text-sm font-medium max-w-[175px] truncate text-gray-700">
            {description}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-y-1.5">
        <span className="flex items-center gap-x-2">
          {isOnSale && (
            <p className="text-sm font-semibold text-red-500">
              {formatPrice(salePrice)}
            </p>
          )}
          <p
            className={cn(
              "text-base font-semibold text-primary",
              isOnSale && "line-through text-gray-950 opacity-75"
            )}
          >
            {formatPrice(price)}
          </p>
        </span>
        <div className="flex items-center gap-x-1.5">
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogTrigger>
              <button className="border border-secondary rounded-md p-1 hover:bg-primary hover:border-primary hover:text-white transition-all">
                <Edit size={17} />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Edit Product Details{" "}
                  <span className="text-primary">({name})</span>
                </DialogTitle>
              </DialogHeader>
              <EditProductForm
                productId={id}
                name={name}
                description={description}
                price={price}
                isOnSale={isOnSale}
                salePrice={salePrice}
                isOutOfStock={isOutOfStock}
                setIsEditOpen={setIsEditOpen}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogTrigger>
              <button className="bg-red-600 hover:bg-red-500 text-white p-1 rounded-md transition-all">
                <Trash size={17} />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete
                  <span className="text-primary"> {name}</span> ?
                </DialogTitle>
              </DialogHeader>
              <div className="w-full flex items-center gap-x-2.5 mt-6">
                <DialogClose className="w-full font-semibold border border-secondary rounded-lg py-2 hover:opacity-80 transition">
                  Cancel
                </DialogClose>
                <Button
                  disabled={isPending}
                  onClick={handleDelete}
                  variant={"destructive"}
                  className="w-full font-semibold"
                >
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default UserProductCard;
