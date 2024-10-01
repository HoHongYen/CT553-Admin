import createApiClient from "./api";
const baseUrl = "/api/products";
const api = createApiClient(baseUrl);
import { PAGE_SIZE, PRODUCT_ALL } from "../utils/constants";

export async function createProduct(data) {
  return (await api.post("/", data)).data; // name, slug, overview, material, specification, instruction, categoryIds, (array) uploadedImageIds  
}

export async function deleteProduct(id) {
  return (await api.delete(`/${id}`)).data;
}

export async function updateProduct(productId, data) {
  console.log("updateProduct", productId, data);
  return (await api.put("/" + productId, data)).data; // name, slug, overview, material, specification, instruction
}

export async function createVariant(productId, data) {
  return (await api.post(`/${productId}/variants`, data)).data; // size, price,  quantity
}

export async function updateVariant(productId, data) {
  return (await api.put(`/${productId}/variants`, data)).data; // size, price,  quantity
}

export async function deleteVariant(productId, id) {
  console.log("deleteVariant", productId, id);
  return (await api.delete(`/${productId}/variants/${id}`)).data;
}

export async function createDiscount(productId, data) {
  return (await api.post(`/${productId}/discount`, data)).data; // discountType, discountValue, startDate, endDate
}

export async function updateDiscount(productId, data) {
  return (await api.put(`/${productId}/discount`, data)).data; // discountType, discountValue, startDate, endDate
}

export async function uploadImage(id, data) {
  return (await api.post(`/${id}/add-image`, data)).data;
}

export async function deleteImage(productImageId) {
  console.log("deleteImage productImageId", productImageId);
  return (await api.delete(`/delete-image/${productImageId}`)).data;
}

export async function addCategory(id, data) {
  return (await api.post(`/${id}/add-category`, data)).data;
}

export async function deleteCategory(id, categoryId) {
  console.log("deleteCategory", id, categoryId);
  return (await api.delete(`/${id}/delete-category/${categoryId}`)).data;
}

export async function getProducts({ type = PRODUCT_ALL, categoryIds, filter, filterMinPrice = 0, filterMaxPrice = 0, sortBy, page = 1, limit = PAGE_SIZE }) {
  const products = (await api.get("/", { params: { type, categoryIds, filter, filterMinPrice, filterMaxPrice, sortBy, limit, page } })).data;
  return products;
}

export async function getByCategories({ categoryIds = [], type, limit = PAGE_SIZE, page = 1 }) {
  console.log(categoryIds);
  return (
    await api.get("/", { params: { type, limit, categoryIds, page } })
  ).data;
}

export async function getByProductIds({
  productIds = [],
  type = "All",
  limit = 10,
  page = 1,
}) {
  return (
    await api.get("/", { params: { type, limit, productIds, page } })
  ).data;
}

export async function getOneBySlug(slug) {
  const res = (await api.get(`/slug/allDiscounts/${slug}`)).data;
  console.log("getOneBySlug", res);
  return res;
}