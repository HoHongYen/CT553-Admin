import { useQuery } from "@tanstack/react-query";
import { getModules } from "@/services/apiModules";

export function useModules() {
    const { isLoading, data: { metadata } = { metadata: [] } } = useQuery({
        queryKey: ["modules"],
        queryFn: getModules,
    })

    return { isLoading, modules: metadata };
}

