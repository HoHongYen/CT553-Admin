import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import AuthorizationTable from "@/components/authorization/AuthorizationTable";

function Authorization() {
  return (
    <>
      <Row>
        <Heading as="h1">Phân quyền</Heading>
      </Row>
      <Row>
        <AuthorizationTable />
      </Row>
    </>
  );
}

export default Authorization;
