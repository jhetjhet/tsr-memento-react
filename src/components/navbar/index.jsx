import niugan_logo from "../../assets/images/niugan_logo.png";
import PropTypes from "prop-types";
import { useState } from "react";
import authFetch from "../../fetch/authentication";
import { useNavigate } from "react-router-dom";
import {
    ROUTER_PAGE_ENDPOINTS,
    routePageUrlBuilder,
    getBuildUrlByEndPoints,
} from "../../constants/urls";
import { useEffect } from "react";
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';

const Navbar = ({ navState, onNavState }) => {
    const [showProfMenu, setShowProfMenu] = useState(false);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchReq() {
            try {
                let data = await authFetch.retrieve();
                setUser(data);
            } catch (error) {
                
            }
        }

        fetchReq();
    }, []);

    const __on_logout__ = () => {
        async function fetchReq() {
            try {
                await authFetch.logout();
                let url = getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.LOGIN_PAGE);
                navigate(url, { replace: true });
            } catch (error) { }
        }

        fetchReq();
    }

    let SVG = createAvatar(style, {
        seed: user.username || 'U',
        backgroundColor: user.background || 'blue',
    });

    return (
        <nav className="bg-gray-100 p-1 shadow-md">
            <div className=" mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false"
                            onClick={onNavState}

                        >
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>

                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="block h-full max-h-16 w-auto" alt="niugan-logo" src={niugan_logo} />
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button type="button" className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View notifications</span>

                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        <div className="ml-3 relative">
                            <div className="rounded-full overflow-hidden shadow-sm">
                                <button type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                    onClick={() => setShowProfMenu(!showProfMenu)}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <div
                                        className="h-8 w-8"
                                        dangerouslySetInnerHTML={{ __html: SVG }}
                                    />
                                </button>
                            </div>

                            <div className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none 
                                ${showProfMenu ? '' : 'hidden'}
                            `} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                <button href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300 w-full text-left" role="menuitem" tabIndex="-1" id="user-menu-item-2"
                                    onClick={__on_logout__}
                                >Sign out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </nav>
    )
}

Navbar.defaultProps = {
    navState: false,
    onNavState: () => { },
}

Navbar.propTypes = {
    navState: PropTypes.bool,
    onNavState: PropTypes.func,
}

export default Navbar;