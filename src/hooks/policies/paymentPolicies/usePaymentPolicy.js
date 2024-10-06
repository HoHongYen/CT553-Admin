import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPolicyById } from "@/services/apiPaymentPolicies";

export function usePaymentPolicy() {
    const { policyId } = useParams();
    const {
        isLoading,
        data: { metadata: paymentPolicy } = {},
        error,
    } = useQuery({
        queryKey: ["paymentPolicy", policyId],
        queryFn: () => getPolicyById(policyId),
        retry: false,
    });
    return { isLoading, paymentPolicy, error };
}