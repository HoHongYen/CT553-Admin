import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "@/services/apiPermissions";

export function usePermissions() {

    const { isLoading, data: { metadata } = { metadata: [] } } = useQuery({
        queryKey: ["permissions"],
        queryFn: getPermissions,
    })

    return { isLoading, permissions: metadata };
}

