import { getAllPolicies } from "@/services/apiDeliveryPolicies";
import { useQuery } from "@tanstack/react-query";

export function useDeliveryPolicies() {
    const { isLoading,
        data: { metadata: policies } = { metadata: [] },
    } = useQuery({
        queryKey: ["deliveryPolicies"],
        queryFn: getAllPolicies,
    })

    return { isLoading, policies };
}



