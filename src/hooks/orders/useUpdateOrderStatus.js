import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus as updateOrderStatusApi } from "@/services/apiOrders";

export function useUpdateOrderStatus() {
    const queryClient = useQueryClient();
    const { mutate: updateOrderStatus, isLoading } = useMutation({
        mutationFn: ({ orderId, updatedOrder: { fromStatus, toStatus } }) => updateOrderStatusApi(orderId, { fromStatus, toStatus }),
        onSuccess: (order) => {
            console.log(order);
            toast.success("Cập nhật trạng thái đơn hàng thành công!", {
                id: 'clipboard',
              });

            queryClient.invalidateQueries({ predicate: (query) => { return ['orders', 'order'].includes(query.queryKey[0]); } })
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật trạng thái đơn hàng!");
        }
    })

    return { updateOrderStatus, isLoading };
}