import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/apiCategories";

export function useCategories() {
    const { isLoading, data: { metadata } = { metadata: [] } } = useQuery({
        queryKey: ["parentCategories"],
        queryFn: getCategories,
    })

    return { isLoading, categories: metadata };
}

