import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBanner as createBannerApi } from "@/services/apiBanners";

export function useCreateBanner() {
    const queryClient = useQueryClient();
    const { mutate: createBanner, isLoading } = useMutation({
        mutationFn: (data) => createBannerApi(data),
        onSuccess: (banner) => {
            console.log(banner);
            toast.success("Thêm banner thành công!");
            queryClient.invalidateQueries({ queryKey: ["banners"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi thêm banner!");
        }
    })

    return { createBanner, isLoading };
}