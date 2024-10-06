import { useNavigate } from "react-router-dom";
import WarrantyPolicyTable from "@/components/policies/warrantyPolicies/WarrantyPolicyTable";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";

function WarrantyPolicies() {
  const navigate = useNavigate();
  return (
    <>
      <Row>
        <Heading as="h1">Chính sách bảo hành</Heading>
      </Row>
      <Row>
        <WarrantyPolicyTable />
        <div className="w-[200px]">
          <Button
            type="primary"
            onClick={() => navigate("/chinh-sach-bao-hanh/tao-moi")}
          >
            <span className="mr-2">+</span>
            Thêm chính sách
          </Button>
        </div>
      </Row>
    </>
  );
}

export default WarrantyPolicies;
