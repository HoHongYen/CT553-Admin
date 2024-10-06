import toast from "react-hot-toast";
import { toggleVisibility as toggleVisibilityApi } from "@/services/apiCheckProductPolicies";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useHideCheckProductPolicy() {
    const queryClient = useQueryClient();

    const { isLoading, mutate: toggleVisibility } = useMutation({
        mutationFn: toggleVisibilityApi,
        onSuccess: () => {
            toast.success("Cập nhật trạng thái chính sách thành công!", {
                id: 'clipboard',
            });
            queryClient.invalidateQueries({ predicate: (query) => { return ['checkProductPolicies', 'checkProductPolicy'].includes(query.queryKey[0]); } })
        },
        onError: () => {
            toast.error("Lỗi xóa cập nhật trạng thái chính sách!");
        },
    });

    return { isLoading, toggleVisibility };
}