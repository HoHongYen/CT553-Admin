import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePolicy as updatePolicyApi } from "@/services/apiWarrantyPolicies";
import toast from "react-hot-toast";

export function useUpdateWarrantyPolicy() {
    const queryClient = useQueryClient();
    const { mutate: updatePolicy, isLoading } = useMutation({
        mutationFn: ({ policyId, data }) => updatePolicyApi(policyId, data),
        onSuccess: (policy) => {
            toast.success("Cập nhật chính sách thành công!");
            queryClient.invalidateQueries({ predicate: (query) => { return ['warrantyPolicies', 'warrantyPolicy'].includes(query.queryKey[0]); } })
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật chính sách!");
        }
    })

    return { updatePolicy, isLoading };
}