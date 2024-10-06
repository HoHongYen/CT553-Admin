import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPolicy as createPolicyApi } from "@/services/apiCheckProductPolicies";
import toast from "react-hot-toast";

export function useCreateCheckProductPolicy() {
    const queryClient = useQueryClient();
    const { mutate: createPolicy, isLoading } = useMutation({
        mutationFn: (data) => createPolicyApi(data),
        onSuccess: (policy) => {
            console.log(policy);
            toast.success("Thêm chính sách thành công!");
            queryClient.invalidateQueries({ queryKey: ["checkProductPolicies"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi thêm chính sách!");
        }
    })

    return { createPolicy, isLoading };
}