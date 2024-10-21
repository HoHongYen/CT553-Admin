// eslint-disable
import createApiClient from "./api";

const baseUrl = "/api/accounts";
const api = createApiClient(baseUrl, { needAuth: true });

export async function getUsers({ customerSearch, active, role, gender, sortBy, page, limit }) {
    const users = (await api.get("", { params: { customerSearch, active, role, gender, sortBy, page, limit } })).data;
    return users;
}

export async function toggleActiveUser(userId) {
    return (await api.put("/toggleActive/" + userId)).data;
}

export async function createUser(data) {
    console.log(data);
    return (await api.post("/", data)).data;
}

export async function updateUser(userId, data) {
    return (await api.put("/" + userId, data)).data;
}
