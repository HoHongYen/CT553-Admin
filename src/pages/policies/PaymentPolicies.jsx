import { useNavigate } from "react-router-dom";
import PaymentPolicyTable from "@/components/policies/paymentPolicies/PaymentPolicyTable";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";

function PaymentPolicies() {
  const navigate = useNavigate();
  return (
    <>
      <Row>
        <Heading as="h1">Chính sách thanh toán</Heading>
      </Row>
      <Row>
        <PaymentPolicyTable />
        <div className="w-[200px]">
          <Button
            type="primary"
            onClick={() => navigate("/chinh-sach-thanh-toan/tao-moi")}
          >
            <span className="mr-2">+</span>
            Thêm chính sách
          </Button>
        </div>
      </Row>
    </>
  );
}

export default PaymentPolicies;
