import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview as createReviewApi } from "@/services/apiReviews";
import toast from "react-hot-toast";

export function useCreateReview() {
    const queryClient = useQueryClient();
    const { mutate: createReview, isLoading } = useMutation({
        mutationFn: (data) => createReviewApi(data),
        onSuccess: (review) => {
            console.log(review);
            toast.success("Thêm phản hồi thành công!");
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error("Lỗi thêm phản hồi!");
        }
    })

    return { createReview, isLoading };
}