import {
    NavLink,
} from "react-router-dom";

import "./Sidebar.css";


interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

function Sidebar({
    mobileOpen,
    onClose,
}: SidebarProps) {
    return (
        <>
            {mobileOpen && (
                <div
                    className="sidebar-mobile-backdrop"
                    onClick={onClose}
                />
            )}
            <aside className={
                `sidebar ${
                    mobileOpen
                        ? "sidebar-mobile-open"
                        : ""
                }`
            }>

                <div className="sidebar-brand">
                    <div className="sidebar-logo">
                        ◈
                    </div>

                    <span>
                        RAGspace
                    </span>
                </div>


                <nav className="sidebar-nav">

                    <NavLink
                        to="/ragspace"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        <span className="sidebar-link-icon">
                            ◫
                        </span>

                        Dashboard
                    </NavLink>


                    <NavLink
                        to="/ragspace"
                        className="sidebar-link"
                    >
                        <span className="sidebar-link-icon">
                            ◈
                        </span>

                        Spaces
                    </NavLink>

                </nav>


                <div className="sidebar-footer">

                    <span className="sidebar-footer-label">
                        RAGspace
                    </span>

                    <span className="sidebar-footer-version">
                        v1.0
                    </span>

                </div>

            </aside>
        </>
    );
}


export default Sidebar;