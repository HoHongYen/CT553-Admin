import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser as createUserApi } from "@/services/apiUsers";
import toast from "react-hot-toast";

export function useCreateUser() {
    const queryClient = useQueryClient();
    const { mutate: createUser, isLoading } = useMutation({
        mutationFn: (data) => createUserApi(data),
        onSuccess: (user) => {
            console.log(user);
            toast.success("Tạo tài khoản thành công!");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Email đã được sử dụng!");
        }
    })

    return { createUser, isLoading };
}