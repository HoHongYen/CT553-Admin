import createApiClient from "./api";

const baseUrl = "/api/coupons";
const api = createApiClient(baseUrl);

export async function createCoupon(data) {
    console.log(data);
    return (await api.post("", data)).data;
}

export async function getCoupons() {
    const coupons = (await api.get("")).data;
    console.log("coupons", coupons);
    return coupons;
}

export async function updateCoupon(couponId, updatedCoupon) {
    return (await api.put("/" + couponId, updatedCoupon)).data;
}

export async function deleteCoupon(couponId) {
    return (await api.delete("/" + couponId)).data;
}


