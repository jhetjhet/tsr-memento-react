import axios from "axios";
import Cookies from "js-cookie";
import { createRefreshTokenInterceptor } from "./authentication";

export function fetchResponseDataErrorPromise(fetchReq){
    return new Promise(async function(resolve, reject){
        try {
            const resp = await fetchReq;
            resolve(resp.data);
        } catch (error) {
            reject(error.response);
        }
    }); 
}

const fetch = (method, url, conf={}) => {
    createRefreshTokenInterceptor();
    return fetchResponseDataErrorPromise(axios({
        method,
        url,
        headers: {
            Authorization: `Bearer ${Cookies.get(process.env.REACT_APP_ACCESS_TOKEN_COOKIE_NAME, {
                path: '/',
            })}`
        },
        ...conf,
    }));
}

export default fetch;