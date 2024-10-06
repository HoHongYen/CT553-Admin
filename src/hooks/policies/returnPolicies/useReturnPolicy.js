import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPolicyById } from "@/services/apiReturnPolicies";

export function useReturnPolicy() {
    const { policyId } = useParams();
    const {
        isLoading,
        data: { metadata: returnPolicy } = {},
        error,
    } = useQuery({
        queryKey: ["returnPolicy", policyId],
        queryFn: () => getPolicyById(policyId),
        retry: false,
    });
    return { isLoading, returnPolicy, error };
}