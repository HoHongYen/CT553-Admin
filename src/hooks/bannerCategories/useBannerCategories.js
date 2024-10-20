import { useQuery } from "@tanstack/react-query";
import { getBannerCategories } from "@/services/apiBannerCategories";

export function useBannerCategories() {
    const { isLoading, data: { metadata: bannerCategories } = { metadata: [] }, } = useQuery({
        queryKey: ["bannerCategories"],
        queryFn: () => getBannerCategories(),
    })

    return { isLoading, bannerCategories };
}

