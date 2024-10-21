import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/apiUsers";
import { PAGE_SIZE } from "@/utils/constants";
import { useSearchParams } from "react-router-dom";

export function useUsers() {

    const [searchParams] = useSearchParams();

    // CUSTOMER SEARCH
    const customerSearchValue = searchParams.get("khach-hang") || "";
    const customerSearch = customerSearchValue === "" ? "" : customerSearchValue;

    // FILTER
    const activeValue = searchParams.get("trang-thai") || "tat-ca";
    const active = activeValue === "tat-ca" ? "all" : activeValue === "dang-kich-hoat" ? true : false;

    const genderValue = searchParams.get("gioi-tinh") || "tat-ca";
    const gender = genderValue === "tat-ca" ? "all" : genderValue === "nam" ? true : false;

    const roleValue = searchParams.get("vai-tro") || "tat-ca";
    const role = roleValue === "tat-ca" ? "all" : roleValue === "nhan-vien" ? 2 : roleValue === "khach-hang" ? 3 : 1;

    // // SORT
    const sortByRaw = searchParams.get("thu-tu") || "moi-nhat";
    let sortBy = { field: "createdAt", direction: "desc" };
    if (sortByRaw === "cu-nhat") {
        sortBy = { field: "createdAt", direction: "asc" };
    } else if (sortByRaw === "ten-tang-dan") {
        sortBy = { field: "fullName", direction: "asc" };
    } else if (sortByRaw === "ten-giam-dan") {
        sortBy = { field: "fullName", direction: "desc" };
    }

    // PAGINATION
    const page = !searchParams.get("trang")
        ? 1
        : Number(searchParams.get("trang"));

    const limit = searchParams.get("gioi-han") || PAGE_SIZE;

    const { isLoading,
        data: { metadata: { accounts, pagination: { totalAccounts, totalPages } } } = { metadata: { accounts: [], pagination: { totalAccounts: 0, totalPages: 0 } } },
    } = useQuery({
        queryKey: ["users", customerSearch, active, role, gender, sortBy, page, limit],
        queryFn: () => getUsers({ customerSearch, active, role, gender, sortBy, page, limit }),
    })

    return { isLoading, users: accounts, totalUsers: totalAccounts, totalPages };
}