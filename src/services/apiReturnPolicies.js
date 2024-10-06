import createApiClient from "./api";

const baseUrl = "/api/returnPolicies";
const api = createApiClient(baseUrl);

export async function createPolicy(data) {
    console.log(data);
    return (await api.post("", data)).data;
}

export async function getAllPolicies() {
    const categories = (await api.get("/")).data;
    return categories;
}

export async function getCurrentPolicy() {
    const categories = (await api.get("/current")).data;
    return categories;
}

export async function getPolicyById(policyId) {
    return (await api.get("/" + policyId)).data;
}

export async function updatePolicy(policyId, data) {
    return (await api.put("/" + policyId, data)).data;
}

// toggle visibility
export async function toggleVisibility(policyId) {
    return (await api.put("/toggleHide/" + policyId)).data;
}




