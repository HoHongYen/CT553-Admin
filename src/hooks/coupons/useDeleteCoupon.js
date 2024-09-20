import toast from "react-hot-toast";
import { deleteCoupon as deleteCouponApi } from "@/services/apiCoupons";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCoupon() {
    const queryClient = useQueryClient();

    const { isLoading, mutate: deleteCoupon } = useMutation({
        mutationFn: deleteCouponApi,
        onSuccess: () => {
            toast.success("Xóa coupon thành công!");
            queryClient.invalidateQueries({ queryKey: ["coupons"] });
        },
        onError: () => {
            toast.error("Lỗi xóa coupon!");
        },
    });

    return { isLoading, deleteCoupon };
}