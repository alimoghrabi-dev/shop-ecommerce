import { EditProductValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { Input } from "../ui/input";
import { Check, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { DialogClose } from "../ui/dialog";
import { useEditProductMutation } from "@/lib/react-query/queries-and-mutations";
import { toast } from "react-toastify";

type EditProductFormProps = {
  productId: string;
  name: string;
  description: string;
  price: number;
  isOnSale: boolean;
  salePrice: number;
  isOutOfStock: boolean;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditProductForm = ({
  productId,
  name,
  description,
  price,
  isOnSale,
  salePrice,
  isOutOfStock,
  setIsEditOpen,
}: EditProductFormProps) => {
  const {
    mutateAsync: editProduct,
    isPending,
    isError,
  } = useEditProductMutation();

  const form = useForm<z.infer<typeof EditProductValidator>>({
    resolver: zodResolver(EditProductValidator),
    defaultValues: {
      name: name || "",
      description: description || "",
      price: price || 0,
      isOnSale: isOnSale,
      salePrice: salePrice || 0,
      isOutOfStock: isOutOfStock,
    },
  });

  useEffect(() => {
    if (!form.watch("isOnSale")) {
      form.setValue("salePrice", 0);
    }
  }, [form.getValues("isOnSale")]);

  const handleSubmit = async (data: z.infer<typeof EditProductValidator>) => {
    await editProduct({
      productId,
      name: data.name,
      description: data.description,
      price: data.price,
      isOnSale: data.isOnSale,
      salePrice: data.salePrice,
      isOutOfStock: data.isOutOfStock,
    });

    if (isError) {
      return toast.error("An error occurred");
    }

    toast.success("Product edited successfully");
    form.reset();

    setIsEditOpen(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-y-4"
      >
        <div className="w-full flex items-center gap-x-2.5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[95%]">
                <FormLabel className="text-sm font-medium text-primary">
                  Name
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Product Name"
                    className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0 hover:shadow focus:border-primary transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-primary">
                  Price ($)
                </FormLabel>
                <div className="relative">
                  <div className="absolute right-3 top-[8%] flex flex-col">
                    <ChevronUp
                      onClick={() => field.onChange(field.value + 1)}
                      size={17}
                      className="cursor-pointer text-gray-950 hover:text-primary transition-all"
                    />
                    <ChevronDown
                      onClick={() => {
                        if (field.value > 0) {
                          field.onChange(field.value - 1);
                        }
                      }}
                      size={17}
                      className="cursor-pointer text-gray-950 hover:text-primary transition-all"
                    />
                  </div>

                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value));
                    }}
                    className="outline-none hide-arrow focus-visible:ring-0 focus-visible:ring-offset-0 hover:shadow focus:border-primary transition-all"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-primary">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  style={{ resize: "none" }}
                  rows={5}
                  placeholder="Product Description"
                  className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0 hover:shadow focus:border-primary transition-all"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex items-center gap-x-9">
          <FormField
            control={form.control}
            name="isOnSale"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm font-medium text-primary">
                  On Sale ?
                </FormLabel>
                <FormControl>
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={cn(
                      "size-10 flex items-center justify-center rounded-md hover:opacity-85 transition-all",
                      field.value ? "bg-primary" : "bg-secondary shadow"
                    )}
                  >
                    <Check
                      size={22}
                      className={
                        field.value ? "text-white" : "text-gray-950/85"
                      }
                    />
                  </button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={!form.watch("isOnSale")}
            control={form.control}
            name="salePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-primary">
                  Sale Price ($)
                </FormLabel>
                <div className="relative">
                  <div className="absolute right-3 top-[8%] flex flex-col">
                    <ChevronUp
                      onClick={() => field.onChange(field.value + 1)}
                      size={17}
                      className="cursor-pointer text-gray-950 hover:text-primary transition-all"
                    />
                    <ChevronDown
                      onClick={() => {
                        if (field.value > 0) {
                          field.onChange(field.value - 1);
                        }
                      }}
                      size={17}
                      className="cursor-pointer text-gray-950 hover:text-primary transition-all"
                    />
                  </div>

                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value));
                    }}
                    className="outline-none hide-arrow focus-visible:ring-0 focus-visible:ring-offset-0 hover:shadow focus:border-primary transition-all"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-px h-16 bg-black/20" />
          <FormField
            control={form.control}
            name="isOutOfStock"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm font-medium text-primary">
                  Out of Stock ?
                </FormLabel>
                <FormControl>
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={cn(
                      "size-10 flex items-center justify-center rounded-md hover:opacity-85 transition-all",
                      field.value ? "bg-primary" : "bg-secondary shadow"
                    )}
                  >
                    <Check
                      size={22}
                      className={
                        field.value ? "text-white" : "text-gray-950/85"
                      }
                    />
                  </button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex items-center gap-x-4 mt-2">
          <DialogClose
            type="button"
            className="w-full border border-gray-950/40 rounded-lg bg-white text-gray-950/85 font-semibold py-[7px] hover:bg-secondary/30 transition"
          >
            Cancel
          </DialogClose>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full font-semibold"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProductForm;
