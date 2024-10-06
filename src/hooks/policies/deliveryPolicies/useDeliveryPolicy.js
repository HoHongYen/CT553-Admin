import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPolicyById } from "@/services/apiDeliveryPolicies";

export function useDeliveryPolicy() {
    const { policyId } = useParams();
    const {
        isLoading,
        data: { metadata: deliveryPolicy } = {},
        error,
    } = useQuery({
        queryKey: ["deliveryPolicy", policyId],
        queryFn: () => getPolicyById(policyId),
        retry: false,
    });
    return { isLoading, deliveryPolicy, error };
}