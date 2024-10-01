import { useQuery } from "@tanstack/react-query";
import { getCategoriesForTable } from "@/services/apiCategories";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";

export function useCategoriesForTable() {
    const [searchParams] = useSearchParams();

    // CUSTOMER SEARCH
    const categorySearchValue = searchParams.get("danh-muc") || "";
    const categorySearch = categorySearchValue === "" ? "" : categorySearchValue;

    // FILTER
    const isRootCategoryValue = searchParams.get("loai") || "tat-ca";
    const isRootCategory = isRootCategoryValue === "tat-ca" ? "all" : isRootCategoryValue === "danh-muc-cha" ? true : false;

    // // SORT
    const sortByRaw = searchParams.get("thu-tu") || "moi-nhat";
    let sortBy = { field: "createdAt", direction: "desc" };
    if (sortByRaw === "cu-nhat") {
        sortBy = { field: "createdAt", direction: "asc" };
    } else if (sortByRaw === "ten-tang-dan") {
        sortBy = { field: "name", direction: "asc" };
    } else if (sortByRaw === "ten-giam-dan") {
        sortBy = { field: "name", direction: "desc" };
    }

    // PAGINATION
    const page = !searchParams.get("trang")
        ? 1
        : Number(searchParams.get("trang"));

    const limit = searchParams.get("gioi-han") || PAGE_SIZE;


    const { isLoading, data: { metadata: { categories, pagination: { totalCategories, totalPages } } } = { metadata: { categories: [], pagination: { totalCategories: 0, totalPages: 0 } } }, } = useQuery({
        queryKey: ["categories", categorySearch, isRootCategory, sortBy, page, limit],
        queryFn: () => getCategoriesForTable({ categorySearch, isRootCategory, sortBy, page, limit }),
    })

    return { isLoading, categories, totalCategories, totalPages };
}

