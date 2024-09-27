import toast from "react-hot-toast";
import { toggleHideReview as toggleHideReviewApi } from "@/services/apiReviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useHideReview() {
    const queryClient = useQueryClient();

    const { isLoading, mutate: toggleHideReview } = useMutation({
        mutationFn: toggleHideReviewApi,
        onSuccess: () => {
            toast.success("Cập nhật trạng thái đánh giá thành công!");
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        onError: () => {
            toast.error("Lỗi xóa cập nhật trạng thái đánh giá!");
        },
    });

    return { isLoading, toggleHideReview };
}