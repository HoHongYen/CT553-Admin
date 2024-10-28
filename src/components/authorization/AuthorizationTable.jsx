import { useEffect, useState } from "react";
import { useModules } from "@/hooks/modules/useModules";
import { usePermissions } from "@/hooks/permissions/usePermissions";
import { useAdminPermissions } from "@/hooks/permissions/useAdminPermissions";
import { useEmployeePermissions } from "@/hooks/permissions/useEmployeePermissions";
import { useClientPermissions } from "@/hooks/permissions/useClientPermissions";
import { useNotRegisterClientPermissions } from "@/hooks/permissions/useNotRegisterClientPermissions";
import { useAddPermissionToRole } from "@/hooks/permissions/useAddPermissionToRole";
import { Table } from "antd";
import Spinner from "@/components/ui/Spinner";
import GreenTick from "./GreenTick";
import RedX from "./RedX";

function AuthorizationTable() {
  const { isLoading: isLoading1, modules } = useModules();
  const { isLoading: isLoading2, permissions } = usePermissions();
  const { isLoading: isLoading3, permissions: adminPermissions } =
    useAdminPermissions();
  const { isLoading: isLoading4, permissions: employeePermissions } =
    useEmployeePermissions();
  const { isLoading: isLoading5, permissions: clientPermissions } =
    useClientPermissions();

  const { isLoading: isLoading6, permissions: notRegisterClientPermissions } =
    useNotRegisterClientPermissions();

  const { isLoading: isLoading7, addPermissionToRole } =
    useAddPermissionToRole();

  const [moduleData, setModuleData] = useState([]);
  const [permissionData, setPermissionData] = useState([]);

  useEffect(() => {
    const moduleArray = modules.map((module) => ({
      ...module,
      key: module.id.toString(),
    }));
    setModuleData(moduleArray);

    const permissionArray = permissions.map((permission) => ({
      ...permission,
      key: permission.id.toString(),
    }));
    setPermissionData(permissionArray);
  }, [modules, permissions]);

  const handleClick = (data, roleId) => {
    console.log("data.id", data.id, "roleId", roleId);
    addPermissionToRole({ roleId, permissionId: data.id });
  };

  const expandColumns = [
    {
      title: "Quyền hạn",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phương thức",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "API",
      dataIndex: "api",
      key: "api",
    },
    {
      title: "Admin",
      key: "state",
      render: (i) => (
        <div className="cursor-pointer" onClick={() => handleClick(i, 1)}>
          {adminPermissions.find((permissionId) => permissionId === i.id) ? (
            <GreenTick />
          ) : (
            <RedX />
          )}
        </div>
      ),
    },
    {
      title: "Nhân viên",
      key: "state",
      render: (i) => (
        <div className="cursor-pointer" onClick={() => handleClick(i, 2)}>
          {employeePermissions.find((permissionId) => permissionId === i.id) ? (
            <GreenTick />
          ) : (
            <RedX />
          )}
        </div>
      ),
    },
    {
      title: "Khách hàng đã đăng ký tài khoản",
      key: "state",
      render: (i) => (
        <div className="cursor-pointer" onClick={() => handleClick(i, 3)}>
          {clientPermissions.find((permissionId) => permissionId === i.id) ? (
            <GreenTick />
          ) : (
            <RedX />
          )}
        </div>
      ),
    },
    {
      title: "Khách vãng lai",
      key: "state",
      render: (i) => (
        <div className="cursor-pointer" onClick={() => handleClick(i, 4)}>
          {notRegisterClientPermissions.find(
            (permissionId) => permissionId === i.id
          ) ? (
            <GreenTick />
          ) : (
            <RedX />
          )}
        </div>
      ),
    },
  ];

  const columns = [
    {
      title: "Tên module",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
  ];

  const getPermissions = (moduleId) => {
    return permissionData.filter(
      (permission) => permission.moduleId === moduleId
    );
  };

  const expandedRowRender = (i) => (
    console.log("i", i),
    (
      <Table
        columns={expandColumns}
        dataSource={getPermissions(+i.key)}
        pagination={false}
      />
    )
  );

  if (isLoading1 || isLoading2) return <Spinner />;

  return (
    <Table
      pagination={false}
      columns={columns}
      expandable={{
        expandedRowRender,
        defaultExpandedRowKeys: ["0"],
      }}
      dataSource={moduleData}
    />
  );
}

export default AuthorizationTable;
