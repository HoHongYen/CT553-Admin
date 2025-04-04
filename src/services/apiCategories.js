import createApiClient from "./api";
import { uploadImage } from "./apiUpload";

const baseUrl = "/api/categories";
const api = createApiClient(baseUrl, { needAuth: true });

export async function createCategory(data) {
    console.log(data);
    return (await api.post("", data)).data;
}

export async function getCategories() {
    const categories = (await api.get("/")).data;
    return categories;
}

export async function getCategoriesForTable({ categorySearch, isRootCategory, sortBy, page, limit }) {
    const categories = (await api.get("/admin", { params: { categorySearch, isRootCategory, sortBy, page, limit } })).data;
    return categories;
}

export async function getChildrenCategory(categoryId) {
    return (await api.get("/children/" + categoryId)).data;
}

export async function updateCategory(categoryId, updatedAddress) {
    return (await api.put("/" + categoryId, updatedAddress)).data;
}

export async function deleteCategory(categoryId) {
    return (await api.delete("/" + categoryId)).data;
}


// createCategoryWithUrl

const getUrlExtension = (url) => {
    return url
        .split(/[#?]/)[0]
        .split(".")
        .pop()
        .trim();
}


const changeImageUrlToFile = async (imgUrl) => {
    var imgExt = getUrlExtension(imgUrl);

    const response = await fetch(imgUrl);
    const contentType = response.headers.get("content-type");
    const blob = await response.blob();
    const file = new File([blob], "categoryImage." + imgExt, {
        // type: blob.type,
        contentType,
    });
    console.log(file);
    return file;
};

// const changeImageUrlToFile = async (imgUrl) => {
//     var imgExt = getUrlExtension(imgUrl);

//     try {
//         const response = await fetch(imgUrl, { mode: 'no-cors' });
//         console.log(response);
//         const blob = await response.blob();
//         const file = new File([blob], "categoryImage." + imgExt, {
//             type: blob.type,
//         });
//         return file;
//     } catch (e) {
//         console.log(e);
//     }
// }

export async function createCategoryWithUrl({ name, parentId, thumbnailImageUrl, slug }) {
    console.log(name, parentId, thumbnailImageUrl, slug);

    const form = new FormData();
    const file = await changeImageUrlToFile(thumbnailImageUrl);
    form.append("image", file);
    const uploadedImage = await uploadImage(form);
    const data = {
        name, parentId: +parentId, thumbnailImageId: uploadedImage.metadata.id, slug
    }
    console.log(data);

    return (await api.post("", data)).data;
}

