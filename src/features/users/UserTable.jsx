import Spinner from "../../ui/Spinner";
import UserRow from "./UserRow";
import { useUsers } from "./useUsers";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function UserTable() {
  const { isLoading, users } = useUsers();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!users.length) return <Empty resourceName="users" />;

  // 1. Filter
  // const filterValue = searchParams.get("discount") || "all";
  // let filteredCabins;
  // if (filterValue === "all") filteredCabins = cabins;
  // if (filterValue === "no-discount")
  //   filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  // if (filterValue === "with-discount")
  //   filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2. Sort
  // const sortBy = searchParams.get("sortBy") || "create_at-asc";
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedCabins = filteredCabins.sort(
  //   (a, b) => (a[field] - b[field]) * modifier
  // );

  return (
    <Menus>
      <Table columns="0.5fr 1fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Mã</div>
          <div>Họ tên</div>
          <div>Email</div>
          <div>Số điện thoại</div>
          <div>Giới tính</div>
          <div>Chức vụ</div>
          <div>Ngày tạo</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // data={sortedCabins}
          data={users}
          render={(user) => <UserRow key={user.id} user={user} />}
        />
      </Table>
    </Menus>
  );
}

export default UserTable;
