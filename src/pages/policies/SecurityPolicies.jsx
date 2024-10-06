import { useNavigate } from "react-router-dom";
import SecurityPolicyTable from "@/components/policies/securityPolicies/SecurityPolicyTable";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";

function SecurityPolicies() {
  const navigate = useNavigate();
  return (
    <>
      <Row>
        <Heading as="h1">Chính sách bảo mật</Heading>
      </Row>
      <Row>
        <SecurityPolicyTable />
        <div className="w-[200px]">
          <Button
            type="primary"
            onClick={() => navigate("/chinh-sach-bao-mat/tao-moi")}
          >
            <span className="mr-2">+</span>
            Thêm chính sách
          </Button>
        </div>
      </Row>
    </>
  );
}

export default SecurityPolicies;
