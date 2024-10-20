import { useEffect, useState } from "react";
import { useCategoriesForTable } from "@/hooks/categories/useCategoriesForTable";
import TableOperations from "@/components/ui/TableOperations";
import Filter from "@/components/ui/Filter";
import SortBy from "@/components/ui/SortBy";
import SearchBarCustomer from "@/components/ui/SearchBar";
import FilterSelect from "../ui/FilterSelect";

function ProductFilterOperations() {
  const { categories } = useCategoriesForTable();
  const [options, setOptions] = useState([{ value: "tat-ca", label: "Tất cả" }]);
  useEffect(() => {
    if (categories?.length > 0) {
      setOptions([
        { value: "tat-ca", label: "Tất cả" },
        ...categories.map((category) => {
          return {
            value: category.id,
            label: category.name,
          };
        }),
      ]);
    }
  }, [categories]);

  return (
    <TableOperations>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <SearchBarCustomer
            field="san-pham"
            placeholder="Nhập mã hoặc tên sản phẩm..."
            style={{
              width: 300,
              height: 40,
            }}
            label="Tìm kiếm theo mã hoặc tên sản phẩm"
          />

          <Filter
            filterField="trang-thai"
            options={[
              { value: "tat-ca", label: "Tất cả" },
              { value: "dang-giam-gia", label: "Đang giảm giá" },
              // { value: "khong-giam-gia", label: "Không giảm giá" },
            ]}
          />

          <FilterSelect
            filterField="loc-danh-muc"
            options={options}
            label="Danh mục"
          />

          <SortBy
            options={[
              { value: "moi-nhat", label: "Hàng mới nhất" },
              { value: "cu-nhat", label: "Hàng cũ nhất" },
              { value: "ten-tang-dan", label: "Xếp theo tên (A-Z)" },
              { value: "ten-giam-dan", label: "Xếp theo tên (Z-A)" },
              {
                value: "rating-tang-dan",
                label: "Xếp theo rating tăng dần",
              },
              {
                value: "rating-giam-dan",
                label: "Xếp theo rating giảm dần",
              },
              {
                value: "gia-tang-dan",
                label: "Xếp theo giá tăng dần",
              },
              {
                value: "gia-giam-dan",
                label: "Xếp theo giá giảm dần",
              },
            ]}
          />
        </div>
      </div>
    </TableOperations>
  );
}

export default ProductFilterOperations;
