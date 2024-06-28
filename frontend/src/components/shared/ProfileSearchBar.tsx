import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type ProfileSearchBarProps = {
  name: string;
};

const ProfileSearchBar = ({ name }: ProfileSearchBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();

  const query = searchParams.get("search");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFN = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search,
        });

        navigate(newUrl);
      } else {
        if (location.pathname.includes("/profile") && query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["search"],
          });

          navigate(newUrl);
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFN);
  }, [location, navigate, query, search, searchParams]);

  return (
    <div className="relative w-full lg:w-auto">
      <Search
        size={19}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-neutral-600"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search ${name}...`}
        className="w-2/3 lg:w-auto px-4 pl-11 py-1.5 bg-neutral-200/50 placeholder:text-neutral-500 focus:bg-neutral-200/25 text-sm font-medium placeholder:text-sm placeholder:font-medium rounded-md outline-none transition-all"
      />
    </div>
  );
};

export default ProfileSearchBar;
