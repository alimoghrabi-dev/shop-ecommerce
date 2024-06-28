import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useRef } from "react";
import UserDetailsEdit from "./UserDetailsEdit";

interface UserInfoEditProps {
  userId: string;
  name: string;
  username: string | null;
  bio: string | null;
  profilePic: string | null;
  coverImage: string | null;
  phoneNumber: string | null;
  websiteUrl: string | null;
}

const UserInfoEdit = ({
  userId,
  name,
  username,
  bio,
  profilePic,
  coverImage,
  phoneNumber,
  websiteUrl,
}: UserInfoEditProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>("0px");

  const toggleContent = () => {
    setIsOpen(!isOpen);
    setContentHeight(isOpen ? "0px" : `${contentRef.current?.scrollHeight}px`);
  };

  return (
    <div
      className={`w-full md:w-1/2 lg:w-1/3 bg-white border border-secondary rounded-lg transition-all flex flex-col items-center justify-center px-4 hover:bg-secondary/10 ${
        isOpen && "open"
      }`}>
      <div
        onClick={toggleContent}
        className="flex items-center w-full justify-between cursor-pointer py-4">
        <p className="text-lg font-medium text-gray-950">User Info</p>
        {isOpen ? (
          <ChevronUp className="text-primary" />
        ) : (
          <ChevronDown className="text-primary" />
        )}
      </div>

      <div
        ref={contentRef}
        style={{
          height: contentHeight,
          overflow: "hidden",
          transition: "height 0.3s ease-in-out",
        }}
        className="info-content w-full">
        <div className="w-full mt-4 pb-4">
          <UserDetailsEdit
            userId={userId}
            name={name}
            username={username}
            bio={bio}
            profilePic={profilePic}
            coverImage={coverImage}
            phoneNumber={phoneNumber}
            websiteUrl={websiteUrl}
            setIsOpen={setIsOpen}
            setContentHeight={setContentHeight}
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfoEdit;
