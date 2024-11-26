import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCoupon as createCouponApi } from "@/services/apiCoupons";

export function useCreateCoupon() {
    const queryClient = useQueryClient();
    const { mutate: createCoupon, isLoading } = useMutation({
        mutationFn: (data) => createCouponApi(data),
        onSuccess: (coupon) => {
            console.log(coupon);
            toast.success("Thêm mã giảm giá thành công!");
            queryClient.invalidateQueries({ queryKey: ["coupons"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi thêm mã giảm giá!");
        }
    })

    return { createCoupon, isLoading };
}