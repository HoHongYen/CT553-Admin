import TableOperations from "@/components/ui/TableOperations";
import SortBy from "@/components/ui/SortBy";
import FilterSelect from "../ui/FilterSelect";
import SearchBarCustomer from "../ui/SearchBar";

function ReviewFilterOperations() {
  return (
    <TableOperations>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <SearchBarCustomer
            placeholder="Nhập mã hoặc tên khách hàng..."
            style={{
              width: 300,
              height: 40,
            }}
            label="Tìm kiếm theo mã hoặc tên khách hàng"
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
            filterField="phan-hoi"
            options={[
              { value: "tat-ca", label: "Tất cả" },
              { value: "chua-phan-hoi", label: "Chưa phản hồi" },
              { value: "da-phan-hoi", label: "Đã phản hồi" },
            ]}
            label="Phản hồi"
          />
          <SortBy
            options={[
              { value: "moi-nhat", label: "Mới nhất" },
              { value: "cu-nhat", label: "Cũ nhất" },
              {
                value: "rating-tang-dan",
                label: "Rating tăng dần",
              },
              {
                value: "rating-giam-dan",
                label: "Rating giảm dần",
              },
            ]}
          />
        </div>
      </div>
    </TableOperations>
  );
}

export default ReviewFilterOperations;
