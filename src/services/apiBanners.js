import createApiClient from "./api";

const baseUrl = "/api/banners";
const api = createApiClient(baseUrl, { needAuth: true });

export async function createBanner(data) {
    console.log("data", data);
    return (await api.post("/", data)).data;
}

export async function getBanners({ bannerSearch, bannerCategoryId, sortBy, page, limit }) {
    const banners = (await api.get("/admin", { params: { bannerSearch, bannerCategoryId, sortBy, page, limit } })).data;
    console.log("banners", banners);
    return banners;
}

export async function updateBanner(bannerId, data) {
    return (await api.put("/" + bannerId, data)).data;
}





