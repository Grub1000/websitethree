import {
    Check,
    Cloud,
    Server,
    Zap,
} from "lucide-react";
import "./Pricing.css";

const plans = [
    {
        id: "developer",
        name: "Developer",
        description: "For personal projects and early production workloads.",
        price: "$0",
        period: "forever",
        icon: Cloud,
        features: [
            "3 services",
            "1 production region",
            "100 GB bandwidth",
            "Community support",
        ],
        action: "Start building",
    },
    {
        id: "pro",
        name: "Pro",
        description: "For teams running production applications at scale.",
        price: "$29",
        period: "per developer / month",
        icon: Zap,
        features: [
            "Unlimited services",
            "Global deployments",
            "1 TB bandwidth",
            "Autoscaling and rollbacks",
            "Advanced observability",
            "Priority support",
        ],
        action: "Start with Pro",
        featured: true,
    },
    {
        id: "enterprise",
        name: "Enterprise",
        description: "For organizations with advanced infrastructure requirements.",
        price: "Custom",
        period: "usage-based",
        icon: Server,
        features: [
            "Dedicated infrastructure",
            "Private networking",
            "Custom deployment regions",
            "Advanced access controls",
            "Audit logs and compliance",
            "Dedicated support",
        ],
        action: "Contact sales",
    },
];

export default function Pricing() {
    return (
        <section
            className="pricing"
            id="pricing"
            aria-labelledby="pricing-heading"
        >
            <div className="pricing__container">
                <div className="pricing__header">
                    <span className="pricing__eyebrow">
                        Pricing
                    </span>

                    <h2
                        className="pricing__heading"
                        id="pricing-heading"
                    >
                        Start small. Scale when your infrastructure does.
                    </h2>

                    <p className="pricing__description">
                        Predictable platform pricing with infrastructure
                        usage billed separately. No contracts required
                        until your organization needs them.
                    </p>
                </div>

                <div className="pricing__table">
                    <div className="pricing__table-header">
                        <span className="pricing__table-header-label">
                            Platform plans
                        </span>

                        <span className="pricing__table-header-note">
                            Infrastructure usage billed separately
                        </span>
                    </div>

                    <div className="pricing__plans">
                        {plans.map((plan) => {
                            const Icon = plan.icon;

                            return (
                                <article
                                    className={`pricing__plan${plan.featured ? " pricing__plan--featured" : ""}`}
                                    key={plan.id}
                                >
                                    {plan.featured && (
                                        <span className="pricing__plan-recommended">
                                            Most popular
                                        </span>
                                    )}

                                    <div className="pricing__plan-header">
                                        <div className="pricing__plan-name-row">
                                            <Icon
                                                className="pricing__plan-icon"
                                                size={18}
                                                strokeWidth={1.6}
                                                aria-hidden="true"
                                            />

                                            <h3 className="pricing__plan-name">
                                                {plan.name}
                                            </h3>
                                        </div>

                                        <p className="pricing__plan-description">
                                            {plan.description}
                                        </p>
                                    </div>

                                    <div className="pricing__price">
                                        <span className="pricing__price-value">
                                            {plan.price}
                                        </span>

                                        <span className="pricing__price-period">
                                            {plan.period}
                                        </span>
                                    </div>

                                    <div className="pricing__features">
                                        {plan.features.map((feature) => (
                                            <div
                                                className="pricing__feature"
                                                key={feature}
                                            >
                                                <Check
                                                    className="pricing__feature-icon"
                                                    size={14}
                                                    strokeWidth={1.8}
                                                    aria-hidden="true"
                                                />

                                                <span className="pricing__feature-text">
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className={`pricing__action${plan.featured ? " pricing__action--primary" : ""}`}
                                        type="button"
                                    >
                                        {plan.action}
                                    </button>
                                </article>
                            );
                        })}
                    </div>

                    <div className="pricing__usage">
                        <div className="pricing__usage-copy">
                            <span className="pricing__usage-title">
                                Pay only for the infrastructure you use.
                            </span>

                            <span className="pricing__usage-description">
                                Compute, storage, and bandwidth scale
                                independently from your platform plan.
                            </span>
                        </div>

                        <div className="pricing__usage-rates">
                            <div className="pricing__usage-rate">
                                <span className="pricing__usage-rate-label">
                                    Compute
                                </span>

                                <span className="pricing__usage-rate-value">
                                    from $0.012/hr
                                </span>
                            </div>

                            <div className="pricing__usage-rate">
                                <span className="pricing__usage-rate-label">
                                    Storage
                                </span>

                                <span className="pricing__usage-rate-value">
                                    from $0.10/GB
                                </span>
                            </div>

                            <div className="pricing__usage-rate">
                                <span className="pricing__usage-rate-label">
                                    Bandwidth
                                </span>

                                <span className="pricing__usage-rate-value">
                                    from $0.08/GB
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}