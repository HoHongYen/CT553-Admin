import createApiClient from "./api";

const baseUrl = "/api/orders";
const api = createApiClient(baseUrl, { needAuth: true });

export async function getAll({ customerSearch, beginDate, endDate, orderStatusId, paymentMethodId, paymentStatusId, sortBy, page, limit }) {
    return (await api.get("/all", { params: { customerSearch, beginDate, endDate, orderStatusId, paymentMethodId, paymentStatusId, sortBy, page, limit } })).data;
}

export async function getAllForReport({ beginDate, endDate }) {
    const res = (await api.get("/allForReport", { params: { beginDate, endDate } })).data;
    console.log("res", res);
    return res;
}

export async function updateOrderStatus(orderId, { fromStatus, toStatus }) {
    return (await api.put(`/${orderId}/status`, { fromStatus, toStatus }))
        .data;
}

export async function getAllOrderStatus() {
    return (await api.get("/status-all")).data;
}

//get all order of user
export async function getOrdersByStatus({ orderStatusId, sortBy, page, limit }) {
    return (await api.get("/", { params: { orderStatusId, sortBy, page, limit } })).data;
}

export async function getOrderById(orderId) {
    return (await api.get("/" + orderId)).data;
}



