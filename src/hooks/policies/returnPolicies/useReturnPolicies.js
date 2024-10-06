import { getAllPolicies } from "@/services/apiReturnPolicies";
import { useQuery } from "@tanstack/react-query";

export function useReturnPolicies() {
    const { isLoading,
        data: { metadata: policies } = { metadata: [] },
    } = useQuery({
        queryKey: ["returnPolicies"],
        queryFn: getAllPolicies,
    })

    return { isLoading, policies };
}



