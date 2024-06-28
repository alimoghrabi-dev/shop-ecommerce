import { getInitials } from "@/lib/utils";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type FileUploaderProps = {
  imageUrl: string | undefined;
  setFile: Dispatch<SetStateAction<File | null>>;
  name: string;
};

const FileUploader = ({ imageUrl, setFile, name }: FileUploaderProps) => {
  const [fileAction, setFileAction] = useState<string | undefined>(undefined);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setFileAction(URL.createObjectURL(file!));

    if (file) {
      setFile(file);
    }
  };

  const handleOpenFileInput = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {imageUrl ? (
        <img
          onClick={handleOpenFileInput}
          src={fileAction ? fileAction : imageUrl}
          alt="profile-pic"
          className="size-14 rounded-full object-cover object-center cursor-pointer hover:opacity-80 transition-all"
        />
      ) : (
        <div
          onClick={handleOpenFileInput}
          className="bg-primary flex items-center justify-center rounded-full size-14 text-white font-semibold text-lg cursor-pointer hover:opacity-80 transition-all">
          {getInitials(name)}
        </div>
      )}
    </>
  );
};

export default FileUploader;
