import {
    Activity,
    Braces,
    Cloud,
    Database,
    GitBranch,
    MessageSquare,
    Plug,
} from "lucide-react";
import "./Integrations.css";

const integrationGroups = [
    {
        id: "source",
        name: "Source control",
        icon: GitBranch,
        integrations: [
            { name: "GitHub", detail: "Git provider" },
            { name: "GitLab", detail: "Git provider" },
            { name: "Bitbucket", detail: "Git provider" },
        ],
    },
    {
        id: "data",
        name: "Data",
        icon: Database,
        integrations: [
            { name: "PostgreSQL", detail: "Database" },
            { name: "MySQL", detail: "Database" },
            { name: "Redis", detail: "Data store" },
        ],
    },
    {
        id: "observability",
        name: "Observability",
        icon: Activity,
        integrations: [
            { name: "Datadog", detail: "Monitoring" },
            { name: "Grafana", detail: "Metrics" },
            { name: "Sentry", detail: "Error tracking" },
        ],
    },
    {
        id: "workflows",
        name: "Workflows",
        icon: MessageSquare,
        integrations: [
            { name: "Slack", detail: "Collaboration" },
            { name: "PagerDuty", detail: "Incidents" },
            { name: "Linear", detail: "Issues" },
        ],
    },
];

export default function Integrations() {
    return (
        <section
            className="integrations"
            aria-labelledby="integrations-heading"
        >
            <div className="integrations__container">
                <div className="integrations__header">
                    <span className="integrations__eyebrow">
                        Integrations
                    </span>

                    <h2
                        className="integrations__heading"
                        id="integrations-heading"
                    >
                        Your stack stays yours.
                    </h2>

                    <p className="integrations__description">
                        Connect the tools your team already depends on.
                        Nexora fits into your development workflow instead
                        of replacing it.
                    </p>
                </div>

                <div className="integrations__registry">
                    <div className="integrations__registry-header">
                        <div className="integrations__registry-title-group">
                            <Plug
                                className="integrations__registry-icon"
                                size={16}
                                strokeWidth={1.6}
                                aria-hidden="true"
                            />

                            <span className="integrations__registry-title">
                                Integration registry
                            </span>
                        </div>

                        <div className="integrations__registry-count">
                            <span className="integrations__registry-count-dot" />

                            <span className="integrations__registry-count-text">
                                12 available
                            </span>
                        </div>
                    </div>

                    <div className="integrations__registry-body">
                        <div
                            className="integrations__platform-rail"
                            aria-hidden="true"
                        >
                            <div className="integrations__platform-rail-line" />

                            <div className="integrations__platform-rail-node">
                                <Cloud
                                    className="integrations__platform-rail-icon"
                                    size={15}
                                    strokeWidth={1.7}
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        <div className="integrations__groups">
                            {integrationGroups.map((group) => {
                                const Icon = group.icon;

                                return (
                                    <div
                                        className="integrations__group"
                                        key={group.id}
                                    >
                                        <div className="integrations__group-label">
                                            <Icon
                                                className="integrations__group-icon"
                                                size={16}
                                                strokeWidth={1.6}
                                                aria-hidden="true"
                                            />

                                            <span className="integrations__group-name">
                                                {group.name}
                                            </span>
                                        </div>

                                        <div className="integrations__items">
                                            {group.integrations.map((integration) => (
                                                <div
                                                    className="integrations__item"
                                                    key={integration.name}
                                                >
                                                    <div className="integrations__item-content">
                                                        <span className="integrations__item-name">
                                                            {integration.name}
                                                        </span>

                                                        <span className="integrations__item-detail">
                                                            {integration.detail}
                                                        </span>
                                                    </div>

                                                    <span
                                                        className="integrations__item-status"
                                                        aria-label="Available"
                                                    >
                                                        <span className="integrations__item-status-dot" />
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="integrations__registry-footer">
                        <div className="integrations__api-label">
                            <Braces
                                className="integrations__api-icon"
                                size={16}
                                strokeWidth={1.6}
                                aria-hidden="true"
                            />

                            <div className="integrations__api-copy">
                                <span className="integrations__api-title">
                                    Nexora API
                                </span>

                                <span className="integrations__api-description">
                                    Build your own integration.
                                </span>
                            </div>
                        </div>

                        <div className="integrations__api-options">
                            <span className="integrations__api-option">
                                REST API
                            </span>

                            <span className="integrations__api-separator">
                                /
                            </span>

                            <span className="integrations__api-option">
                                Webhooks
                            </span>

                            <span className="integrations__api-separator">
                                /
                            </span>

                            <span className="integrations__api-option">
                                Terraform
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}