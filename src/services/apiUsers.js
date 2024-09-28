// eslint-disable
import createApiClient from "./api";

const baseUrl = "/api/accounts";
const api = createApiClient(baseUrl);

export async function getUsers({ customerSearch, active, role, gender, sortBy, page, limit }) {
    const users = (await api.get("", { params: { customerSearch, active, role, gender, sortBy, page, limit } })).data;
    return users;
}

