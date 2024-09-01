import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct as createProductApi } from "@/services/apiProducts";
import toast from "react-hot-toast";

export function useCreateProduct() {
    const queryClient = useQueryClient();
    const { mutate: createProduct, isLoading } = useMutation({
        mutationFn: (data) => createProductApi(data),
        onSuccess: (product) => {
            console.log(product);
            toast.success("Thêm sản phẩm thành công!");
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi thêm sản phẩm!");
        }
    })

    return { createProduct, isLoading };
}