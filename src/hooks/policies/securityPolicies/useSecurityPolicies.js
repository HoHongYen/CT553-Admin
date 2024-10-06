import { getAllPolicies } from "@/services/apiSecurityPolicies";
import { useQuery } from "@tanstack/react-query";

export function useSecurityPolicies() {
    const { isLoading,
        data: { metadata: policies } = { metadata: [] },
    } = useQuery({
        queryKey: ["securityPolicies"],
        queryFn: getAllPolicies,
    })

    return { isLoading, policies };
}



