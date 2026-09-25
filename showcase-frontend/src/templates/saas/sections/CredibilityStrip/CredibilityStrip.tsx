import {
    Activity,
    Globe2,
    Server,
} from "lucide-react";

import "./CredibilityStrip.css";

function CredibilityStrip() {
    return (
        <section
            className="credibility-strip"
            aria-labelledby="credibility-strip-title"
        >
            <div className="credibility-strip__container saas-container">

                <div className="credibility-strip__header">

                    <div className="credibility-strip__heading-group">
                        <span
                            className="credibility-strip__status-dot"
                            aria-hidden="true"
                        />

                        <h2
                            className="credibility-strip__title"
                            id="credibility-strip-title"
                        >
                            Trusted in production
                        </h2>
                    </div>

                    <p className="credibility-strip__supporting-text">
                        Infrastructure powering teams around the world
                    </p>

                </div>

                <div className="credibility-strip__companies">

                    <span className="credibility-strip__company">
                        NORTHSTAR
                    </span>

                    <span className="credibility-strip__company">
                        VERTEX
                    </span>

                    <span className="credibility-strip__company">
                        POLARIS
                    </span>

                    <span className="credibility-strip__company">
                        QUANTUM
                    </span>

                    <span className="credibility-strip__company">
                        AETHER
                    </span>

                </div>

                <div className="credibility-strip__metrics">

                    <div className="credibility-strip__metric">
                        <Activity
                            className="credibility-strip__metric-icon"
                            size={16}
                            aria-hidden="true"
                        />

                        <div className="credibility-strip__metric-content">
                            <strong className="credibility-strip__metric-value">
                                99.99%
                            </strong>

                            <span className="credibility-strip__metric-label">
                                Platform uptime
                            </span>
                        </div>
                    </div>

                    <div className="credibility-strip__metric">
                        <Globe2
                            className="credibility-strip__metric-icon"
                            size={16}
                            aria-hidden="true"
                        />

                        <div className="credibility-strip__metric-content">
                            <strong className="credibility-strip__metric-value">
                                12
                            </strong>

                            <span className="credibility-strip__metric-label">
                                Global regions
                            </span>
                        </div>
                    </div>

                    <div className="credibility-strip__metric">
                        <Server
                            className="credibility-strip__metric-icon"
                            size={16}
                            aria-hidden="true"
                        />

                        <div className="credibility-strip__metric-content">
                            <strong className="credibility-strip__metric-value">
                                4.8B
                            </strong>

                            <span className="credibility-strip__metric-label">
                                Requests / month
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default CredibilityStrip;