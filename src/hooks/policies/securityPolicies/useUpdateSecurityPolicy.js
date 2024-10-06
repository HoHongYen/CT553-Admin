import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePolicy as updatePolicyApi } from "@/services/apiSecurityPolicies";
import toast from "react-hot-toast";

export function useUpdateSecurityPolicy() {
    const queryClient = useQueryClient();
    const { mutate: updatePolicy, isLoading } = useMutation({
        mutationFn: ({ policyId, data }) => updatePolicyApi(policyId, data),
        onSuccess: (policy) => {
            toast.success("Cập nhật chính sách thành công!");
            queryClient.invalidateQueries({ predicate: (query) => { return ['securityPolicies', 'securityPolicy'].includes(query.queryKey[0]); } })
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật chính sách!");
        }
    })

    return { updatePolicy, isLoading };
}