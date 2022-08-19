import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Page404 from "../../pages/page404";

const Response404Listener = ({ children }) => {
    const [notFound, setNotFound] = useState(false);

    let location = useLocation();

    useEffect(() => {
        let interceptor = axios.interceptors.response.use(function(response) {
            return response;
        }, function(error) {
            if(error.response.status === 404)
                setNotFound(true);
            return Promise.reject(error);
        });

        return () => {
            axios.interceptors.response.eject(interceptor);
        }
    }, []);

    useEffect(() => {
        setNotFound(false);
    }, [location]);

    if(notFound)
        return <Page404 />
    
    return children;
}

export default Response404Listener;