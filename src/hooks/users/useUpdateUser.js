import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "@/services/apiUsers";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isLoading } = useMutation({
        mutationFn: ({ userId, data }) => updateUserApi(userId, data),
        onSuccess: (user) => {
            toast.success("Cập nhật thông tin người dùng thành công!");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật thông tin người dùng!");
        }
    })

    return { updateUser, isLoading };
}