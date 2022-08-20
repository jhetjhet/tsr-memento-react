import axios from "axios";
import Cookies from "js-cookie";
import fetch from "..";

const AUTH_BASE_URL = new URL('/auth/', process.env.REACT_APP_API_BASE_URL);

const refresh = () => {
    let url = new URL('refresh/', AUTH_BASE_URL).href;

    return new Promise(async function(resolve, reject) {
        try {
            let resp = await axios.post(url, {
                token: Cookies.get(process.env.REACT_APP_REFRESH_TOKEN_COOKIE_NAME, { path: '/' }),
            });
            let newAccessToken = resp.data.accessToken;
            Cookies.set(process.env.REACT_APP_ACCESS_TOKEN_COOKIE_NAME, newAccessToken, { path: '/' });
            resolve(newAccessToken);
        } catch (error) {
            reject(error);
        }
    });
}

export const createRefreshTokenInterceptor = () => {
    const interceptor = axios.interceptors.response.use(function(response) {
        axios.interceptors.response.eject(interceptor);
        return response;
    }, function(error) {

        axios.interceptors.response.eject(interceptor);
        
        if(error.response.status !== 400 && error.response.status !== 401)
            return Promise.reject(error);

        return refresh().then((newAccessToken) => {
            let prevReqConfig = error.response.config;
            prevReqConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axios(prevReqConfig);
        }).catch((err) => {
            return Promise.reject(err);
        });
    });
}

const register = (data) => {
    let url = new URL('register/', AUTH_BASE_URL).href;
    return new Promise(async function(resolve, reject) {
        try {
            let response = await axios.post(url, data);
            resolve(response);
        } catch (error) {
            reject(error.response);
        }
    });
}

const login = (username, password) => {
    let url = new URL('login/', AUTH_BASE_URL).href;
    return new Promise(async function(resolve, reject) {
        try {
            let response = await axios.post(url, {
                username,
                password,
            });
            let data = response.data;

            
            Cookies.set(process.env.REACT_APP_ACCESS_TOKEN_COOKIE_NAME, data.accessToken, {path: '/' });
            Cookies.set(process.env.REACT_APP_REFRESH_TOKEN_COOKIE_NAME, data.refreshToken, { path: '/', expires: 3 });

            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}

const logout = () => {
    let url = new URL('logout/', AUTH_BASE_URL).href;
    
    return new Promise(async function(resolve, reject) {
        try {
            let resp = await fetch('post', url);
            Cookies.remove(process.env.REACT_APP_ACCESS_TOKEN_COOKIE_NAME, { path: '/' });
            Cookies.remove(process.env.REACT_APP_REFRESH_TOKEN_COOKIE_NAME, { path: '/' });
            return resolve(resp);
        } catch (error) {
            return reject(error);
        }
    });
}

const verify = () => {
    let url = new URL('verify/', AUTH_BASE_URL).href;
    
    function _verify(token) {
        return axios.post(url, {
            token,
        });
    }

    return new Promise(async function(resolve, reject) {
        try {
            let resp = await _verify(Cookies.get(process.env.REACT_APP_ACCESS_TOKEN_COOKIE_NAME));
            return resolve(resp);
        } catch (error) {
            if(error.response.status === 400 || error.response.status === 401){
                try {
                    let newAccessToken = await refresh();
                    let resp = await _verify(newAccessToken);
                    return resolve(resp);
                } catch (error) {
                    return reject(error);       
                }
            }

            return reject(error);
        }
    });
}

const retrieve = () => {
    let url = new URL('user/', AUTH_BASE_URL).href;

    return fetch('get', url);
}

const authFetch = {
    register,
    login,
    logout,
    verify,
    retrieve,
}

export default authFetch;