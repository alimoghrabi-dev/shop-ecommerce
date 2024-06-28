import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import FetchNavSearchResults from "./FetchNavSearchResults";

interface NavSearchBarProps {
  isFocused: boolean;
  setIsFocused: (value: boolean) => void;
  textMapped: string[];
  textIndex: number;
}

const NavSearchBar = ({
  isFocused,
  setIsFocused,
  textMapped,
  textIndex,
}: NavSearchBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();

  const query = searchParams.get("nav-query");

  const [search, setSearch] = useState(query || "");

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFN = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "nav-query",
          value: search,
        });

        navigate(newUrl);
      } else {
        if (location.pathname === "/" && query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["nav-query"],
          });

          navigate(newUrl);
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFN);
  }, [location, navigate, query, search, searchParams]);

  return (
    <div
      ref={ref}
      className={cn(
        "w-[40%] relative bg-black hidden md:flex flex-col bg-secondary/50 border border-secondary/50 items-center gap-y-2 transition-all",
        isFocused && "bg-white border border-secondary",
        isFocused ? "rounded-t-xl" : "rounded-xl"
      )}
    >
      <div className="w-full flex items-center gap-x-2 px-4">
        <Search size={20} className="text-neutral-500" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder={textMapped[textIndex]}
          onFocus={() => setIsFocused(true)}
          className="bg-transparent placeholder:text-neutral-500 placeholder:font-semibold font-semibold rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      {isFocused ? (
        search ? (
          <div className="w-full ring-[1px] ring-secondary rounded-b-xl shadow-lg bg-white absolute top-[100%] p-4">
            <FetchNavSearchResults search={search} />
          </div>
        ) : (
          <div className="w-full ring-[1px] ring-secondary rounded-b-xl shadow-lg bg-white absolute top-[100%] p-4">
            <p className="text-sm font-semibold text-gray-950">Categories</p>
          </div>
        )
      ) : null}
    </div>
  );
};

export default NavSearchBar;
