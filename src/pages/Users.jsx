import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import UserTable from "@/components/users/UserTable";
import UserFilterOperations from "@/components/users/UserFilterOperations";

function Users() {
  return (
    <>
      <Row>
        <Heading as="h1">Tài khoản người dùng</Heading>
        <div className="flex justify-end">
          <UserFilterOperations />
        </div>
      </Row>
      <Row>
        <UserTable />
      </Row>
    </>
  );
}

export default Users;
