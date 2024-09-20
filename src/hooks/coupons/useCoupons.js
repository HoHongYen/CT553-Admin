import { useQuery } from "@tanstack/react-query";
import { getCoupons } from "@/services/apiCoupons";

export function useCoupons() {
    const { isLoading, data: { metadata } = {} } = useQuery({
        queryKey: ["coupons"],
        queryFn: getCoupons,
    })

    return { isLoading, coupons: metadata };
}

