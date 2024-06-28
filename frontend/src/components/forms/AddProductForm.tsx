import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { CreateNewProductValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ChevronDown, ChevronUp, File, Loader2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { useCreateProductMutation } from "@/lib/react-query/queries-and-mutations";

type AddProductFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
};

const AddProductForm = ({ setIsOpen, userId }: AddProductFormProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleOpenFileInput = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 6) {
      toast.error("You can only select up to 5 images.");
      return;
    }
    setSelectedFiles(files);
  };

  const uploadImages = async () => {
    const downloadUrls = [];

    for (const file of selectedFiles) {
      const imageRef = ref(storage, `products/${file.name}-${uuidv4()}`);

      const snapshot = await uploadBytes(imageRef, file);

      const downloadURL = await getDownloadURL(snapshot.ref);

      downloadUrls.push(downloadURL);
    }

    console.log(downloadUrls);
    return downloadUrls;
  };

  const form = useForm<z.infer<typeof CreateNewProductValidator>>({
    resolver: zodResolver(CreateNewProductValidator),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  const { isSubmitting } = form.formState;

  const {
    mutateAsync: createProduct,
    isPending: isCreating,
    isError,
  } = useCreateProductMutation();

  const onSubmit = async (
    values: z.infer<typeof CreateNewProductValidator>
  ) => {
    try {
      const imagesUrls = await uploadImages();

      await createProduct({
        ...values,
        userId,
        images: imagesUrls,
      });

      if (isError) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.success("Product created successfully");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="w-full flex items-center gap-x-2.5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-[95%]">
                <FormLabel className="text-sm font-medium">
                  Name <span className="text-primary">*</span>
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
                <FormLabel className="text-sm font-medium">
                  Price ($) <span className="text-primary">*</span>
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
                    min={0}
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
              <FormLabel className="text-sm font-medium">
                Description <span className="text-primary">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  style={{ resize: "none" }}
                  placeholder="Product Description (max 200 characters)"
                  className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0 hover:shadow focus:border-primary transition-all"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full">
          <input
            type="file"
            id="fileInput"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={handleOpenFileInput}
            className="w-full bg-secondary/20 border border-secondary rounded-sm h-72 cursor-pointer hover:opacity-80 transition-all"
          >
            {selectedFiles.length > 0 ? (
              <div className="w-full grid grid-cols-3">
                {selectedFiles.map((file, index) => (
                  <div key={index}>
                    <img
                      src={URL.createObjectURL(file)}
                      className="w-full h-[9rem] object-cover border border-secondary"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-full relative flex flex-col items-center justify-center gap-y-2">
                <File size={40} className="text-gray-950" />
                <p className="text-base font-semibold text-gray-950">
                  Upload Images (max 6)
                </p>

                <p className="absolute w-full bottom-2 left-[70px] text-sm font-medium text-gray-950">
                  <span className="text-primary font-semibold">Note:</span>{" "}
                  First image will be used as product display.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-x-2">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setIsOpen(false)}
            className="hover:bg-secondary/20 transition-all px-5 font-semibold"
          >
            Cancel
          </Button>
          <Button
            disabled={isSubmitting || isCreating}
            type="submit"
            className="font-semibold"
          >
            {isSubmitting || isCreating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddProductForm;
