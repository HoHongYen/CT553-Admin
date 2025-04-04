import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";
import { getProducts } from "@/services/apiProducts";

export function useProducts() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // CUSTOMER SEARCH
    const productSearchValue = searchParams.get("san-pham") || "";
    const productSearch = productSearchValue === "" ? "" : productSearchValue;

    // FILTER
    const discountValue = searchParams.get("giam-gia") || "tat-ca";
    const discount = !discountValue || discountValue === "tat-ca" ? "all" : discountValue;

    const visibleValue = searchParams.get("trang-thai") || "tat-ca";
    const visible = visibleValue === "tat-ca" ? "all" : visibleValue === "hien-thi" ? true : false;

    const filterMinPriceValue = Number(searchParams.get("gia-toi-thieu"));
    const filterMinPrice = !filterMinPriceValue ? null : { field: "gia-toi-thieu", value: filterMinPriceValue };

    const filterMaxPriceValue = Number(searchParams.get("gia-toi-da"));
    const filterMaxPrice = !filterMaxPriceValue ? null : { field: "gia-toi-da", value: filterMaxPriceValue };

    const categoryIdValue = searchParams.get("loc-danh-muc") || "tat-ca";
    const categoryIds = categoryIdValue === "tat-ca" ? [] : [categoryIdValue];

    // SORT
    const sortByRaw = searchParams.get("thu-tu") || "moi-nhat";
    let sortBy = { field: "createdAt", direction: "desc" };
    if (sortByRaw === "cu-nhat") {
        sortBy = { field: "createdAt", direction: "asc" };
    } else if (sortByRaw === "ten-tang-dan") {
        sortBy = { field: "name", direction: "asc" };
    } else if (sortByRaw === "ten-giam-dan") {
        sortBy = { field: "name", direction: "desc" };
    } else if (sortByRaw === "rating-tang-dan") {
        sortBy = { field: "rating", direction: "asc" };
    } else if (sortByRaw === "rating-giam-dan") {
        sortBy = { field: "rating", direction: "desc" };
    }

    // else if (sortByRaw === "gia-tang-dan") {
    //     sortBy = { field: "finalPrice", direction: "asc" };
    // } else if (sortByRaw === "gia-giam-dan") {
    //     sortBy = { field: "finalPrice", direction: "desc" };
    // }

    // PAGINATION
    const page = !searchParams.get("trang")
        ? 1
        : Number(searchParams.get("trang"));

    const limit = searchParams.get("gioi-han") || PAGE_SIZE;

    // QUERY
    const {
        isLoading,
        data: { metadata: { products, pagination: { totalProducts, totalPages } } } = { metadata: { products: [], pagination: { totalProducts: 0, totalPages: 0 } } },
        error,
    } = useQuery({
        queryKey: ["products", productSearch, categoryIds, discount, visible, filterMinPrice, filterMaxPrice, sortBy, page, limit],
        queryFn: () => getProducts({ productSearch, categoryIds, discount, visible, filterMinPrice: filterMinPriceValue, filterMaxPrice: filterMaxPriceValue, sortBy, page, limit }),
    });

    // PRE_FETCHING
    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["products", productSearch, categoryIds, discount, visible, filterMinPrice, filterMaxPrice, sortBy, page + 1, limit],
            queryFn: () => getProducts({ productSearch, categoryIds, discount, visible, filterMinPrice: filterMinPriceValue, filterMaxPrice: filterMaxPriceValue, sortBy, page: page + 1, limit }),
        })
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["products", productSearch, categoryIds, discount, visible, filterMinPrice, filterMaxPrice, sortBy, page - 1, limit],
            queryFn: () => getProducts({ productSearch, categoryIds, discount, visible, filterMinPrice: filterMinPriceValue, filterMaxPrice: filterMaxPriceValue, sortBy, page: page - 1, limit }),
        })
    }

    return { isLoading, products, error, totalProducts, totalPages };
}