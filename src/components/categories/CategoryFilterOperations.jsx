import TableOperations from "@/components/ui/TableOperations";
import SortBy from "@/components/ui/SortBy";
import FilterSelect from "../ui/FilterSelect";
import SearchBarCustomer from "../ui/SearchBar";

function CategoryFilterOperations() {
  return (
    <TableOperations>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <SearchBarCustomer
            field="danh-muc"
            placeholder="Nhập mã hoặc tên danh mục..."
            style={{
              width: 300,
              height: 40,
            }}
            label="Tìm kiếm theo mã hoặc tên danh mục"
          />

          <FilterSelect
            filterField="loai"
            options={[
              { value: "tat-ca", label: "Tất cả" },
              { value: "danh-muc-cha", label: "Danh mục cha" },
              { value: "danh-muc-con", label: "Danh mục con" },
            ]}
            label="Loại danh mục"
          />

          <SortBy
            options={[
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

export default CategoryFilterOperations;
