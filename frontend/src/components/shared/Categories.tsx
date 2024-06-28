import { useSearchParams } from "react-router-dom";
import ComboboxDemo from "../ui/combobox";
import { cn } from "@/lib/utils";

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const resetSearchParmas = () => {
    setSearchParams({ category: "", onSale: "" });
  };

  const setOnSale = () => {
    if (searchParams.get("onSale") === "true") {
      setSearchParams({ onSale: "", category: "" });
    } else {
      setSearchParams({ onSale: "true" });
    }
  };

  return (
    <>
      <button
        onClick={resetSearchParmas}
        className={cn(
          "border border-gray-950/25 rounded-md px-3 py-1 text-[13px] font-semibold transition-all",
          !searchParams.get("category") && !searchParams.get("onSale")
            ? "bg-gray-950 text-white"
            : "text-gray-950 hover:bg-secondary/40"
        )}>
        All
      </button>
      <button
        onClick={setOnSale}
        className={cn(
          "border border-gray-950/25 rounded-md px-3 py-1 text-[13px] font-semibold transition-all",
          searchParams.get("onSale") === "true"
            ? "bg-gray-950 text-white"
            : "text-gray-950 hover:bg-secondary/40"
        )}>
        On sale
      </button>
      <ComboboxDemo />
    </>
  );
};

export default Categories;
