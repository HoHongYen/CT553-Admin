import { useNavigate } from "react-router-dom";
import DeliveryPolicyTable from "@/components/policies/deliveryPolicies/DeliveryPolicyTable";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";

function DeliveryPolicies() {
  const navigate = useNavigate();
  return (
    <>
      <Row>
        <Heading as="h1">Chính sách giao hàng</Heading>
      </Row>
      <Row>
        <DeliveryPolicyTable />
        <div className="w-[200px]">
          <Button
            type="primary"
            onClick={() => navigate("/chinh-sach-giao-hang/tao-moi")}
          >
            <span className="mr-2">+</span>
            Thêm chính sách
          </Button>
        </div>
      </Row>
    </>
  );
}

export default DeliveryPolicies;
