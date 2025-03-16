import { useQuery } from "@tanstack/react-query";
import { instance } from "./api";

const fetchLessons = async () => {
    const { data } = await instance.get("/api/lessons");
    return data
};

export function useFan() {
    return useQuery({
        queryKey: ["lessons"], // Kesh uchun kalit
        queryFn: fetchLessons, // API chaqiruv funksiyasi
        staleTime: 1000 * 60 * 5, // 5 daqiqa davomida ma'lumot eski hisoblanmaydi
    });
}

export default useFan;
