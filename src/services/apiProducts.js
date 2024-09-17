import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('bookings')
    // .select('*, cabins(*), guests(*)')
    // .select("id, create_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)")
    .select("*, cabins(name), guests(fullName, email)", { count: "exact" });

  // if (filter !== null) query = query[filter.method || "eq"](filter.field, filter.value);
  if (filter !== null) query = query.eq(filter.field, filter.value);

  if (sortBy) query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });

  if (page) query = query.range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

  let { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new (Error("Bookings could not be loaded"));
  }
  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extraPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}


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

// export async function deleteDiscount(productId, id) {
//   console.log("deleteVariant", productId, id);
//   return (await api.delete(`/${productId}/discount/${id}`)).data;
// }

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

// export async function deleteCategory(productCategoryId) {
//   console.log("productCategoryId", productCategoryId);
//   return (await api.delete(`/delete-category/${productCategoryId}`)).data;
// }

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