import toast from "react-hot-toast";
import { toggleActiveUser as toggleActiveUserApi } from "@/services/apiUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useActiveUser() {
    const queryClient = useQueryClient();

    const { isLoading, mutate: toggleActiveUser } = useMutation({
        mutationFn: toggleActiveUserApi,
        onSuccess: () => {
            toast.success("Cập nhật trạng thái tài khoản người dùng thành công!");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: () => {
            toast.error("Lỗi xóa cập nhật trạng thái tài khoản người dùng!");
        },
    });

    return { isLoading, toggleActiveUser };
}