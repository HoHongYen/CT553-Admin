import { getAllReviews } from "@/services/apiReviews";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "@/utils/constants";

export function useReviews() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // CUSTOMER SEARCH
    const customerSearchValue = searchParams.get("khach-hang") || "";
    const customerSearch = customerSearchValue === "" ? "" : customerSearchValue;

    // FILTER
    const visibleValue = searchParams.get("trang-thai") || "tat-ca";
    const visible = visibleValue === "tat-ca" ? "all" : visibleValue === "hien-thi" ? true : false;

    const replyValue = searchParams.get("phan-hoi") || "tat-ca";
    const hasReply = replyValue === "tat-ca" ? "all" : replyValue === "da-phan-hoi" ? true : false;

    // // SORT
    const sortByRaw = searchParams.get("thu-tu") || "moi-nhat";
    let sortBy = { field: "createdAt", direction: "desc" };
    if (sortByRaw === "cu-nhat") {
        sortBy = { field: "createdAt", direction: "asc" };
    } else if (sortByRaw === "rating-tang-dan") {
        sortBy = { field: "rating", direction: "asc" };
    } else if (sortByRaw === "rating-giam-dan") {
        sortBy = { field: "rating", direction: "desc" };
    }

    // PAGINATION
    const page = !searchParams.get("trang")
        ? 1
        : Number(searchParams.get("trang"));

    const limit = searchParams.get("gioi-han") || PAGE_SIZE;

    const { isLoading,
        data: { metadata: { reviews, pagination: { totalReviews, totalPages } } } = { metadata: { reviews: [], pagination: { totalReviews: 0, totalPages: 0 } } },
    } = useQuery({
        queryKey: ["reviews", customerSearch, visible, hasReply, sortBy, page, limit],
        queryFn: () => getAllReviews({ customerSearch, visible, hasReply, sortBy, page, limit }),
    })

    // PRE_FETCHING
    if (page < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["reviews", sortBy, page + 1, limit],
            queryFn: () => getAllReviews({ sortBy, page: page + 1, limit }),
        })
    }
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["reviews", sortBy, page - 1, limit],
            queryFn: () => getAllReviews({ sortBy, page: page - 1, limit }),
        })
    }

    return { isLoading, reviews, totalReviews, totalPages };
}



