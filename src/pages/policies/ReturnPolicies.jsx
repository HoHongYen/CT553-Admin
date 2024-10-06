import { useNavigate } from "react-router-dom";
import ReturnPolicyTable from "@/components/policies/returnPolicies/ReturnPolicyTable";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";

function ReturnPolicies() {
  const navigate = useNavigate();
  return (
    <>
      <Row>
        <Heading as="h1">Chính sách đổi trả</Heading>
      </Row>
      <Row>
        <ReturnPolicyTable />
        <div className="w-[200px]">
          <Button
            type="primary"
            onClick={() => navigate("/chinh-sach-doi-tra/tao-moi")}
          >
            <span className="mr-2">+</span>
            Thêm chính sách
          </Button>
        </div>
      </Row>
    </>
  );
}

export default ReturnPolicies;
