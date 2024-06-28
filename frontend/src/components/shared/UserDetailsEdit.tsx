import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { EditUserValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useEditUserInfoMutation } from "@/lib/react-query/queries-and-mutations";
import { toast } from "react-toastify";
import FileUploader from "./FileUploader";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import CoverFileUploader from "./CoverFileUploader";

interface UserDetailsEditProps {
  userId: string;
  name: string;
  username: string | null;
  bio: string | null;
  profilePic: string | null;
  coverImage: string | null;
  phoneNumber: string | null;
  websiteUrl: string | null;
  setIsOpen: (isOpen: boolean) => void;
  setContentHeight: (contentHeight: string) => void;
}

const UserDetailsEdit = ({
  userId,
  name,
  username,
  bio,
  profilePic,
  coverImage,
  phoneNumber,
  websiteUrl,
  setIsOpen,
  setContentHeight,
}: UserDetailsEditProps) => {
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleUploadImage = async () => {
    if (!profileFile) return;

    const fileName = `${profileFile?.name}-${uuidv4()}`;

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, profileFile);

    await uploadTask;

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadURL;
  };

  const handleUploadCoverImage = async () => {
    if (!coverFile) return;

    const fileName = `${coverFile?.name}-${uuidv4()}`;

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, coverFile);

    await uploadTask;

    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

    return downloadURL;
  };

  const form = useForm<z.infer<typeof EditUserValidator>>({
    resolver: zodResolver(EditUserValidator),
    defaultValues: {
      name: name,
      username: username || "",
      bio: bio || "",
      profilePic: profilePic || "",
      coverImage: coverImage || "",
      phoneNumber: phoneNumber || "",
      websiteUrl: websiteUrl || "",
    },
  });

  const { isSubmitting } = form.formState;

  const { mutateAsync, isPending: isEditing } = useEditUserInfoMutation();

  const onSubmit = async (values: z.infer<typeof EditUserValidator>) => {
    try {
      let uploadedProfilePic;
      let uploadedCoverPic;

      console.log("profile:", profileFile, "cover:", coverFile);

      if (profileFile) {
        uploadedProfilePic = await handleUploadImage();
      }
      if (coverFile) {
        uploadedCoverPic = await handleUploadCoverImage();
      }

      const editedUser = await mutateAsync({
        userId,
        name: values.name,
        username: values.username,
        bio: values.bio,
        profilePic: uploadedProfilePic,
        coverPic: uploadedCoverPic,
        phoneNumber: values.phoneNumber,
        websiteUrl: values.websiteUrl,
      });

      if (!editedUser) {
        toast.error("Something went wrong. Please try again later.");
        return;
      }

      toast.success("User info updated successfully");

      setIsOpen(false);
      setContentHeight("0px");
      setProfileFile(null);
      setCoverFile(null);

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="w-full flex gap-x-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Input
                    placeholder="Name"
                    className="w-full font-semibold hover:border-neutral-300 focus:border-primary outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <Input
                    placeholder="Username"
                    className="w-full hover:border-neutral-300 font-semibold focus:border-primary outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="w-full">
                <Input
                  placeholder="website Url"
                  className="w-full hover:border-neutral-300 font-semibold focus:border-primary outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="w-full">
                <Input
                  placeholder="Your phone number"
                  className="w-full hover:border-neutral-300 font-semibold focus:border-primary outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="w-full">
                <Textarea
                  rows={6}
                  style={{ resize: "none" }}
                  placeholder="Bio (max 200 characters)"
                  className="w-full hover:border-neutral-300 font-semibold focus:border-primary outline-none focus-visible:ring-0 focus-visible:ring-offset-0 transition-all"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex gap-x-5">
          <FormField
            control={form.control}
            name="profilePic"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUploader
                    imageUrl={field.value}
                    setFile={setProfileFile}
                    name={name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <CoverFileUploader
                    imageUrl={field.value}
                    setFile={setCoverFile}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isEditing}
          className="w-full font-semibold">
          {isSubmitting || isEditing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UserDetailsEdit;
