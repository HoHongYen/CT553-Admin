import { useQuery } from "@tanstack/react-query";
import { getPermissionsByRole } from "@/services/apiPermissions";

export function useNotRegisterClientPermissions() {

    const { isLoading, data: { metadata } = { metadata: [] } } = useQuery({
        queryKey: ["notRegisterClientPermissions"],
        queryFn: () => getPermissionsByRole(4),
    })

    return { isLoading, permissions: metadata };
}

