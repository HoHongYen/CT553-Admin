import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPolicyById } from "@/services/apiCheckProductPolicies";

export function useCheckProductPolicy() {
    const { policyId } = useParams();
    const {
        isLoading,
        data: { metadata: checkProductPolicy } = {},
        error,
    } = useQuery({
        queryKey: ["checkProductPolicy", policyId],
        queryFn: () => getPolicyById(policyId),
        retry: false,
    });
    return { isLoading, checkProductPolicy, error };
}