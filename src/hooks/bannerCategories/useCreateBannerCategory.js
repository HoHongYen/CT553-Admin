import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBannerCategory as createBannerCategoryApi } from "@/services/apiBannerCategories";

export function useCreateBannerCategory() {
    const queryClient = useQueryClient();
    const { mutate: createBannerCategory, isLoading } = useMutation({
        mutationFn: (data) => createBannerCategoryApi(data),
        onSuccess: (banner) => {
            console.log(banner);
            toast.success("Thêm danh mục banner thành công!");
            queryClient.invalidateQueries({ queryKey: ["bannerCategories"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi thêm danh mục banner!");
        }
    })

    return { createBannerCategory, isLoading };
}