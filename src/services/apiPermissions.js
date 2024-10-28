import createApiClient from "./api";

const baseUrl = "/api/permissions";
const api = createApiClient(baseUrl, { needAuth: true });

export async function getPermissions() {
    const permissions = (await api.get("/")).data;
    // console.log("permissions", permissions);
    return permissions;
}

export async function getPermissionsByRole(roleId) {
    const permissions = (await api.get(`/${roleId}`)).data;
    // console.log("getPermissionsByRole", "roleId", roleId, "permissions", permissions);
    return permissions;
}

export async function addPermissionToRole({ roleId, permissionId }) {
    console.log("roleId", roleId, "permissionId", permissionId);
    const permissions = (await api.post(`/${roleId}`, { permissionId })).data;
    return permissions;
}







