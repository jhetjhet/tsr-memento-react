import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import niugan_logo from "../../assets/images/niugan_logo.png";
import authFetch from "../../fetch/authentication";
import {
    ROUTER_PAGE_ENDPOINTS,
    routePageUrlBuilder,
    getBuildUrlByEndPoints,
} from "../../constants/urls";
import { getRandomColor } from "../../utils";

const RegisterPage = () => {
    const DEFAULT_AUTH_DATA = {
        username: '',
        password: '',
        re_password: '',
    }

    const [authData, setAuthData] = useState({...DEFAULT_AUTH_DATA});
    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const __get_from__ = () => {
        let from = getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.RECORD_LISTS_PAGE);
        if (location.state && location.state.from)
            from = location.state.from;
        return from;
    }

    useEffect(() => {
        async function fetchReq() {
            try {
                await authFetch.verify();
                navigate(__get_from__(), { replace: true });
            } catch (error) { }
        }

        fetchReq();
    }, []);

    useEffect(() => {
        let timeout;

        if(showSuccess === true)
            timeout = setTimeout(() => {
                setShowSuccess(false);
            }, 3000); // show success for only 3s

        return () => {
            if(timeout)
                clearTimeout(timeout);
        }
    }, [showSuccess]);

    const __on_change__ = (e) => {
        const { name, value } = e.target;
        setAuthData((prevState) => {
            let newAuthData = { ...prevState };
            newAuthData[name] = value;
            return newAuthData;
        });
    }

    const __on_submit__ = (e) => {
        e.preventDefault();
        setErrors({});
        async function fetchReq() {
            try {
                let data = {...authData};
                data.background = getRandomColor()[0];
                await authFetch.register(data);
                setAuthData({...DEFAULT_AUTH_DATA});
                setShowSuccess(true);
            } catch (error) {
                if (error.data)
                    setErrors(error.data);
            }
        }

        fetchReq();
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg border-t-8 border-b-8 border-totem-pole-500 rounded-md min-w-full sm:min-w-[28rem]">

                {showSuccess && (
                    <div className="my-3 w-full flex items-center justify-center bg-green-400 py-2">
                        <span className="text-sm text-white">Creating account successfull !!!</span>
                    </div>
                )}

                <div className="flex justify-center">
                    <img src={niugan_logo} alt="niugan logo" className="w-16 h-16" />
                </div>
                <h3 className="text-2xl font-bold text-center capitalize">register new account</h3>
                <form onSubmit={__on_submit__}>
                    <div className="mt-4">
                        <div>
                            <label className="block" htmlFor="username">Username</label>
                            <input type="text" placeholder="Username" className="text-black w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                name="username"
                                value={authData.username}
                                onChange={__on_change__}
                            />
                            {(errors.username) && (
                                <span className="text-xs text-red-600">{errors.username.message}</span>
                            )}
                        </div>
                        <div className="mt-4">
                            <label className="block">Password</label>
                            <input type="password" placeholder="Password" className="text-black w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                name="password"
                                value={authData.password}
                                onChange={__on_change__}
                            />
                            {(errors.password) && (
                                <span className="text-xs text-red-600">{errors.password.message}</span>
                            )}
                        </div>
                        <div className="mt-4">
                            <label className="block">Reenter Password</label>
                            <input type="password" placeholder="Password" className="text-black w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                name="re_password"
                                value={authData.re_password}
                                onChange={__on_change__}
                            />
                            {(errors.re_password) && (
                                <span className="text-xs text-red-600">{errors.re_password.message}</span>
                            )}
                        </div>
                        <button className="w-full py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-600">CREATE</button>
                    </div>
                </form>
                <span className="text-sm">Go to <Link
                    to={getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.LOGIN_PAGE)}
                    className="text-blue-500 hover:underline"
                >
                    login
                </Link> page.</span>
            </div>
        </div>
    );
}


export default RegisterPage;