import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "@/services/apiUsers";
import toast from "react-hot-toast";

export function useUpdateCabin() {
    const queryClient = useQueryClient();

    const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onSuccess: () => {
            toast.success("Cabin edited");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
    return { isUpdating, updateCabin };
}