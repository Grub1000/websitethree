import {
    ArrowRight,
    Check,
    Cloud,
    Quote,
} from "lucide-react";
import "./Testimonials.css";

const customerResults = [
    {
        id: "deploy-time",
        value: "14 min",
        label: "to first production deploy",
    },
    {
        id: "regions",
        value: "6",
        label: "production regions",
    },
    {
        id: "uptime",
        value: "99.99%",
        label: "application uptime",
    },
];

export default function Testimonials() {
    return (
        <section
            className="testimonials"
            aria-labelledby="testimonials-heading"
        >
            <div className="testimonials__container">
                <div className="testimonials__header">
                    <span className="testimonials__eyebrow">
                        Built for shipping
                    </span>

                    <h2
                        className="testimonials__heading"
                        id="testimonials-heading"
                    >
                        Less infrastructure work. More product work.
                    </h2>

                    <p className="testimonials__description">
                        Teams use Nexora to move infrastructure concerns
                        out of the critical path without giving up the
                        visibility they need in production.
                    </p>
                </div>

                <div className="testimonials__story">
                    <article className="testimonials__quote">
                        <div className="testimonials__quote-header">
                            <Quote
                                className="testimonials__quote-icon"
                                size={22}
                                strokeWidth={1.5}
                                aria-hidden="true"
                            />

                            <span className="testimonials__quote-label">
                                Customer story
                            </span>
                        </div>

                        <blockquote className="testimonials__blockquote">
                            “We stopped treating every deployment like
                            an infrastructure project. Our developers
                            push code, Nexora handles the operational
                            layer, and we still have complete visibility
                            when something changes in production.”
                        </blockquote>

                        <footer className="testimonials__author">
                            <div
                                className="testimonials__author-mark"
                                aria-hidden="true"
                            >
                                AK
                            </div>

                            <div className="testimonials__author-copy">
                                <cite className="testimonials__author-name">
                                    Alex Kim
                                </cite>

                                <span className="testimonials__author-role">
                                    VP of Engineering · Meridian
                                </span>
                            </div>
                        </footer>
                    </article>

                    <aside
                        className="testimonials__customer"
                        aria-label="Meridian deployment results"
                    >
                        <div className="testimonials__customer-header">
                            <div className="testimonials__customer-brand">
                                <Cloud
                                    className="testimonials__customer-brand-icon"
                                    size={18}
                                    strokeWidth={1.6}
                                    aria-hidden="true"
                                />

                                <span className="testimonials__customer-name">
                                    Meridian
                                </span>
                            </div>

                            <div className="testimonials__customer-status">
                                <span className="testimonials__customer-status-dot" />

                                <span className="testimonials__customer-status-text">
                                    Production
                                </span>
                            </div>
                        </div>

                        <div className="testimonials__results">
                            {customerResults.map((result) => (
                                <div
                                    className="testimonials__result"
                                    key={result.id}
                                >
                                    <span className="testimonials__result-value">
                                        {result.value}
                                    </span>

                                    <span className="testimonials__result-label">
                                        {result.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="testimonials__customer-details">
                            <div className="testimonials__customer-detail">
                                <Check
                                    className="testimonials__customer-detail-icon"
                                    size={14}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <span className="testimonials__customer-detail-text">
                                    Global production workloads
                                </span>
                            </div>

                            <div className="testimonials__customer-detail">
                                <Check
                                    className="testimonials__customer-detail-icon"
                                    size={14}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <span className="testimonials__customer-detail-text">
                                    Automatic scaling and recovery
                                </span>
                            </div>

                            <div className="testimonials__customer-detail">
                                <Check
                                    className="testimonials__customer-detail-icon"
                                    size={14}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <span className="testimonials__customer-detail-text">
                                    Centralized observability
                                </span>
                            </div>
                        </div>

                        <div className="testimonials__customer-footer">
                            <span className="testimonials__customer-footer-text">
                                Running on Nexora since 2025
                            </span>

                            <ArrowRight
                                className="testimonials__customer-footer-icon"
                                size={15}
                                strokeWidth={1.6}
                                aria-hidden="true"
                            />
                        </div>
                    </aside>
                </div>

                <div className="testimonials__proof">
                    <span className="testimonials__proof-label">
                        Trusted across the stack
                    </span>

                    <div className="testimonials__proof-companies">
                        <span className="testimonials__proof-company">
                            Meridian
                        </span>

                        <span className="testimonials__proof-company">
                            Northstar
                        </span>

                        <span className="testimonials__proof-company">
                            Vertex
                        </span>

                        <span className="testimonials__proof-company">
                            Axiom
                        </span>

                        <span className="testimonials__proof-company">
                            Forge
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}