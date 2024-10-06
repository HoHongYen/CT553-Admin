import { getAllPolicies } from "@/services/apiPaymentPolicies";
import { useQuery } from "@tanstack/react-query";

export function usePaymentPolicies() {
    const { isLoading,
        data: { metadata: policies } = { metadata: [] },
    } = useQuery({
        queryKey: ["paymentPolicies"],
        queryFn: getAllPolicies,
    })

    return { isLoading, policies };
}



