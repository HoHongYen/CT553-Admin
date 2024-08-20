import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UserTable from "../features/users/UserTable";
import AddCabin from "../features/users/AddCabin";
import CabinTableOperations from "../features/users/CabinTableOperations";

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
