import type {
    ReactNode,
} from "react";

import {
    useState,
} from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

import "./AppLayout.css";


interface AppLayoutProps {
    children: ReactNode;
}


function AppLayout({
    children,
}: AppLayoutProps) {

    const [
        mobileSidebarOpen,
        setMobileSidebarOpen,
    ] = useState(false);


    function handleOpenSidebar() {
        setMobileSidebarOpen(true);
    }


    function handleCloseSidebar() {
        setMobileSidebarOpen(false);
    }


    return (

        <div className="app-layout">

            <Sidebar
                mobileOpen={
                    mobileSidebarOpen
                }
                onClose={
                    handleCloseSidebar
                }
            />

            <div className="app-main">

                <Header
                    onMenuClick={
                        handleOpenSidebar
                    }
                />

                <main className="app-content">
                    {children}
                </main>

            </div>

        </div>
    );
}


export default AppLayout;