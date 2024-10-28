import { useQuery } from "@tanstack/react-query";
import { getPermissionsByRole } from "@/services/apiPermissions";

export function useClientPermissions() {

    const { isLoading, data: { metadata } = { metadata: [] } } = useQuery({
        queryKey: ["clientPermissions"],
        queryFn: () => getPermissionsByRole(3),
    })

    return { isLoading, permissions: metadata };
}

