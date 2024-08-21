import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "@/services/apiProducts";

export function useTodayActivity() {
    const { isLoading, data: activities } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ["today-activity"],
    });

    return { isLoading, activities };
}