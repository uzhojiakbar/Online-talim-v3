import { useEffect, useState } from 'react';
import { instance } from './api';

export function useFan() {
    const [fan, setFan] = useState([]);
    const [loading, setLoading] = useState(true); // Defaultda true qilish yaxshiroq
    const [error, setError] = useState(null); // Xatolarni ham qo'shdim

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await instance.get('/api/lessons');
                setFan(data);
            } catch (err) {
                console.error("Ma'lumot olishda xatolik:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    return { fan, loading, error }; // errorni ham return qilamiz
}

export default useFan;
