import { toggleHideProduct as toggleHideProductApi } from "@/services/apiProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useHideProduct() {
    const queryClient = useQueryClient();

    const { isLoading, mutate: toggleHideProduct } = useMutation({
        mutationFn: toggleHideProductApi,
        onSuccess: () => {
            toast.success("Cập nhật trạng thái sản phẩm thành công!");
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: () => {
            toast.error("Lỗi cập nhật trạng thái sản phẩm!");
        },
    });

    return { isLoading, toggleHideProduct };
}