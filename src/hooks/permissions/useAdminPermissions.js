import { useQuery } from "@tanstack/react-query";
import { getPermissionsByRole } from "@/services/apiPermissions";

export function useAdminPermissions() {

    const { isLoading, data: { metadata } = { metadata: [] } } = useQuery({
        queryKey: ["adminPermissions"],
        queryFn: () => getPermissionsByRole(1),
        onSuccess: (data) => {
            console.log("useAdminPermissions", data);
        }
    })

    return { isLoading, permissions: metadata };
}

