import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useWindowDimensions from "../utils/useWindowDimensions";

const MainLayout = () => {
    const [sbCollapsed, setSBCollapsed] = useState(false);
    const [sbToggle, setSBToggle] = useState(true);
    const [isBreakPoint, setIsBreakPoint] = useState(false);
    const { height, width } = useWindowDimensions();
//ml-[270px], 80px

    useEffect(() => {
        if(width < 640){ // sm -> sidebar/style.scss
            setSBCollapsed(true);
            if(sbToggle)
                setSBToggle(false);
        }
        setIsBreakPoint(width < 640);
    }, [height, width]);

    const onNavState = () => {
        setSBToggle(!sbToggle);
    }

    const onToggle = (state) => {
        setSBToggle(state);
    }

    return (
        <div className="flex w-full overflow-hidden">
            <Sidebar collapsed={false} toggled={sbToggle} onToggle={onToggle} />
            <div className={`w-full ${(isBreakPoint) ? '' : 'ml-[270px]'}`}>
                <Navbar navState={sbCollapsed} onNavState={onNavState} />
                <div className="w-full min-h-[calc(100vh-72px)] flex">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;