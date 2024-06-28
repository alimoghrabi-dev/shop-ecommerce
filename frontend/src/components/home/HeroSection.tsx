import {
  rowOneImage1,
  rowOneImage2,
  rowOneImage3,
  rowOneImage4,
  rowOneImage5,
  rowOneImage6,
  rowOneImage7,
  rowOneImage8,
  rowTwoImage1,
  rowTwoImage2,
  rowTwoImage3,
  rowTwoImage4,
  rowTwoImage5,
  rowTwoImage6,
  rowTwoImage7,
  rowTwoImage8,
  rowThreeImage1,
  rowThreeImage2,
  rowThreeImage3,
  rowThreeImage4,
  rowThreeImage5,
  rowThreeImage6,
  rowThreeImage7,
  rowThreeImage8,
} from "@/assets/hero";
import { cn } from "@/lib/utils";

const rowOne = [
  rowOneImage4,
  rowOneImage5,
  rowOneImage6,
  rowOneImage7,
  rowOneImage1,
  rowOneImage2,
  rowOneImage3,
  rowOneImage8,
];

const rowTwo = [
  rowTwoImage1,
  rowTwoImage2,
  rowTwoImage3,
  rowTwoImage4,
  rowTwoImage5,
  rowTwoImage6,
  rowTwoImage7,
  rowTwoImage8,
];
const rowThree = [
  rowThreeImage1,
  rowThreeImage2,
  rowThreeImage3,
  rowThreeImage4,
  rowThreeImage5,
  rowThreeImage6,
  rowThreeImage7,
  rowThreeImage8,
];

const HeroSection = () => {
  return (
    <div className="w-[100vw] flex flex-col gap-y-3 px-3 overflow-hidden">
      <div className="w-full flex items-center gap-x-2.5">
        {rowOne.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`image-${index}`}
            className={cn(
              "rounded-lg w-full h-40 object-cover object-center",
              rowOne.length === index + 1 && "lg:block hidden",
              rowOne.length === index + 2 && "lg:block hidden",
              rowOne.length === index + 3 && "md:block hidden",
              rowOne.length === index + 4 && "sm:block hidden",
              rowOne.length === index + 5 && "sm:block hidden"
            )}
          />
        ))}
      </div>
      <div className="w-full flex items-center gap-x-2.5">
        {rowTwo.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`image-${index}`}
            className={cn(
              "rounded-lg w-full h-40 object-cover object-center",
              rowTwo.length === index + 1 && "lg:block hidden",
              rowTwo.length === index + 2 && "lg:block hidden",
              rowTwo.length === index + 3 && "md:block hidden",
              rowTwo.length === index + 4 && "sm:block hidden",
              rowTwo.length === index + 5 && "sm:block hidden"
            )}
          />
        ))}
      </div>
      <div className="w-full flex items-center gap-x-2.5">
        {rowThree.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`image-${index}`}
            className={cn(
              "rounded-lg w-full h-40 object-cover object-center",
              rowThree.length === index + 1 && "lg:block hidden",
              rowThree.length === index + 2 && "lg:block hidden",
              rowThree.length === index + 3 && "md:block hidden",
              rowThree.length === index + 4 && "sm:block hidden",
              rowThree.length === index + 5 && "sm:block hidden"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
