import { getAllPolicies } from "@/services/apiCheckProductPolicies";
import { useQuery } from "@tanstack/react-query";

export function useCheckProductPolicies() {
    const { isLoading,
        data: { metadata: policies } = { metadata: [] },
    } = useQuery({
        queryKey: ["checkProductPolicies"],
        queryFn: getAllPolicies,
    })

    return { isLoading, policies };
}



