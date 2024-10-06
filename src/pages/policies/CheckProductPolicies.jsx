import { useNavigate } from "react-router-dom";
import CheckProductPolicyTable from "@/components/policies/checkProductPolicies/CheckProductPolicyTable";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";

function CheckProductPolicies() {
  const navigate = useNavigate();
  return (
    <>
      <Row>
        <Heading as="h1">Chính sách kiểm hàng</Heading>
      </Row>
      <Row>
        <CheckProductPolicyTable />
        <div className="w-[200px]">
          <Button
            type="primary"
            onClick={() => navigate("/chinh-sach-kiem-hang/tao-moi")}
          >
            <span className="mr-2">+</span>
            Thêm chính sách
          </Button>
        </div>
      </Row>
    </>
  );
}

export default CheckProductPolicies;
