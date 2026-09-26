import {
    Activity,
    Check,
    Globe2,
    Server,
} from "lucide-react";
import "./Metrics.css";

const metrics = [
    {
        id: "deployments",
        value: "2.4M+",
        label: "Deployments",
        detail: "shipped through Nexora",
    },
    {
        id: "uptime",
        value: "99.99%",
        label: "Platform uptime",
        detail: "across production workloads",
    },
    {
        id: "regions",
        value: "24",
        label: "Global regions",
        detail: "ready for deployment",
    },
    {
        id: "requests",
        value: "8.7B",
        label: "Requests",
        detail: "routed every month",
    },
];

export default function Metrics() {
    return (
        <section
            className="metrics"
            aria-labelledby="metrics-heading"
        >
            <div className="metrics__container">
                <div className="metrics__header">
                    <span className="metrics__eyebrow">
                        Platform scale
                    </span>

                    <h2
                        className="metrics__heading"
                        id="metrics-heading"
                    >
                        Infrastructure built to stay out of your way.
                    </h2>

                    <p className="metrics__description">
                        From the first deployment to global production
                        traffic, Nexora keeps the operational layer
                        predictable as your applications grow.
                    </p>
                </div>

                <div className="metrics__grid">
                    {metrics.map((metric) => (
                        <div
                            className="metrics__item"
                            key={metric.id}
                        >
                            <span className="metrics__value">
                                {metric.value}
                            </span>

                            <span className="metrics__label">
                                {metric.label}
                            </span>

                            <span className="metrics__detail">
                                {metric.detail}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="metrics__status">
                    <div className="metrics__status-primary">
                        <div className="metrics__status-indicator">
                            <span className="metrics__status-dot" />

                            <span className="metrics__status-text">
                                All systems operational
                            </span>
                        </div>

                        <span className="metrics__status-description">
                            Global platform status
                        </span>
                    </div>

                    <div className="metrics__status-signals">
                        <div className="metrics__status-signal">
                            <Globe2
                                className="metrics__status-icon"
                                size={15}
                                strokeWidth={1.6}
                                aria-hidden="true"
                            />

                            <span className="metrics__status-signal-text">
                                24 regions
                            </span>
                        </div>

                        <div className="metrics__status-signal">
                            <Server
                                className="metrics__status-icon"
                                size={15}
                                strokeWidth={1.6}
                                aria-hidden="true"
                            />

                            <span className="metrics__status-signal-text">
                                Edge healthy
                            </span>
                        </div>

                        <div className="metrics__status-signal">
                            <Activity
                                className="metrics__status-icon"
                                size={15}
                                strokeWidth={1.6}
                                aria-hidden="true"
                            />

                            <span className="metrics__status-signal-text">
                                Network stable
                            </span>
                        </div>

                        <div className="metrics__status-signal">
                            <Check
                                className="metrics__status-icon metrics__status-icon--healthy"
                                size={15}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />

                            <span className="metrics__status-signal-text">
                                API operational
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}