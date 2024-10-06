import { useNavigate } from "react-router-dom";
import { formatDateTime } from "@/utils/helpers";
import { HiEye, HiPencil } from "react-icons/hi2";
import { useHideCheckProductPolicy } from "@/hooks/policies/checkProductPolicies/useHideCheckProductPolicy";
import Table from "@/components/ui/Table";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import SpinnerMini from "@/components/ui/SpinnerMini";

function CheckProductPolicyRow({ policy }) {
  const navigate = useNavigate();
  const { id: policyId, content, visible, createdAt, updatedAt } = policy;
  const { isLoading, toggleVisibility } = useHideCheckProductPolicy();

  return (
    <>
      <Table.Row>
        <div className="flex justify-center">#{policyId}</div>
        <div className="flex justify-center">
          <Tag type={visible ? "green" : "red"}>
            {visible ? "Hiển thị" : "Đã ẩn"}
          </Tag>
        </div>

        <div className="flex justify-center">{formatDateTime(createdAt)}</div>
        <div className="flex justify-center">{formatDateTime(updatedAt)}</div>
        <div className="flex justify-center gap-5">
          <Button
            variation="secondary"
            disabled={isLoading}
            className="flex items-center gap-3"
            onClick={() => navigate(`/chinh-sach-kiem-hang/${policyId}`)}
          >
            <HiEye />
            Chi tiết
          </Button>
          <Button
            variation="secondary"
            disabled={isLoading}
            className="flex items-center gap-3"
            onClick={() => toggleVisibility(policyId)}
          >
            <HiPencil />
            {!isLoading ? (
              <>{visible ? "Ẩn" : "Hiển thị"} chính sách</>
            ) : (
              <SpinnerMini />
            )}
          </Button>
        </div>
      </Table.Row>
    </>
  );
}

export default CheckProductPolicyRow;
