import { useSecurityPolicies } from "@/hooks/policies/securityPolicies/useSecurityPolicies";
import Spinner from "@/components/ui/Spinner";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import SecurityPolicyRow from "./SecurityPolicyRow";

function SecurityPolicyTable() {
  const { isLoading, policies } = useSecurityPolicies();

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
            <SecurityPolicyRow key={policy.id} policy={policy} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default SecurityPolicyTable;
