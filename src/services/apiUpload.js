import createApiClient from "./api";

const baseUrl = "/api/upload";
const api = createApiClient(baseUrl);

export async function uploadImage(formData) {
    return (await api.post("/image", formData)).data;
}

export async function uploadImages(formData) {
    return (await api.post("/images", formData)).data;
}

export async function destroyImage(uploadedImageId) {
    return (await api.delete("/" + uploadedImageId)).data;
}