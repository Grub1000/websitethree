import { useState } from "react";
import {
    Activity,
    ChartNoAxesCombined,
    Database,
    GitBranch,
    Network,
    RotateCcw,
} from "lucide-react";

import "./Features.css";

import AutoscalingVisualization from "./visualizations/AutoscalingVisualization";
import DeploymentsVisualization from "./visualizations/DeploymentsVisualization";
import ObservabilityVisualization from "./visualizations/ObservabilityVisualization";
import NetworkingVisualization from "./visualizations/NetworkingVisualization";
import DatabasesVisualization from "./visualizations/DatabasesVisualization";
import RollbacksVisualization from "./visualizations/RollbacksVisualization";

type FeatureId =
    | "autoscaling"
    | "deployments"
    | "observability"
    | "networking"
    | "databases"
    | "rollbacks";

interface Feature {
    id: FeatureId;
    label: string;
    description: string;
    icon: typeof Activity;
}

const features: Feature[] = [
    {
        id: "autoscaling",
        label: "Autoscaling",
        description:
            "Scale compute automatically as traffic and resource demand change.",
        icon: ChartNoAxesCombined,
    },
    {
        id: "deployments",
        label: "Deployments",
        description:
            "Move from commit to production through a predictable deployment pipeline.",
        icon: GitBranch,
    },
    {
        id: "observability",
        label: "Observability",
        description:
            "Understand application health through metrics, logs, and runtime signals.",
        icon: Activity,
    },
    {
        id: "networking",
        label: "Networking",
        description:
            "Connect services through secure public and private networking.",
        icon: Network,
    },
    {
        id: "databases",
        label: "Databases",
        description:
            "Provision production databases alongside the applications that use them.",
        icon: Database,
    },
    {
        id: "rollbacks",
        label: "Rollbacks",
        description:
            "Return to a previous deployment when production needs a fast recovery.",
        icon: RotateCcw,
    },
];

export default function Features() {
    const [activeFeature, setActiveFeature] =
        useState<FeatureId>("autoscaling");

    const selectedFeature =
        features.find((feature) => feature.id === activeFeature) ??
        features[0];

    return (
        <section
            className="features saas-section"
            id="features"
            aria-labelledby="features-heading"
        >
            <div className="features__container saas-container">
                <header className="features__header">
                    <p className="features__label saas-label">
                        Built for production
                    </p>

                    <h2
                        className="features__heading saas-heading"
                        id="features-heading"
                    >
                        Infrastructure primitives without the infrastructure work.
                    </h2>

                    <p className="features__description">
                        Deploy, scale, observe, and recover your applications
                        from one operational layer.
                    </p>
                </header>

                <div className="features__workspace">
                    <nav
                        className="features__navigation"
                        aria-label="Platform features"
                    >
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            const isActive =
                                feature.id === activeFeature;

                            return (
                                <button
                                    className={`features__navigation-item${
                                        isActive
                                            ? " features__navigation-item--active"
                                            : ""
                                    }`}
                                    key={feature.id}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() =>
                                        setActiveFeature(feature.id)
                                    }
                                >
                                    <span className="features__navigation-icon">
                                        <Icon
                                            className="features__navigation-icon-svg"
                                            size={18}
                                            aria-hidden="true"
                                        />
                                    </span>

                                    <span className="features__navigation-copy">
                                        <span className="features__navigation-label">
                                            {feature.label}
                                        </span>

                                        <span className="features__navigation-description">
                                            {feature.description}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="features__visualization">
                        <div className="features__visualization-header">
                            <div className="features__visualization-title-group">
                                <span className="features__visualization-eyebrow">
                                    Platform capability
                                </span>

                                <h3 className="features__visualization-title">
                                    {selectedFeature.label}
                                </h3>
                            </div>

                            <div className="features__visualization-status">
                                <span
                                    className="features__visualization-status-dot"
                                    aria-hidden="true"
                                />

                                <span className="features__visualization-status-text">
                                    Operational
                                </span>
                            </div>
                        </div>

                        {/*
                         * TEMPORARY VISUALIZATION AREA
                         *
                         * The shell is intentionally simple for V1.
                         *
                         * Once the responsive section structure is confirmed,
                         * this area will render a different product
                         * visualization for each selected feature.
                         */}
                       <div className="features__visualization-body">

                            {activeFeature === "autoscaling" && (
                                <AutoscalingVisualization />
                            )}

                            {activeFeature === "deployments" && (
                                <DeploymentsVisualization />
                            )}

                            {activeFeature === "observability" && (
                                <ObservabilityVisualization />
                            )}

                            {activeFeature === "networking" && (
                                <NetworkingVisualization />
                            )}
                            {activeFeature === "databases" && (
                                <DatabasesVisualization />
                            )}
                            {activeFeature === "rollbacks" && (
                                <RollbacksVisualization />
                            )}
                            
                            {![
                                "autoscaling",
                                "deployments",
                                "observability",
                                "networking",
                                "databases",
                                "rollbacks"
                            ].includes(activeFeature) && (
                                <div className="features__placeholder">
                                    <span className="features__placeholder-label">
                                        {selectedFeature.label}
                                    </span>

                                    <p className="features__placeholder-description">
                                        {selectedFeature.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}