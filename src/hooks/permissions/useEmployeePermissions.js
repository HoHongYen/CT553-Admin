import { useQuery } from "@tanstack/react-query";
import { getPermissionsByRole } from "@/services/apiPermissions";

export function useEmployeePermissions() {

    const { isLoading, data: { metadata } = { metadata: [] } } = useQuery({
        queryKey: ["employeePermissions"],
        queryFn: () => getPermissionsByRole(2),
    })

    return { isLoading, permissions: metadata };
}

