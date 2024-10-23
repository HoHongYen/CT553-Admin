import { useEffect, useState } from "react";
// import { useCategoriesForTable } from "@/hooks/categories/useCategoriesForTable";
import { useCategories } from "@/hooks/categories/useCategories";
import TableOperations from "@/components/ui/TableOperations";
import SortBy from "@/components/ui/SortBy";
import SearchBarCustomer from "@/components/ui/SearchBar";
import FilterSelect from "../ui/FilterSelect";

function ProductFilterOperations() {
  const { categories } = useCategories();
  const [categoryOptions, setCategoryOptions] = useState([
    { value: "tat-ca", label: "Tất cả" },
  ]);

  useEffect(() => {
    // get all categories
    let allCategories = [...categories];
    // get all subcategories
    categories.forEach((category) => {
      allCategories = [...allCategories, ...category.children];
    });

    if (allCategories?.length > 0) {
      setCategoryOptions([
        { value: "tat-ca", label: "Tất cả" },
        ...allCategories.map((category) => {
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

          <FilterSelect
            filterField="giam-gia"
            options={[
              { value: "tat-ca", label: "Tất cả" },
              { value: "dang-giam-gia", label: "Đang giảm giá" },
              { value: "khong-giam-gia", label: "Không giảm giá" },
            ]}
            label="Giảm giá"
          />

          <FilterSelect
            filterField="trang-thai"
            options={[
              { value: "tat-ca", label: "Tất cả" },
              { value: "hien-thi", label: "Hiển thị" },
              { value: "da-an", label: "Đã ẩn" },
            ]}
            label="Trạng thái"
          />

          <FilterSelect
            filterField="loc-danh-muc"
            options={categoryOptions}
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
