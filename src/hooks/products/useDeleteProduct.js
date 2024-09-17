import { deleteProduct as deleteProductApi } from "@/services/apiProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    const { isLoading, mutate: deleteProduct } = useMutation({
        mutationFn: deleteProductApi,
        onSuccess: () => {
            toast.success("Xóa sản phẩm thành công!");
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: () => {
            toast.error("Lỗi xóa sản phẩm!");
        },
    });

    return { isLoading, deleteProduct };
}