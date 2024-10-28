import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPermissionToRole as addPermissionToRoleApi } from "@/services/apiPermissions";


export function useAddPermissionToRole() {
    const queryClient = useQueryClient();
    const { mutate: addPermissionToRole, isLoading } = useMutation({
        mutationFn: (data) => addPermissionToRoleApi(data),
        onSuccess: (permission) => {
            toast.success("Cập nhật quyền cho người dùng thành công!", {
                id: 'clipboard',
            });
            queryClient.invalidateQueries({ predicate: (query) => { return ["adminPermissions", "employeePermissions", "clientPermissions", "notRegisterClientPermissions"].includes(query.queryKey[0]); } })
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi cập nhật quyền cho người dùng!!");
        }
    })

    return { addPermissionToRole, isLoading };
}