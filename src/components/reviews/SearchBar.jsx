import Input from "@/components/ui/Input";
import { getOrderById } from "@/services/apiOrders";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchBar({ placeholder, style }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState();

  const handleSearching = async () => {
    searchParams.delete("trang");
    searchParams.delete("gioi-han");
    searchParams.delete("thu-tu");
    searchParams.delete("trang-thai-don-hang");
    searchParams.delete("phuong-thuc-thanh-toan");
    searchParams.delete("trang-thai-thanh-toan");

    const order = (await getOrderById(value)).metadata;
    if (!order) {
      toast.error("Đơn hàng không tồn tại");
      setValue("");
      return;
    }

    navigate(`/don-hang/${value}`);
  };

  return (
    <Input
      type="number"
      value={value}
      placeholder={placeholder}
      style={style}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSearching(e.target.value);
      }}
    />
  );
}

export default SearchBar;
