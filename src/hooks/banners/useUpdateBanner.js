import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBanner as updateBannerApi } from "@/services/apiBanners";

export function useUpdateBanner() {
    const queryClient = useQueryClient();
    const { mutate: updateBanner, isLoading } = useMutation({
        mutationFn: ({ bannerId, updatedBanner }) => updateBannerApi(bannerId, updatedBanner),
        onSuccess: (banner) => {
            console.log(banner);
            toast.success("Cập nhật banner thành công!");
            queryClient.invalidateQueries({ queryKey: ["banners"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật banner!");
        }
    })

    return { updateBanner, isLoading };
}