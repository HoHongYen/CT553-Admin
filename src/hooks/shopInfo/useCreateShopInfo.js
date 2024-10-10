import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShopInfo as createShopInfoApi } from "@/services/apiShopInfo";
import toast from "react-hot-toast";

export function useCreateShopInfo() {
    const queryClient = useQueryClient();
    const { mutate: createShopInfo, isLoading } = useMutation({
        mutationFn: (data) => createShopInfoApi(data),
        onSuccess: (shopInfo) => {
            console.log(shopInfo);
            toast.success("Thêm thông tin cửa hàng thành công!");
            queryClient.invalidateQueries({ queryKey: ["shopInfo"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi thêm thông tin cửa hàng!");
        }
    })

    return { createShopInfo, isLoading };
}