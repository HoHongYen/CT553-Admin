import createApiClient from "./api";

const baseUrl = "/api/payments";
const api = createApiClient(baseUrl);

export async function getAllPaymentStatus() {
    return (await api.get("/statuses")).data;
}

export async function getAllPaymentMethods() {
    return (await api.get("/methods")).data;
}


