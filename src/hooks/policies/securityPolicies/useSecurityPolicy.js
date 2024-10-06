import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPolicyById } from "@/services/apiSecurityPolicies";

export function useSecurityPolicy() {
    const { policyId } = useParams();
    const {
        isLoading,
        data: { metadata: securityPolicy } = {},
        error,
    } = useQuery({
        queryKey: ["securityPolicy", policyId],
        queryFn: () => getPolicyById(policyId),
        retry: false,
    });
    return { isLoading, securityPolicy, error };
}