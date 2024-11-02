import { useQuery } from "@tanstack/react-query";
import { getBanners } from "@/services/apiBanners";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";

export function useBanners() {
    const [searchParams] = useSearchParams();

    // CUSTOMER SEARCH
    const bannerSearchValue = searchParams.get("banner") || "";
    const bannerSearch = bannerSearchValue === "" ? "" : bannerSearchValue;

    // FILTER
    const bannerCategoryIdValue = searchParams.get("loai") || "tat-ca";
    const bannerCategoryId = bannerCategoryIdValue === "tat-ca" ? "all" : bannerCategoryIdValue;

    const visibleValue = searchParams.get("trang-thai") || "tat-ca";
    const visible = visibleValue === "tat-ca" ? "all" : visibleValue === "hien-thi" ? true : false;

    // // SORT
    const sortByRaw = searchParams.get("thu-tu") || "thu-tu-tang-dan";
    let sortBy = { field: "priority", direction: "asc" };
    if (sortByRaw === "cu-nhat") {
        sortBy = { field: "createdAt", direction: "asc" };
    } else if (sortByRaw === "moi-nhat") {
        sortBy = { field: "createdAt", direction: "desc" };
    } else if (sortByRaw === "ten-tang-dan") {
        sortBy = { field: "name", direction: "asc" };
    } else if (sortByRaw === "ten-giam-dan") {
        sortBy = { field: "name", direction: "desc" };
    } else if (sortByRaw === "thu-tu-giam-dan") {
        sortBy = { field: "priority", direction: "desc" };
    }

    // PAGINATION
    const page = !searchParams.get("trang")
        ? 1
        : Number(searchParams.get("trang"));

    const limit = searchParams.get("gioi-han") || PAGE_SIZE;


    const { isLoading, data: { metadata: { banners, pagination: { totalBanners, totalPages } } } = { metadata: { banners: [], pagination: { totalBanners: 0, totalPages: 0 } } }, } = useQuery({
        queryKey: ["banners", bannerSearch, bannerCategoryId, visible, sortBy, page, limit],
        queryFn: () => getBanners({ bannerSearch, bannerCategoryId, visible, sortBy, page, limit }),
    })

    return { isLoading, banners, totalBanners, totalPages };
}

