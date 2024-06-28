import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import FetchSearchResults from "./FetchSearchResults";

interface HomeSearchBarProps {
  textIndex: number;
  textMapped: string[];
}

const HomeSearchBar = ({ textIndex, textMapped }: HomeSearchBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFN = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: search,
        });

        navigate(newUrl);
      } else {
        if (location.pathname === "/" && query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["query"],
          });

          navigate(newUrl);
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFN);
  }, [location, navigate, query, search, searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setSearch("");
        navigate("/");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  return (
    <div
      ref={searchBarRef}
      className="relative w-[320px] md:w-[450px] rounded-xl px-4 py-2 flex flex-col gap-y-5 bg-white ring-[8px] ring-neutral-800/50"
    >
      <div className="flex items-center gap-x-4">
        <Search size={20} className="text-neutral-600 cursor-pointer" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
          type="text"
          placeholder={textMapped[textIndex]}
          className="w-full outline-none placeholder:text-neutral-400 placeholder:font-semibold font-semibold"
        />
      </div>

      {isSearchOpen && search && <FetchSearchResults search={search} />}
    </div>
  );
};

export default HomeSearchBar;
