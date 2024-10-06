import { getAllPolicies } from "@/services/apiWarrantyPolicies";
import { useQuery } from "@tanstack/react-query";

export function useWarrantyPolicies() {
    const { isLoading,
        data: { metadata: policies } = { metadata: [] },
    } = useQuery({
        queryKey: ["warrantyPolicies"],
        queryFn: getAllPolicies,
    })

    return { isLoading, policies };
}



