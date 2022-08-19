import PropTypes from "prop-types";
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import "./style.scss";

const Sidebar = ({ collapsed, toggled, onToggle }) => {

    return (
        <div className="h-screen fixed top-0 left-0 z-10">
            <ProSidebar collapsed={collapsed} toggled={toggled} onToggle={onToggle} breakPoint="sm">
                <SidebarHeader>
                    <div className="my-10 mx-4 text-white">
                        <h1 className="font-bold">BRG. NIUGAN</h1>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="square" className="text-white font-semibold">
                        <MenuItem className="">Dashboard</MenuItem>
                        <SubMenu className="" title="Records">
                            <MenuItem>
                                <NavLink
                                    to="records/lists"
                                >
                                    Lists
                                </NavLink>
                            </MenuItem>
                            <MenuItem>
                                <NavLink
                                    to="records/detail"
                                >
                                    Create
                                </NavLink>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
            </ProSidebar>
        </div>
    );
}

Sidebar.defaultProps = {
    collapsed: false,
    toggled: false,
    onToggle: () => { },
}

Sidebar.propTypes = {
    collapsed: PropTypes.bool,
    toggled: PropTypes.bool,
    onToggle: PropTypes.func,
}

export default Sidebar;