import { useEffect, useRef, useState } from "react";
import {
    Activity,
    Check,
    CircleAlert,
} from "lucide-react";
import "./ObservabilityVisualization.css";

const latencyPoints = [
    38, 42, 39, 46, 51, 48, 56, 62, 58, 71, 67, 74, 69, 63, 59, 54, 57, 52,
];

const logEntries = [
    {
        time: "14:44:08",
        level: "INFO",
        message: "GET /api/orders",
    },
    {
        time: "14:44:09",
        level: "INFO",
        message: "database query completed",
    },
    {
        time: "14:44:10",
        level: "WARN",
        message: "latency threshold exceeded",
    },
    {
        time: "14:44:11",
        level: "INFO",
        message: "request recovered",
    },
];

export default function ObservabilityVisualization() {
    const visualizationRef = useRef<HTMLDivElement>(null);
    const [hasEnteredView, setHasEnteredView] = useState(false);

    /*
     * The visualization waits until it is actually visible before
     * starting its monitoring sequence.
     *
     * Like the other Features visualizations, switching tabs
     * unmounts this component. Returning to Observability creates
     * a fresh observer and replays the sequence.
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

    const graphPoints = latencyPoints
        .map((value, index) => {
            const x = (index / (latencyPoints.length - 1)) * 600;
            const y = 150 - value;

            return `${x},${y}`;
        })
        .join(" ");

    return (
        <div
            className={`observability-visualization${
                hasEnteredView
                    ? " observability-visualization--animate"
                    : ""
            }`}
            ref={visualizationRef}
        >
            <div className="observability-visualization__status">
                <div className="observability-visualization__status-service">
                    <div className="observability-visualization__status-icon">
                        <Activity
                            className="observability-visualization__status-icon-svg"
                            size={16}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="observability-visualization__status-content">
                        <span className="observability-visualization__status-name">
                            production-api
                        </span>

                        <span className="observability-visualization__status-region">
                            us-east · iad1
                        </span>
                    </div>
                </div>

                <div className="observability-visualization__status-health">
                    <span className="observability-visualization__status-dot" />

                    <span className="observability-visualization__status-health-text">
                        Healthy
                    </span>
                </div>
            </div>

            <div className="observability-visualization__metrics">
                <div className="observability-visualization__metric">
                    <span className="observability-visualization__metric-label">
                        Requests
                    </span>

                    <span className="observability-visualization__metric-value">
                        28.4k
                    </span>

                    <span className="observability-visualization__metric-detail">
                        / min
                    </span>
                </div>

                <div className="observability-visualization__metric">
                    <span className="observability-visualization__metric-label">
                        P95 latency
                    </span>

                    <span className="observability-visualization__metric-value">
                        84ms
                    </span>

                    <span className="observability-visualization__metric-detail observability-visualization__metric-detail--healthy">
                        -12%
                    </span>
                </div>

                <div className="observability-visualization__metric">
                    <span className="observability-visualization__metric-label">
                        Error rate
                    </span>

                    <span className="observability-visualization__metric-value">
                        0.08%
                    </span>

                    <span className="observability-visualization__metric-detail observability-visualization__metric-detail--healthy">
                        Normal
                    </span>
                </div>
            </div>

            <div className="observability-visualization__workspace">
                <div className="observability-visualization__latency">
                    <div className="observability-visualization__panel-header">
                        <div className="observability-visualization__panel-title-group">
                            <span className="observability-visualization__panel-title">
                                Request latency
                            </span>

                            <span className="observability-visualization__panel-subtitle">
                                P95 · last 15 min
                            </span>
                        </div>

                        <span className="observability-visualization__panel-value">
                            84ms
                        </span>
                    </div>

                    <div className="observability-visualization__graph">
                        <svg
                            className="observability-visualization__graph-svg"
                            viewBox="0 0 600 160"
                            preserveAspectRatio="none"
                            role="img"
                            aria-label="Request latency over the last fifteen minutes"
                        >
                            <line
                                className="observability-visualization__graph-guide"
                                x1="0"
                                y1="35"
                                x2="600"
                                y2="35"
                            />

                            <line
                                className="observability-visualization__graph-guide"
                                x1="0"
                                y1="80"
                                x2="600"
                                y2="80"
                            />

                            <line
                                className="observability-visualization__graph-guide"
                                x1="0"
                                y1="125"
                                x2="600"
                                y2="125"
                            />

                            <polyline
                                className="observability-visualization__graph-line"
                                points={graphPoints}
                                pathLength="1"
                            />
                        </svg>
                    </div>
                </div>

                <div className="observability-visualization__trace">
                    <div className="observability-visualization__panel-header">
                        <div className="observability-visualization__panel-title-group">
                            <span className="observability-visualization__panel-title">
                                Request trace
                            </span>

                            <span className="observability-visualization__panel-subtitle">
                                req_8f31a
                            </span>
                        </div>

                        <span className="observability-visualization__trace-duration">
                            84ms
                        </span>
                    </div>

                    <div className="observability-visualization__trace-list">
                        <div className="observability-visualization__trace-row observability-visualization__trace-row--1">
                            <span className="observability-visualization__trace-name">
                                API
                            </span>

                            <div className="observability-visualization__trace-track">
                                <span className="observability-visualization__trace-bar observability-visualization__trace-bar--api" />
                            </div>

                            <span className="observability-visualization__trace-time">
                                84ms
                            </span>
                        </div>

                        <div className="observability-visualization__trace-row observability-visualization__trace-row--2">
                            <span className="observability-visualization__trace-name">
                                Auth
                            </span>

                            <div className="observability-visualization__trace-track">
                                <span className="observability-visualization__trace-bar observability-visualization__trace-bar--auth" />
                            </div>

                            <span className="observability-visualization__trace-time">
                                12ms
                            </span>
                        </div>

                        <div className="observability-visualization__trace-row observability-visualization__trace-row--3">
                            <span className="observability-visualization__trace-name">
                                MySQL
                            </span>

                            <div className="observability-visualization__trace-track">
                                <span className="observability-visualization__trace-bar observability-visualization__trace-bar--database" />
                            </div>

                            <span className="observability-visualization__trace-time">
                                31ms
                            </span>
                        </div>

                        <div className="observability-visualization__trace-row observability-visualization__trace-row--4">
                            <span className="observability-visualization__trace-name">
                                Cache
                            </span>

                            <div className="observability-visualization__trace-track">
                                <span className="observability-visualization__trace-bar observability-visualization__trace-bar--cache" />
                            </div>

                            <span className="observability-visualization__trace-time">
                                8ms
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="observability-visualization__logs">
                <div className="observability-visualization__logs-header">
                    <div className="observability-visualization__logs-title-group">
                        <span className="observability-visualization__logs-title">
                            Live logs
                        </span>

                        <span className="observability-visualization__logs-streaming">
                            <span className="observability-visualization__logs-streaming-dot" />
                            Streaming
                        </span>
                    </div>

                    <span className="observability-visualization__logs-source">
                        production-api
                    </span>
                </div>

                <div className="observability-visualization__logs-list">
                    {logEntries.map((log, index) => (
                        <div
                            className={`observability-visualization__log observability-visualization__log--${index + 1}`}
                            key={`${log.time}-${log.message}`}
                        >
                            <span className="observability-visualization__log-time">
                                {log.time}
                            </span>

                            <span
                                className={`observability-visualization__log-level observability-visualization__log-level--${log.level.toLowerCase()}`}
                            >
                                {log.level}
                            </span>

                            <span className="observability-visualization__log-message">
                                {log.message}
                            </span>

                            {log.level === "WARN" ? (
                                <CircleAlert
                                    className="observability-visualization__log-icon observability-visualization__log-icon--warning"
                                    size={12}
                                    aria-hidden="true"
                                />
                            ) : (
                                <Check
                                    className="observability-visualization__log-icon"
                                    size={12}
                                    aria-hidden="true"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}