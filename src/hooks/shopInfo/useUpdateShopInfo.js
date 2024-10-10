import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShopInfo as updateShopInfoApi } from "@/services/apiShopInfo";
import toast from "react-hot-toast";

export function useUpdateShopInfo() {
    const queryClient = useQueryClient();
    const { mutate: updateShopInfo, isLoading } = useMutation({
        mutationFn: ({ shopInfoId, data }) => updateShopInfoApi(shopInfoId, data),
        onSuccess: (shopInfo) => {
            toast.success("Cập nhật thông tin cửa hàng thành công!");
            queryClient.invalidateQueries({ queryKey: ["shopInfo"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật thông tin cửa hàng!");
        }
    })

    return { updateShopInfo, isLoading };
}