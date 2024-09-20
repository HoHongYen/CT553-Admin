import toast from "react-hot-toast";
import { deleteCategory as deleteCategoryApi } from "@/services/apiCategories";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    const { isLoading, mutate: deleteCategory } = useMutation({
        mutationFn: deleteCategoryApi,
        onSuccess: () => {
            toast.success("Xóa danh mục thành công!");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: () => {
            toast.error("Lỗi xóa danh mục!");
        },
    });

    return { isLoading, deleteCategory };
}