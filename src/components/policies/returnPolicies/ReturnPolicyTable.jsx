import { useReturnPolicies } from "@/hooks/policies/returnPolicies/useReturnPolicies";
import Spinner from "@/components/ui/Spinner";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import ReturnPolicyRow from "./ReturnPolicyRow";

function ReturnPolicyTable() {
  const { isLoading, policies } = useReturnPolicies();

  if (isLoading) return <Spinner />;
  if (!policies.length) return <p>Không có chính sách nào!</p>;

  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 1fr 2fr">
        <Table.Header>
          <div className="flex justify-center">Mã chính sách</div>
          <div className="flex justify-center">Trạng thái</div>
          <div className="flex justify-center">Ngày tạo</div>
          <div className="flex justify-center">Ngày cập nhật</div>
          <div className="flex justify-center">Hành động</div>
        </Table.Header>
        <Table.Body
          data={policies}
          render={(policy) => (
            <ReturnPolicyRow key={policy.id} policy={policy} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default ReturnPolicyTable;
