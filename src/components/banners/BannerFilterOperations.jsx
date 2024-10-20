import { useEffect, useState } from "react";
import { useBannerCategories } from "@/hooks/bannerCategories/useBannerCategories";
import TableOperations from "@/components/ui/TableOperations";
import SortBy from "@/components/ui/SortBy";
import FilterSelect from "../ui/FilterSelect";
import SearchBarCustomer from "../ui/SearchBar";

function BannerFilterOperations() {
  const { bannerCategories } = useBannerCategories();
  const [options, setOptions] = useState([{ value: "tat-ca", label: "Tất cả" }]);
  useEffect(() => {
    if (bannerCategories?.length > 0) {
      setOptions([
        { value: "tat-ca", label: "Tất cả" },
        ...bannerCategories.map((bannerCategory) => {
          return {
            value: bannerCategory.id,
            label: bannerCategory.name,
          };
        }),
      ]);
    }
  }, [bannerCategories]);

  console.log("options", options);

  return (
    <TableOperations>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <SearchBarCustomer
            field="banner"
            placeholder="Nhập mã hoặc tên banner..."
            style={{
              width: 300,
              height: 40,
            }}
            label="Tìm kiếm theo mã hoặc tên banner"
          />

          <FilterSelect
            filterField="loai"
            options={options}
            label="Loại danh mục"
          />

          <SortBy
            options={[
              { value: "thu-tu-tang-dan", label: "Thứ tự tăng dần" },
              { value: "thu-tu-giam-dan", label: "Thứ tự giảm dần" },
              { value: "moi-nhat", label: "Tạo gần đây nhất" },
              { value: "cu-nhat", label: "Tạo cách đây lâu nhất" },
              { value: "ten-tang-dan", label: "Tên tăng dần (A-Z)" },
              { value: "ten-giam-dan", label: "Tạo giảm dần (Z-A)" },
            ]}
          />
        </div>
      </div>
    </TableOperations>
  );
}

export default BannerFilterOperations;
