import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import UserTable from "@/components/users/UserTable";
import AddCabin from "@/components/users/AddCabin";
import CabinTableOperations from "@/components/users/CabinTableOperations";

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Tài khoản người dùng</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <UserTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Users;
