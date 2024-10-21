import TableOperations from "@/components/ui/TableOperations";
import SortBy from "@/components/ui/SortBy";
import FilterSelect from "../ui/FilterSelect";
import SearchBarCustomer from "../ui/SearchBar";

function UserFilterOperations() {
  return (
    <TableOperations>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <SearchBarCustomer
            placeholder="Nhập mã hoặc tên người dùng..."
            style={{
              width: 300,
              height: 40,
            }}
            label="Tìm kiếm theo mã hoặc tên người dùng"
          />

          <FilterSelect
            filterField="gioi-tinh"
            options={[
              { value: "tat-ca", label: "Tất cả" },
              { value: "nam", label: "Nam" },
              { value: "nu", label: "Nữ" },
            ]}
            label="Giới tính"
          />

          <FilterSelect
            filterField="vai-tro"
            options={[
              { value: "tat-ca", label: "Tất cả" },
              { value: "admin", label: "Admin" },
              { value: "nhan-vien", label: "Nhân viên" },
              { value: "khach-hang", label: "Khách hàng" },
            ]}
            label="Vai trò"
          />

          <FilterSelect
            filterField="trang-thai"
            options={[
              { value: "tat-ca", label: "Tất cả" },
              { value: "dang-kich-hoat", label: "Đang kích hoạt" },
              { value: "da-khoa", label: "Đã khóa" },
            ]}
            label="Trạng thái"
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

export default UserFilterOperations;
