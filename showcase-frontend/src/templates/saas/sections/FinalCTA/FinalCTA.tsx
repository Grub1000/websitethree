import {
    ArrowRight,
    Check,
    ChevronRight,
    Terminal,
} from "lucide-react";
import "./FinalCTA.css";

const deploymentBenefits = [
    "No credit card required",
    "Deploy in minutes",
    "Scale when you're ready",
];

export default function FinalCTA() {
    return (
        <section
            className="final-cta"
            id="get-started"
            aria-labelledby="final-cta-heading"
        >
            <div className="final-cta__container">
                <div className="final-cta__content">
                    <span className="final-cta__eyebrow">
                        Ready to deploy?
                    </span>

                    <h2
                        className="final-cta__heading"
                        id="final-cta-heading"
                    >
                        Your code is ready.
                        <span className="final-cta__heading-accent">
                            Your infrastructure should be too.
                        </span>
                    </h2>

                    <p className="final-cta__description">
                        Connect your repository and ship to production
                        without spending another sprint configuring
                        infrastructure.
                    </p>

                    <div className="final-cta__actions">
                        {/*
                         * The primary action points back to the product's
                         * conceptual onboarding route. Because Nexora is a
                         * frontend demonstration rather than a real service,
                         * this remains a button until an actual destination
                         * exists instead of pretending a dead link works.
                         */}
                        <button
                            className="final-cta__action final-cta__action--primary"
                            type="button"
                        >
                            <span className="final-cta__action-text">
                                Start deploying
                            </span>

                            <ArrowRight
                                className="final-cta__action-icon"
                                size={16}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />
                        </button>

                        <button
                            className="final-cta__action final-cta__action--secondary"
                            type="button"
                        >
                            <span className="final-cta__action-text">
                                Read the docs
                            </span>

                            <ChevronRight
                                className="final-cta__action-icon"
                                size={16}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />
                        </button>
                    </div>

                    <div className="final-cta__benefits">
                        {deploymentBenefits.map((benefit) => (
                            <div
                                className="final-cta__benefit"
                                key={benefit}
                            >
                                <Check
                                    className="final-cta__benefit-icon"
                                    size={13}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <span className="final-cta__benefit-text">
                                    {benefit}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="final-cta__command">
                    <div className="final-cta__command-header">
                        <div className="final-cta__command-title">
                            <Terminal
                                className="final-cta__command-title-icon"
                                size={14}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />

                            <span className="final-cta__command-title-text">
                                nexora-cli
                            </span>
                        </div>

                        <span className="final-cta__command-status">
                            production
                        </span>
                    </div>

                    <div className="final-cta__command-body">
                        <span
                            className="final-cta__command-prompt"
                            aria-hidden="true"
                        >
                            $
                        </span>

                        <code className="final-cta__command-code">
                            nexora deploy --production
                        </code>
                    </div>
                </div>
            </div>
        </section>
    );
}