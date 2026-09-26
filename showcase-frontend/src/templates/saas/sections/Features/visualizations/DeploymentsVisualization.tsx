import { useEffect, useRef, useState } from "react";
import { Check, GitCommitHorizontal } from "lucide-react";
import "./DeploymentsVisualization.css";

const deploymentStages = [
    {
        name: "Build",
        duration: "18.4s",
    },
    {
        name: "Deploy",
        duration: "8.2s",
    },
    {
        name: "Verify",
        duration: "4.1s",
    },
    {
        name: "Live",
        duration: "32s",
    },
];

const deploymentLogs = [
    {
        time: "14:42:03",
        message: "Cloning repository...",
    },
    {
        time: "14:42:05",
        message: "Installing dependencies...",
    },
    {
        time: "14:42:11",
        message: "Building application...",
    },
    {
        time: "14:42:21",
        message: "Deploying 3 instances...",
    },
    {
        time: "14:42:28",
        message: "Health checks passed",
    },
    {
        time: "14:42:31",
        message: "Deployment live",
    },
];

export default function DeploymentsVisualization() {
    const visualizationRef = useRef<HTMLDivElement>(null);
    const [hasEnteredView, setHasEnteredView] = useState(false);

    /*
     * Feature visualizations can mount before the user has actually
     * reached the visible workspace.
     *
     * Waiting for a meaningful portion of the component to enter the
     * viewport prevents the deployment sequence from completing while
     * it is still off-screen.
     *
     * The observer disconnects after the first trigger because each
     * component mount only needs to play its sequence once. Switching
     * tabs unmounts this component, so returning to Deployments creates
     * a new observer and naturally replays the sequence.
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
            className={`deployments-visualization${
                hasEnteredView
                    ? " deployments-visualization--animate"
                    : ""
            }`}
            ref={visualizationRef}
        >
            <div className="deployments-visualization__release">
                <div className="deployments-visualization__release-content">
                    <span className="deployments-visualization__eyebrow">
                        Deployment #1842
                    </span>

                    <div className="deployments-visualization__application">
                        <span className="deployments-visualization__application-name">
                            production-api
                        </span>

                        <div className="deployments-visualization__commit">
                            <GitCommitHorizontal
                                className="deployments-visualization__commit-icon"
                                size={14}
                                aria-hidden="true"
                            />

                            <span className="deployments-visualization__commit-branch">
                                main
                            </span>

                            <span className="deployments-visualization__commit-separator">
                                /
                            </span>

                            <span className="deployments-visualization__commit-hash">
                                a84fc91
                            </span>
                        </div>
                    </div>

                    <span className="deployments-visualization__commit-message">
                        feat: add checkout validation
                    </span>
                </div>

                <div className="deployments-visualization__release-status">
                    <span className="deployments-visualization__release-status-dot" />

                    <span className="deployments-visualization__release-status-text">
                        Live
                    </span>
                </div>
            </div>

            <div className="deployments-visualization__pipeline">
                {deploymentStages.map((stage, index) => (
                    <div
                        className="deployments-visualization__stage"
                        key={stage.name}
                    >
                        <div className="deployments-visualization__stage-track">
                            <div className="deployments-visualization__stage-node">
                                <Check
                                    className="deployments-visualization__stage-check"
                                    size={12}
                                    aria-hidden="true"
                                />
                            </div>

                            {index < deploymentStages.length - 1 && (
                                <div className="deployments-visualization__connector">
                                    <span
                                        className={`deployments-visualization__connector-fill deployments-visualization__connector-fill--${index + 1}`}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="deployments-visualization__stage-content">
                            <span className="deployments-visualization__stage-name">
                                {stage.name}
                            </span>

                            <span className="deployments-visualization__stage-duration">
                                {stage.duration}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="deployments-visualization__terminal">
                <div className="deployments-visualization__terminal-header">
                    <div className="deployments-visualization__terminal-title-group">
                        <span className="deployments-visualization__terminal-title">
                            Deployment log
                        </span>

                        <span className="deployments-visualization__terminal-environment">
                            production
                        </span>
                    </div>

                    <span className="deployments-visualization__terminal-runtime">
                        iad1
                    </span>
                </div>

                <div className="deployments-visualization__logs">
                    {deploymentLogs.map((log, index) => (
                        <div
                            className={`deployments-visualization__log deployments-visualization__log--${index + 1}`}
                            key={`${log.time}-${log.message}`}
                        >
                            <span className="deployments-visualization__log-time">
                                {log.time}
                            </span>

                            <span className="deployments-visualization__log-message">
                                {log.message}
                            </span>

                            <Check
                                className="deployments-visualization__log-check"
                                size={12}
                                aria-hidden="true"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="deployments-visualization__summary">
                <div className="deployments-visualization__summary-item">
                    <span className="deployments-visualization__summary-label">
                        Commit
                    </span>

                    <span className="deployments-visualization__summary-value">
                        a84fc91
                    </span>
                </div>

                <div className="deployments-visualization__summary-item">
                    <span className="deployments-visualization__summary-label">
                        Duration
                    </span>

                    <span className="deployments-visualization__summary-value">
                        32s
                    </span>
                </div>

                <div className="deployments-visualization__summary-item">
                    <span className="deployments-visualization__summary-label">
                        Instances
                    </span>

                    <span className="deployments-visualization__summary-value deployments-visualization__summary-value--healthy">
                        3/3 healthy
                    </span>
                </div>
            </div>
        </div>
    );
}