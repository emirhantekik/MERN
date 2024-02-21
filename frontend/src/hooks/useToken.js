import { useEffect, useState } from 'react';

function useToken() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("auth");
        if (storedToken !== null && storedToken !== undefined) {
            try {
                const parsedToken = JSON.parse(storedToken);
                setToken(parsedToken);
            } catch (error) {
                console.error("localStorage'dan alınan veri geçerli JSON değil:", error);
            }
        }
    }, []);

    return [token];
}

export default useToken;
