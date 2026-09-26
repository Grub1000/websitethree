import {
    useEffect,
    useRef,
    useState,
} from "react";
import {
    AlertTriangle,
    Check,
    GitCommitHorizontal,
    RotateCcw,
} from "lucide-react";
import "./RollbacksVisualization.css";

const rollbackEvents = [
    {
        time: "14:51:02",
        message: "v2.8.1 deployed to production",
        state: "neutral",
    },
    {
        time: "14:51:08",
        message: "Health check failures detected",
        state: "warning",
    },
    {
        time: "14:51:11",
        message: "Rollback policy triggered",
        state: "warning",
    },
    {
        time: "14:51:18",
        message: "v2.8.0 restored across 3 instances",
        state: "healthy",
    },
    {
        time: "14:51:22",
        message: "Production health checks passed",
        state: "healthy",
    },
];

export default function RollbacksVisualization() {
    const visualizationRef = useRef<HTMLDivElement>(null);
    const [hasEnteredView, setHasEnteredView] = useState(false);

    /*
     * The recovery sequence should be visible to the user rather
     * than completing while the Features section is off-screen.
     *
     * The observer disconnects after the first trigger because
     * this component only needs one playback per mount. Switching
     * Features tabs unmounts Rollbacks, so returning to the tab
     * creates a fresh observer and naturally replays the sequence.
     */
    useEffect(() => {
        const visualization = visualizationRef.current;

        if (!visualization) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }

                setHasEnteredView(true);
                observer.disconnect();
            },
            {
                threshold: 0.3,
            }
        );

        observer.observe(visualization);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            className={`rollbacks-visualization${
                hasEnteredView
                    ? " rollbacks-visualization--animate"
                    : ""
            }`}
            ref={visualizationRef}
        >
            <div className="rollbacks-visualization__header">
                <div className="rollbacks-visualization__identity">
                    <div className="rollbacks-visualization__identity-icon">
                        <RotateCcw
                            className="rollbacks-visualization__identity-icon-svg"
                            size={16}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="rollbacks-visualization__identity-content">
                        <span className="rollbacks-visualization__identity-name">
                            production-api
                        </span>

                        <span className="rollbacks-visualization__identity-detail">
                            Automatic rollback policy
                        </span>
                    </div>
                </div>

                <div className="rollbacks-visualization__header-status">
                    <span className="rollbacks-visualization__header-status-dot" />

                    <span className="rollbacks-visualization__header-status-text">
                        Recovered
                    </span>
                </div>
            </div>

            <div className="rollbacks-visualization__release-comparison">
                <div className="rollbacks-visualization__release rollbacks-visualization__release--failed">
                    <div className="rollbacks-visualization__release-header">
                        <div className="rollbacks-visualization__release-version-group">
                            <span className="rollbacks-visualization__release-label">
                                Failed release
                            </span>

                            <span className="rollbacks-visualization__release-version">
                                v2.8.1
                            </span>
                        </div>

                        <div className="rollbacks-visualization__release-state rollbacks-visualization__release-state--failed">
                            <AlertTriangle
                                className="rollbacks-visualization__release-state-icon"
                                size={12}
                                aria-hidden="true"
                            />

                            <span className="rollbacks-visualization__release-state-text">
                                Unhealthy
                            </span>
                        </div>
                    </div>

                    <div className="rollbacks-visualization__commit">
                        <GitCommitHorizontal
                            className="rollbacks-visualization__commit-icon"
                            size={14}
                            aria-hidden="true"
                        />

                        <span className="rollbacks-visualization__commit-hash">
                            d71ac42
                        </span>

                        <span className="rollbacks-visualization__commit-message">
                            feat: update payment workflow
                        </span>
                    </div>

                    <div className="rollbacks-visualization__release-metrics">
                        <div className="rollbacks-visualization__release-metric">
                            <span className="rollbacks-visualization__release-metric-label">
                                Error rate
                            </span>

                            <span className="rollbacks-visualization__release-metric-value rollbacks-visualization__release-metric-value--failed">
                                12.8%
                            </span>
                        </div>

                        <div className="rollbacks-visualization__release-metric">
                            <span className="rollbacks-visualization__release-metric-label">
                                Healthy
                            </span>

                            <span className="rollbacks-visualization__release-metric-value rollbacks-visualization__release-metric-value--failed">
                                1 / 3
                            </span>
                        </div>
                    </div>
                </div>

                <div className="rollbacks-visualization__rollback-path">
                    <span className="rollbacks-visualization__rollback-line">
                        <span className="rollbacks-visualization__rollback-line-fill" />
                    </span>

                    <div className="rollbacks-visualization__rollback-action">
                        <RotateCcw
                            className="rollbacks-visualization__rollback-action-icon"
                            size={15}
                            aria-hidden="true"
                        />

                        <span className="rollbacks-visualization__rollback-action-text">
                            Rollback
                        </span>
                    </div>
                </div>

                <div className="rollbacks-visualization__release rollbacks-visualization__release--restored">
                    <div className="rollbacks-visualization__release-header">
                        <div className="rollbacks-visualization__release-version-group">
                            <span className="rollbacks-visualization__release-label">
                                Previous release
                            </span>

                            <span className="rollbacks-visualization__release-version">
                                v2.8.0
                            </span>
                        </div>

                        <div className="rollbacks-visualization__release-state rollbacks-visualization__release-state--healthy">
                            <Check
                                className="rollbacks-visualization__release-state-icon"
                                size={12}
                                aria-hidden="true"
                            />

                            <span className="rollbacks-visualization__release-state-text">
                                Healthy
                            </span>
                        </div>
                    </div>

                    <div className="rollbacks-visualization__commit">
                        <GitCommitHorizontal
                            className="rollbacks-visualization__commit-icon"
                            size={14}
                            aria-hidden="true"
                        />

                        <span className="rollbacks-visualization__commit-hash">
                            a84fc91
                        </span>

                        <span className="rollbacks-visualization__commit-message">
                            fix: validate checkout state
                        </span>
                    </div>

                    <div className="rollbacks-visualization__release-metrics">
                        <div className="rollbacks-visualization__release-metric">
                            <span className="rollbacks-visualization__release-metric-label">
                                Error rate
                            </span>

                            <span className="rollbacks-visualization__release-metric-value rollbacks-visualization__release-metric-value--healthy">
                                0.08%
                            </span>
                        </div>

                        <div className="rollbacks-visualization__release-metric">
                            <span className="rollbacks-visualization__release-metric-label">
                                Healthy
                            </span>

                            <span className="rollbacks-visualization__release-metric-value rollbacks-visualization__release-metric-value--healthy">
                                3 / 3
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rollbacks-visualization__traffic">
                <div className="rollbacks-visualization__traffic-header">
                    <div className="rollbacks-visualization__traffic-title-group">
                        <span className="rollbacks-visualization__traffic-title">
                            Production traffic
                        </span>

                        <span className="rollbacks-visualization__traffic-detail">
                            Automatic recovery
                        </span>
                    </div>

                    <span className="rollbacks-visualization__traffic-value">
                        100%
                    </span>
                </div>

                <div className="rollbacks-visualization__traffic-track">
                    <span className="rollbacks-visualization__traffic-failed" />
                    <span className="rollbacks-visualization__traffic-restored" />
                </div>

                <div className="rollbacks-visualization__traffic-labels">
                    <span className="rollbacks-visualization__traffic-label">
                        v2.8.1
                    </span>

                    <span className="rollbacks-visualization__traffic-label rollbacks-visualization__traffic-label--restored">
                        v2.8.0 restored
                    </span>
                </div>
            </div>

            <div className="rollbacks-visualization__timeline">
                <div className="rollbacks-visualization__timeline-header">
                    <span className="rollbacks-visualization__timeline-title">
                        Recovery timeline
                    </span>

                    <span className="rollbacks-visualization__timeline-duration">
                        20s total
                    </span>
                </div>

                <div className="rollbacks-visualization__events">
                    {rollbackEvents.map((event, index) => (
                        <div
                            className={`rollbacks-visualization__event rollbacks-visualization__event--${index + 1}`}
                            key={`${event.time}-${event.message}`}
                        >
                            <span className="rollbacks-visualization__event-time">
                                {event.time}
                            </span>

                            <span
                                className={`rollbacks-visualization__event-dot rollbacks-visualization__event-dot--${event.state}`}
                            />

                            <span className="rollbacks-visualization__event-message">
                                {event.message}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rollbacks-visualization__result">
                <div className="rollbacks-visualization__result-status">
                    <Check
                        className="rollbacks-visualization__result-icon"
                        size={15}
                        aria-hidden="true"
                    />

                    <div className="rollbacks-visualization__result-content">
                        <span className="rollbacks-visualization__result-title">
                            Rollback completed
                        </span>

                        <span className="rollbacks-visualization__result-detail">
                            Production restored without manual intervention
                        </span>
                    </div>
                </div>

                <div className="rollbacks-visualization__result-metrics">
                    <div className="rollbacks-visualization__result-metric">
                        <span className="rollbacks-visualization__result-metric-label">
                            Recovery
                        </span>

                        <span className="rollbacks-visualization__result-metric-value">
                            20s
                        </span>
                    </div>

                    <div className="rollbacks-visualization__result-metric">
                        <span className="rollbacks-visualization__result-metric-label">
                            Health
                        </span>

                        <span className="rollbacks-visualization__result-metric-value rollbacks-visualization__result-metric-value--healthy">
                            3/3
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}