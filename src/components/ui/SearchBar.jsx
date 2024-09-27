import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HiXMark } from "react-icons/hi2";
import Input from "@/components/ui/Input";

function SearchBar({ placeholder, style, label = null }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState();

  const handleSearching = async () => {
    if (value) {
      console.log("search customer value", value);
      searchParams.delete("trang");
      searchParams.set("khach-hang", value);
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    if (!value) {
      searchParams.delete("khach-hang");
      setSearchParams(searchParams);
    }
  }, [value]);

  return (
    <div className="relative">
      <Input
        type="text"
        value={value}
        placeholder={placeholder}
        style={style}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearching(e.target.value);
        }}
      />
      {value && (
        <HiXMark
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setValue("")}
        />
      )}
      {value && (
        <label className="text-[1.1rem] z-2 text-[var(--color-grey-400)] pointer-events-none absolute left-3 inset-y-0 h-fit flex items-center select-none transition-all peer-focus:text-sm peer-placeholder-shown:text-lg px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-[var(--color-grey-0)] peer-focus:bg-[var(--color-grey-0)] peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
          {label}
        </label>
      )}
    </div>
  );
}

export default SearchBar;
