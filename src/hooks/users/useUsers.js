import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/apiUsers";

export function useUsers() {
    const {
        isLoading,
        data: { metadata: users } = {},
    } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
    return { isLoading, users };
}