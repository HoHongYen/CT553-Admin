import { useUsers } from "@/hooks/users/useUsers";

import Spinner from "@/components/ui/Spinner";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import UserRow from "./UserRow";

function UserTable() {
  const { isLoading, users } = useUsers();

  if (isLoading) return <Spinner />;
  if (!users.length) return <p>Không có người dùng nào!</p>;

  return (
    <Menus>
      <Table columns="0.7fr 0.7fr 1.5fr 3fr 1fr 1fr 1fr 1fr 1fr 0.5fr">
        <Table.Header>
          <div></div>
          <div>Mã người dùng</div>
          <div>Họ tên</div>
          <div>Email</div>
          <div>Số điện thoại</div>
          <div>Giới tính</div>
          <div>Chức vụ</div>
          <div>Trạng thái</div>
          <div>Ngày tạo</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={users}
          render={(user) => <UserRow key={user.id} user={user} />}
        />
      </Table>
    </Menus>
  );
}

export default UserTable;
