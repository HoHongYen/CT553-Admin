import createApiClient from "./api";

const baseUrl = "/api/addresses";
const api = createApiClient(baseUrl, { needAuth: true });

export async function getProvinces() {
    const provinces = (await api.get("/provinces")).data;
    return provinces;
}

export async function getDistricts(provinceId) {
    const districts = (await api.get("/districts?provinceId=" + provinceId)).data;
    return districts;
}

export async function getWards(districtId) {
    const wards = (await api.get("/wards?districtId=" + districtId)).data;
    return wards;
}

