import{ 
    useEffect,
    useRef,
    useState,
    type CSSProperties } from "react";
import { Server } from "lucide-react";

import "./AutoscalingVisualization.css";






const trafficPoints = [
    18,
    21,
    19,
    24,
    28,
    31,
    38,
    46,
    53,
    61,
    68,
    74,
    71,
    66,
    63,
    58,
    54,
    51,
];

export default function AutoscalingVisualization() {
    
    const visualizationRef = useRef<HTMLDivElement>(null);
    const [hasEnteredView, setHasEnteredView] = useState(false);

    /*
     * Autoscaling is the default Features tab, so it can mount
     * long before the user actually reaches this section.
     *
     * IntersectionObserver waits until a meaningful portion of
     * the visualization enters the viewport before allowing the
     * CSS animation sequence to begin.
     *
     * Once triggered, the observer disconnects because this mount
     * only needs to play the sequence once.
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

    /*
     * Convert the traffic values into SVG coordinates.
     *
     * The SVG uses a 600 × 180 viewBox. Because the viewBox is
     * responsive, the graph can scale without recalculating its
     * dimensions for every viewport size.
     */
    const graphPoints = trafficPoints
        .map((value, index) => {
            const x =
                (index / (trafficPoints.length - 1)) * 600;

            /*
             * SVG Y coordinates increase downward.
             *
             * Subtracting the traffic value therefore makes
             * larger values appear higher on the graph.
             */
            const y = 160 - value * 1.7;

            return `${x},${y}`;
        })
        .join(" ");

    /*
     * The final traffic value is also used for the small endpoint
     * marker that appears after the graph finishes drawing.
     */
    const finalTrafficValue =
        trafficPoints[trafficPoints.length - 1];

    const finalTrafficY =
        160 - finalTrafficValue * 1.7;

    return (
        <div
            className={`autoscaling-visualization${
                hasEnteredView
                    ? " autoscaling-visualization--animate"
                    : ""
            }`}
            ref={visualizationRef}
        >
            <div className="autoscaling-visualization__summary">
                <div className="autoscaling-visualization__metric">
                    <span className="autoscaling-visualization__metric-label">
                        Requests
                    </span>

                    <span className="autoscaling-visualization__metric-value">
                        28.4k/min
                    </span>
                </div>

                <div className="autoscaling-visualization__metric">
                    <span className="autoscaling-visualization__metric-label">
                        CPU
                    </span>

                    <span className="autoscaling-visualization__metric-value">
                        61%
                    </span>
                </div>

                <div className="autoscaling-visualization__metric">
                    <span className="autoscaling-visualization__metric-label">
                        Instances
                    </span>

                    <span className="autoscaling-visualization__metric-value autoscaling-visualization__metric-value--active">
                        6
                    </span>
                </div>
            </div>

            <div className="autoscaling-visualization__chart">
                <div className="autoscaling-visualization__chart-header">
                    <div className="autoscaling-visualization__chart-title-group">
                        <span className="autoscaling-visualization__chart-title">
                            Request load
                        </span>

                        <span className="autoscaling-visualization__chart-range">
                            Last 15 minutes
                        </span>
                    </div>

                    <div className="autoscaling-visualization__threshold-key">
                        <span
                            className="autoscaling-visualization__threshold-key-line"
                            aria-hidden="true"
                        />

                        <span className="autoscaling-visualization__threshold-key-label">
                            Scale threshold
                        </span>
                    </div>
                </div>

                <div className="autoscaling-visualization__graph">
                    <svg
                        className="autoscaling-visualization__graph-svg"
                        viewBox="0 0 600 180"
                        preserveAspectRatio="none"
                        role="img"
                        aria-label="Request load rising above the autoscaling threshold"
                    >
                        {/*
                         * Horizontal guides provide enough structure for the
                         * graph to read like an operational monitoring panel
                         * without adding unnecessary chart labels.
                         */}
                        <line
                            className="autoscaling-visualization__graph-guide"
                            x1="0"
                            y1="40"
                            x2="600"
                            y2="40"
                        />

                        <line
                            className="autoscaling-visualization__graph-guide"
                            x1="0"
                            y1="90"
                            x2="600"
                            y2="90"
                        />

                        <line
                            className="autoscaling-visualization__graph-guide"
                            x1="0"
                            y1="140"
                            x2="600"
                            y2="140"
                        />

                        {/*
                         * The amber line represents the configured request
                         * threshold that causes additional compute capacity
                         * to be provisioned.
                         */}
                        <line
                            className="autoscaling-visualization__graph-threshold"
                            x1="0"
                            y1="72"
                            x2="600"
                            y2="72"
                        />

                        {/*
                         * pathLength normalizes the polyline length to 1.
                         *
                         * CSS can therefore animate stroke-dashoffset from
                         * 1 to 0 without JavaScript needing to measure the
                         * actual rendered SVG path length.
                         */}
                        <polyline
                            className="autoscaling-visualization__graph-line"
                            points={graphPoints}
                            pathLength="1"
                        />

                        {/*
                         * The endpoint appears once the graph has nearly
                         * completed. It gives the live edge of the metric
                         * a small amount of visual emphasis.
                         */}
                        <circle
                            className="autoscaling-visualization__graph-endpoint"
                            cx="600"
                            cy={finalTrafficY}
                            r="4"
                        />
                    </svg>
                </div>
            </div>

            <div className="autoscaling-visualization__scaling">
                <div className="autoscaling-visualization__scaling-header">
                    <div className="autoscaling-visualization__scaling-title-group">
                        <span className="autoscaling-visualization__scaling-title">
                            Compute capacity
                        </span>

                        <span className="autoscaling-visualization__scaling-range">
                            3 min / 8 max
                        </span>
                    </div>

                    <span className="autoscaling-visualization__scaling-status">
                        Scaled +3
                    </span>
                </div>

                <div className="autoscaling-visualization__instances">
                    {Array.from({ length: 6 }).map((_, index) => {
                        /*
                         * The first three instances represent the baseline
                         * compute capacity.
                         *
                         * Instances 4–6 represent capacity provisioned after
                         * the request threshold is exceeded.
                         */
                        const isAddedInstance = index >= 3;

                        return (
                            <div
                                className={`autoscaling-visualization__instance${
                                    isAddedInstance
                                        ? " autoscaling-visualization__instance--added"
                                        : ""
                                }`}
                                style={
                                    isAddedInstance
                                        ? {
                                            /*
                                             * React supplies only the sequence
                                             * number. CSS owns the animation.
                                             *
                                             * Instances 4–6 receive 0, 1, and 2,
                                             * allowing one reusable animation to
                                             * stagger all three entrances.
                                             */
                                            "--instance-order": index - 3,
                                        } as CSSProperties
                                        : undefined
                                }
                                key={index}
                            >
                                <Server
                                    className="autoscaling-visualization__instance-icon"
                                    size={16}
                                    aria-hidden="true"
                                />

                                <span className="autoscaling-visualization__instance-name">
                                    {`api-${index + 1}`}
                                </span>

                                <span className="autoscaling-visualization__instance-status">
                                    Healthy
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="autoscaling-visualization__event">
                    <span
                        className="autoscaling-visualization__event-dot"
                        aria-hidden="true"
                    />

                    <span className="autoscaling-visualization__event-time">
                        14:32:18
                    </span>

                    <span className="autoscaling-visualization__event-message">
                        Request threshold exceeded
                    </span>

                    <span className="autoscaling-visualization__event-result">
                        3 → 6 instances
                    </span>
                </div>
            </div>
        </div>
    );
}