import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import {
    ArrowLeftRight,
    ChartColumnIncreasing,
    ChevronDown,
    CircleHelp,
    FileText,
    LayoutDashboard,
    PanelLeftClose,
    Settings2,
    Wallet,
    Workflow,
} from "lucide-react";

import "./Sidebar.css";


type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};


const navigationItems = [
    {
        label: "Overview",
        path: "/showcase/analytics",
        icon: LayoutDashboard,
        end: true,
    },
    {
        label: "Operations",
        path: "/showcase/analytics/operations",
        icon: Workflow,
    },
    {
        label: "Financials",
        path: "/showcase/analytics/financials",
        icon: Wallet,
    },
    {
        label: "Transactions",
        path: "/showcase/analytics/transactions",
        icon: ArrowLeftRight,
    },
    {
        label: "Analytics",
        path: "/showcase/analytics/showcase/analytics",
        icon: ChartColumnIncreasing,
    },
    {
        label: "Reports",
        path: "/showcase/analytics/reports",
        icon: FileText,
    },
];


/*
 * NAVIGATION DATA:
 *
 * The icon values are React component references provided by lucide-react.
 *
 * Assigning icon: LayoutDashboard stores the component itself.
 * Rendering <Icon /> later creates the corresponding SVG element.
 *
 * This is normal React component composition, not a Lucide-specific
 * rendering API.
 */
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const sidebarRef = useRef<HTMLElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    /*
     * When the mobile drawer opens, move keyboard focus to its close button.
     *
     * This makes the newly opened navigation immediately operable without
     * requiring the user to tab through the underlying page.
     */
    useEffect(() => {
        if (!isOpen || window.matchMedia("(min-width: 64rem)").matches) {
            return;
        }

        closeButtonRef.current?.focus();
    }, [isOpen]);

    /*
     * Escape closes the mobile navigation.
     *
     * addEventListener/removeEventListener are native browser APIs.
     * React's effect cleanup removes the listener when the drawer closes
     * or the component unmounts.
     */
    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    return (
        <aside
            className={`analytics-sidebar ${
                isOpen ? "analytics-sidebar--open" : ""
            }`}
            ref={sidebarRef}
            aria-label="Application navigation"
        >
            <div className="analytics-sidebar__header">
                <div className="analytics-sidebar__identity">
                    <span
                        className="analytics-sidebar__symbol"
                        aria-hidden="true"
                    >
                        A
                    </span>

                    <div className="analytics-sidebar__brand-group">
                        <span className="analytics-sidebar__brand">
                            ATLAS
                        </span>

                        <span className="analytics-sidebar__brand-caption">
                            INTELLIGENCE
                        </span>
                    </div>
                </div>

                <button
                    className="analytics-sidebar__close"
                    type="button"
                    aria-label="Close navigation"
                    ref={closeButtonRef}
                    onClick={onClose}
                >
                    <PanelLeftClose
                        className="analytics-sidebar__close-icon"
                        aria-hidden="true"
                        strokeWidth={1.7}
                    />
                </button>
            </div>


            <div className="analytics-sidebar__workspace">
                <span className="analytics-sidebar__workspace-avatar">
                    N
                </span>

                <div className="analytics-sidebar__workspace-details">
                    <span className="analytics-sidebar__workspace-name">
                        Northstar Inc.
                    </span>

                    <span className="analytics-sidebar__workspace-plan">
                        Enterprise workspace
                    </span>
                </div>

                <ChevronDown
                    className="analytics-sidebar__workspace-chevron"
                    aria-hidden="true"
                    strokeWidth={1.5}
                />
            </div>


            <nav
                className="analytics-sidebar__navigation"
                aria-label="Main navigation"
            >
                <p className="analytics-sidebar__navigation-label">
                    WORKSPACE
                </p>

                <ul
                    className="analytics-sidebar__navigation-list"
                    role="list"
                >
                    {navigationItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li
                                className="analytics-sidebar__navigation-item"
                                key={item.path}
                            >
                                <NavLink
                                    className={({ isActive }) =>
                                        `analytics-sidebar__link ${
                                            isActive
                                                ? "analytics-sidebar__link--active"
                                                : ""
                                        }`
                                    }
                                    to={item.path}
                                    end={item.end}
                                    onClick={onClose}
                                >
                                    <Icon
                                        className="analytics-sidebar__link-icon"
                                        aria-hidden="true"
                                        strokeWidth={1.7}
                                    />

                                    <span className="analytics-sidebar__link-label">
                                        {item.label}
                                    </span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>


            <div className="analytics-sidebar__bottom">
                <nav
                    className="analytics-sidebar__utility"
                    aria-label="Utility navigation"
                >
                    <a
                        className="analytics-sidebar__utility-link"
                        href="#"
                    >
                        <Settings2
                            className="analytics-sidebar__utility-icon"
                            aria-hidden="true"
                            strokeWidth={1.7}
                        />

                        <span className="analytics-sidebar__utility-label">
                            Settings
                        </span>
                    </a>

                    <a
                        className="analytics-sidebar__utility-link"
                        href="#"
                    >
                        <CircleHelp
                            className="analytics-sidebar__utility-icon"
                            aria-hidden="true"
                            strokeWidth={1.7}
                        />

                        <span className="analytics-sidebar__utility-label">
                            Help & Support
                        </span>
                    </a>
                </nav>

                <div className="analytics-sidebar__profile">
                    <span className="analytics-sidebar__profile-avatar">
                        JD
                    </span>

                    <div className="analytics-sidebar__profile-details">
                        <span className="analytics-sidebar__profile-name">
                            Jordan Davis
                        </span>

                        <span className="analytics-sidebar__profile-role">
                            Workspace Admin
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
}