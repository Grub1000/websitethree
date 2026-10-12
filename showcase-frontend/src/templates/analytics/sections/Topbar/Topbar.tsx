import {
    Bell,
    CalendarDays,
    ChevronDown,
    Menu,
    Search,
} from "lucide-react";

import "./Topbar.css";


type TopbarProps = {
    onMenuClick: () => void;
};


export default function Topbar({ onMenuClick }: TopbarProps) {
    return (
        <header className="analytics-topbar">
            <div className="analytics-topbar__left">
                <button
                    className="analytics-topbar__menu"
                    type="button"
                    aria-label="Open navigation"
                    aria-controls="analytics-sidebar"
                    onClick={onMenuClick}
                >
                    <Menu
                        className="analytics-topbar__menu-icon"
                        aria-hidden="true"
                        strokeWidth={1.7}
                    />
                </button>

                <div className="analytics-topbar__breadcrumb">
                    <span className="analytics-topbar__breadcrumb-parent">
                        Workspace
                    </span>

                    <span
                        className="analytics-topbar__breadcrumb-separator"
                        aria-hidden="true"
                    >
                        /
                    </span>

                    <span className="analytics-topbar__breadcrumb-current">
                        Overview
                    </span>
                </div>
            </div>


            <div className="analytics-topbar__right">
                <button
                    className="analytics-topbar__search"
                    type="button"
                    aria-label="Search"
                >
                    <Search
                        className="analytics-topbar__search-icon"
                        aria-hidden="true"
                        strokeWidth={1.7}
                    />

                    <span className="analytics-topbar__search-label">
                        Search
                    </span>

                    <span
                        className="analytics-topbar__search-shortcut"
                        aria-hidden="true"
                    >
                        ⌘ K
                    </span>
                </button>

                <button
                    className="analytics-topbar__date"
                    type="button"
                >
                    <CalendarDays
                        className="analytics-topbar__date-icon"
                        aria-hidden="true"
                        strokeWidth={1.7}
                    />

                    <span className="analytics-topbar__date-label">
                        Last 30 days
                    </span>

                    <ChevronDown
                        className="analytics-topbar__date-chevron"
                        aria-hidden="true"
                        strokeWidth={1.5}
                    />
                </button>

                <button
                    className="analytics-topbar__notification"
                    type="button"
                    aria-label="Notifications"
                >
                    <Bell
                        className="analytics-topbar__notification-icon"
                        aria-hidden="true"
                        strokeWidth={1.7}
                    />

                    <span className="analytics-topbar__notification-indicator" />
                </button>

                <button
                    className="analytics-topbar__avatar"
                    type="button"
                    aria-label="Account menu"
                >
                    JD
                </button>
            </div>
        </header>
    );
}