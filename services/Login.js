import { useState, useEffect } from 'react';
import axios from 'axios';

export const OdooLogin = (loginData) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(loginData.host);
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getData(); // No need to call .catch(), handle errors inside getData function
    }, [loginData.host]); // Dependency array should include loginData.host

    return data;
};

