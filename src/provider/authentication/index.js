import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import authFetch from "../../fetch/authentication";

export const VerifyToken = ({ children }) => {
    const [isTokenValid, setIsTokenValid] = useState(null);

    const location = useLocation();

    useEffect(() => {
        async function fetchReq() {
            try {
                await authFetch.verify();
                setIsTokenValid(true);
            } catch (error) {
                if(error.response.status === 400 || error.response.status === 401)
                    setIsTokenValid(false);
            }
        }

        fetchReq();
    }, []);

    if(isTokenValid === null)
        return null;
    else if(isTokenValid === false)
        return <Navigate 
            to="/login"
            state={{ from: location }}
            replace
        />
    else if(isTokenValid === true)
        return children;
}