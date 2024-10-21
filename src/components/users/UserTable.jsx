import * as XLSX from "xlsx";
import { useUsers } from "@/hooks/users/useUsers";

import { HiOutlineDownload } from "react-icons/hi";
import Spinner from "@/components/ui/Spinner";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import UserRow from "./UserRow";
import Pagination from "../ui/Pagination";
import Button from "../ui/Button";
import AddUser from "./AddUser";

function UserTable() {
  const { isLoading, users, totalUsers, totalPages } = useUsers();

  const handleDownloadExcel = () => {
    const rows = users.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      gender: user.gender ? "Nam" : "Nữ",
      role:
        user.roleId === 1
          ? "Admin"
          : user.roleId === 2
          ? "Nhân viên"
          : "Khách hàng",
      active: user.active ? "Đang kích hoạt" : "Đã khóa",
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    const colWidths = [
      { wch: 15 },
      { wch: 25 },
      { wch: 40 },
      { wch: 20 },
      { wch: 10 },
      { wch: 15 },
      { wch: 20 },
    ];

    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Tài khoản người dùng");

    // add header row

    XLSX.utils.sheet_add_aoa(worksheet, [["Danh sách tài khoản người dùng"]], {
      origin: "A1",
    });

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: colWidths.length - 1 } },
    ];

    // customize header names
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "Mã người dùng",
          "Họ tên",
          "Email",
          "Số điện thoại",
          "Giới tính",
          "Vai trò",
          "Trạng thái",
        ],
      ],
      { origin: "A2" }
    );

    XLSX.writeFile(workbook, "UserReport.xlsx", { compression: false });
  };

  if (isLoading) return <Spinner />;
  if (!users.length) return <p>Không có người dùng nào!</p>;

  return (
    <Menus>
      <Table columns="0.7fr 0.7fr 1.5fr 3fr 1fr 1fr 1.5fr 2fr 1fr 0.5fr">
        <Table.Header>
          <div></div>
          <div>Mã người dùng</div>
          <div>Họ tên</div>
          <div>Email</div>
          <div>Số điện thoại</div>
          <div>Giới tính</div>
          <div>Vai trò</div>
          <div>Trạng thái</div>
          <div>Ngày tạo</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => <UserRow key={user.id} user={user} />}
        />
        <Table.Footer>
          <Pagination
            count={totalUsers}
            totalPages={totalPages}
            label="người dùng"
          />
        </Table.Footer>
      </Table>
      <div className="mt-5 flex gap-5 justify-end">
        <AddUser />
        <Button
          variation="success"
          className="flex items-center gap-2"
          onClick={handleDownloadExcel}
        >
          <HiOutlineDownload size={14} />
          Tải file excel
        </Button>
      </div>
    </Menus>
  );
}

export default UserTable;
