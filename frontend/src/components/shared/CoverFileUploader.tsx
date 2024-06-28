import { CircleOff } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

type CoverFileUploaderProps = {
  imageUrl: string | undefined;
  setFile: Dispatch<SetStateAction<File | null>>;
};

const CoverFileUploader = ({ imageUrl, setFile }: CoverFileUploaderProps) => {
  const [fileAction, setFileAction] = useState<string | undefined>(undefined);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setFileAction(URL.createObjectURL(file!));

    if (file) {
      setFile(file);
    }
  };

  const handleOpenFileInput = () => {
    document.getElementById("coverfileInput")?.click();
  };

  return (
    <>
      <input
        type="file"
        id="coverfileInput"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      {imageUrl ? (
        <img
          onClick={handleOpenFileInput}
          src={fileAction ? fileAction : imageUrl}
          alt="cover-pic"
          className="w-32 h-14 object-cover object-center rounded-lg cursor-pointer hover:opacity-80 transition-all"
        />
      ) : (
        <div
          onClick={handleOpenFileInput}
          className="w-32 h-14 bg-white border border-secondary rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-all">
          <CircleOff size={20} className="text-gray-950" />
        </div>
      )}
    </>
  );
};

export default CoverFileUploader;
