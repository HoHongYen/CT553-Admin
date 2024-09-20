import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCoupon as updateCouponApi } from "@/services/apiCoupons";

export function useUpdateCoupon() {
    const queryClient = useQueryClient();
    const { mutate: updateCoupon, isLoading } = useMutation({
        mutationFn: ({ couponId, updatedCoupon }) => updateCouponApi(couponId, updatedCoupon),
        onSuccess: (coupon) => {
            console.log(coupon);
            toast.success("Cập nhật coupon thành công!");
            queryClient.invalidateQueries({ queryKey: ["coupons"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật coupon!");
        }
    })

    return { updateCoupon, isLoading };
}