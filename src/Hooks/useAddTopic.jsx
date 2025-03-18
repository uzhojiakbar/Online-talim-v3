import { useQuery } from "@tanstack/react-query";
import { instance } from "./api";

export function useAddTopic(fanNomi) {
    return useQuery({
        queryKey: ["topics", fanNomi],
        queryFn: async () => {
            const response = await instance.get(`/api/topic/${fanNomi}`);
            return response.data;

        },
        enabled: !!fanNomi, 
    });
}
