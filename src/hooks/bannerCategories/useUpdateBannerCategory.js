import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBannerCategory as updateBannerCategoryApi } from "@/services/apiBannerCategories";

export function useUpdateBannerCategory() {
    const queryClient = useQueryClient();
    const { mutate: updateBannerCategory, isLoading } = useMutation({
        mutationFn: ({ bannerCategoryId, updatedBannerCategory }) => updateBannerCategoryApi(bannerCategoryId, updatedBannerCategory),
        onSuccess: (bannerCategory) => {
            console.log(bannerCategory);
            toast.success("Cập nhật danh mục banner thành công!");
            queryClient.invalidateQueries({ queryKey: ["bannerCategories"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật danh mục banner!");
        }
    })

    return { updateBannerCategory, isLoading };
}