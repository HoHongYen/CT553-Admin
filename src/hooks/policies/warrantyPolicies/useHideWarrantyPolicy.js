import toast from "react-hot-toast";
import { toggleVisibility as toggleVisibilityApi } from "@/services/apiWarrantyPolicies";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useHideWarrantyPolicy() {
    const queryClient = useQueryClient();

    const { isLoading, mutate: toggleVisibility } = useMutation({
        mutationFn: toggleVisibilityApi,
        onSuccess: () => {
            toast.success("Cập nhật trạng thái chính sách thành công!", {
                id: 'clipboard',
            });
            queryClient.invalidateQueries({ predicate: (query) => { return ['warrantyPolicies', 'warrantyPolicy'].includes(query.queryKey[0]); } })
        },
        onError: () => {
            toast.error("Lỗi xóa cập nhật trạng thái chính sách!");
        },
    });

    return { isLoading, toggleVisibility };
}