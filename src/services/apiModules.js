// eslint-disable
import createApiClient from "./api";

const baseUrl = "/api/modules";
const api = createApiClient(baseUrl, { needAuth: true });

export async function getModules() {
    const modules = (await api.get("/")).data;
    console.log("modules", modules);
    return modules;
}

