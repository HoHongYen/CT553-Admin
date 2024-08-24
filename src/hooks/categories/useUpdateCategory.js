import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory as updateCategoryApi } from "@/services/apiCategories";
import toast from "react-hot-toast";

export function useUpdateCategory() {
    const queryClient = useQueryClient();
    const { mutate: updateCategory, isLoading } = useMutation({
        mutationFn: ({ categoryId, updatedCategory }) => updateCategoryApi(categoryId, updatedCategory),
        onSuccess: (category) => {
            console.log(category);
            toast.success("Cập nhật danh mục thành công!");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật danh mục!");
        }
    })

    return { updateCategory, isLoading };
}