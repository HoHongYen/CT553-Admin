import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPolicyById } from "@/services/apiWarrantyPolicies";

export function useWarrantyPolicy() {
    const { policyId } = useParams();
    const {
        isLoading,
        data: { metadata: warrantyPolicy } = {},
        error,
    } = useQuery({
        queryKey: ["warrantyPolicy", policyId],
        queryFn: () => getPolicyById(policyId),
        retry: false,
    });
    return { isLoading, warrantyPolicy, error };
}