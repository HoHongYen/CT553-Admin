import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct as updateProductApi } from "@/services/apiProducts";
import toast from "react-hot-toast";

export function useUpdateProduct() {
    const queryClient = useQueryClient();
    const { mutate: updateProduct, isLoading } = useMutation({
        mutationFn: ({ productId, data }) => updateProductApi(productId, data),
        onSuccess: (product) => {
            console.log(product);
            toast.success("Cập nhật sản phẩm thành công!");
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật sản phẩm!");
        }
    })

    return { updateProduct, isLoading };
}