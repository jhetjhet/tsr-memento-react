import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import niugan_logo from "../../assets/images/niugan_logo.jpg";
import authFetch from "../../fetch/authentication";
import {
    ROUTER_PAGE_ENDPOINTS,
    routePageUrlBuilder,
    getBuildUrlByEndPoints,
} from "../../constants/urls";

const LoginPage = () => {
    const [authData, setAuthData] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isInvalid, setIsInvalid] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const __get_from__ = () => {
        let from = getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.RECORD_LISTS_PAGE);
        if(location.state && location.state.from)
            from = location.state.from;
        return from;
    }

    useEffect(() => {
        async function fetchReq() {
            try {
                await authFetch.verify();
                navigate(__get_from__(), { replace: true });
            } catch (error) {}
        }

        fetchReq();
    }, []);

    const __on_change__ = (e) => {
        const { name, value } = e.target;
        setAuthData((prevState) => {
            let newAuthData = {...prevState};
            newAuthData[name] = value;
            return newAuthData;
        });
    }

    const __on_login__ = (e) => {
        e.preventDefault();
        setErrors({});
        setIsInvalid(false);
        authFetch.login(authData.username, authData.password).then((data) => {
            // redirect to previous link or home
            navigate(__get_from__(), { replace: true });
        }).catch((err) => {
            const respStatus = err.response.status;
            if(respStatus === 400)
                setErrors(err.response.data);
            else if(respStatus === 401)
                setIsInvalid(true);
        });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg border-t-8 border-b-8 border-totem-pole-500 rounded-md min-w-[28rem]">
                <div className="flex justify-center">
                    <img src={niugan_logo} alt="niugan logo" className="w-16 h-16" />
                </div>
                <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                <form onSubmit={__on_login__}>
                    <div className="mt-4">
                        <div>
                            <label className="block" htmlFor="username">Username</label>
                            <input type="text" placeholder="Username" className="text-black w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                name="username"
                                value={authData.username}
                                onChange={__on_change__}
                            />
                            { (errors.username) && (
                                <span className="text-xs tracking-wide text-red-600">{ errors.username.message }</span>
                            ) }
                        </div>
                        <div className="mt-4">
                            <label className="block">Password</label>
                            <input type="password" placeholder="Password" className="text-black w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                name="password"
                                value={authData.password}
                                onChange={__on_change__}
                            />
                            { (errors.password) && (
                                <span className="text-xs tracking-wide text-red-600">{ errors.password.message }</span>
                            ) }
                        </div>
                        { isInvalid && (
                            <span className="text-xs tracking-wide text-red-600">Invalid username or password</span>
                        ) }
                        <div className="flex items-baseline justify-between">
                            <button className="px-6 py-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-400">Login</button>
                            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}


export default LoginPage;