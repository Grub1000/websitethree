import { useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "./sections/Sidebar/Sidebar";
import Topbar from "./sections/Topbar/Topbar";
import Overview from "./pages/Overview/Overview";

import "./styles/tokens.css";
import "./styles/globals.css";
import "./styles/shell.css";


export default function AnalyticsApp() {
    /*
     * REACT STATE:
     *
     * Mobile navigation is controlled by React because opening and closing
     * the sidebar changes application behavior, not merely its appearance.
     *
     * Desktop navigation remains visible through CSS at 64REM and larger.
     */
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    /*
     * REACT ROUTER:
     *
     * useLocation() provides the current URL location.
     * The sidebar uses NavLink internally to determine the active route.
     */
    const location = useLocation();

    /*
     * Close the mobile sidebar when the user selects a navigation item.
     *
     * This also runs when the route changes through browser navigation.
     * Comparing the current pathname with the previous render is handled
     * through the effect below.
     */
    const [previousPathname, setPreviousPathname] = useState(location.pathname);

    if (location.pathname !== previousPathname) {
        setPreviousPathname(location.pathname);
        setIsSidebarOpen(false);
    }

    return (
        <div className="analytics">
            <div className="analytics-shell">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                {/*
                 * MOBILE BACKDROP:
                 *
                 * The backdrop is a real button so keyboard users can close
                 * the sidebar without relying on pointer interactions.
                 *
                 * CSS hides it when the menu is closed or the desktop layout
                 * is active.
                 */}
                <button
                    className={`analytics-shell__backdrop ${
                        isSidebarOpen
                            ? "analytics-shell__backdrop--visible"
                            : ""
                    }`}
                    type="button"
                    aria-label="Close navigation"
                    tabIndex={isSidebarOpen ? 0 : -1}
                    onClick={() => setIsSidebarOpen(false)}
                />

                <div className="analytics-shell__workspace">
                    <Topbar
                        onMenuClick={() => setIsSidebarOpen(true)}
                    />

                    <main
                        className="analytics-shell__content"
                        id="analytics-main"
                    >
                        <Routes>
                            <Route
                                index
                                element={<Overview />}
                            />

                            <Route
                                path="overview"
                                element={<Navigate to="/showcase/analytics" replace />}
                            />

                            {/*
                             * Other routes will be introduced as their pages
                             * are implemented.
                             */}
                        </Routes>
                    </main>
                </div>
            </div>
        </div>
    );
}