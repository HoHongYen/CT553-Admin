import createApiClient from "./api";

const baseUrl = "/api/bannerCategories";
const api = createApiClient(baseUrl, { needAuth: true });

export async function createBannerCategory(data) {
    console.log("data", data);
    return (await api.post("/", data)).data;
}

export async function getBannerCategories() {
    const bannerCategories = (await api.get("/")).data;
    console.log("bannerCategories", bannerCategories);
    return bannerCategories;
}

export async function updateBannerCategory(bannerCategoryId, data) {
    return (await api.put("/" + bannerCategoryId, data)).data;
}





