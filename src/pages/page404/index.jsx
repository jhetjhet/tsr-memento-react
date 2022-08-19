import { Link } from "react-router-dom";
import {
    ROUTER_PAGE_ENDPOINTS,
    routePageUrlBuilder,
    getBuildUrlByEndPoints,
} from "../../constants/urls";

const Page404 = () => {

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <h1 className="text-8xl font-extrabold text-totem-pole-500">404</h1>
                <p className="font-bold">NOT FOUND</p>
                <p>
                    Go back to <Link to={getBuildUrlByEndPoints(routePageUrlBuilder, ROUTER_PAGE_ENDPOINTS.RECORD_LISTS_PAGE)}
                        className="text-blue-500 hover:underline"
                        replace
                    >main</Link> page instead.
                </p>
            </div>
        </div>
    );
}

export default Page404;