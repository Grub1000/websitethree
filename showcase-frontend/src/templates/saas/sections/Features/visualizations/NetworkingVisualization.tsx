import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
} from "react";
import {
    Check,
    Globe2,
    Network,
    Server,
} from "lucide-react";
import "./NetworkingVisualization.css";

const regions = [
    {
        id: "iad1",
        city: "Virginia",
        latency: "18ms",
        instances: "3/3",
        status: "Primary",
    },
    {
        id: "fra1",
        city: "Frankfurt",
        latency: "92ms",
        instances: "2/2",
        status: "Healthy",
    },
    {
        id: "sin1",
        city: "Singapore",
        latency: "168ms",
        instances: "2/2",
        status: "Healthy",
    },
];

export default function NetworkingVisualization() {
    const visualizationRef = useRef<HTMLDivElement>(null);
    const [hasEnteredView, setHasEnteredView] = useState(false);

    /*
     * Networking can mount while the Features workspace is still
     * outside the viewport.
     *
     * IntersectionObserver prevents the routing sequence from
     * starting until a meaningful portion of this visualization
     * is actually visible.
     *
     * The observer disconnects after the first trigger because
     * this mount only needs to play once. Switching Features tabs
     * unmounts the component, so returning to Networking creates
     * a fresh observer and naturally replays the sequence.
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
            className={`networking-visualization${
                hasEnteredView
                    ? " networking-visualization--animate"
                    : ""
            }`}
            ref={visualizationRef}
        >
            <div className="networking-visualization__request">
                <div className="networking-visualization__request-source">
                    <div className="networking-visualization__request-icon">
                        <Globe2
                            className="networking-visualization__request-icon-svg"
                            size={16}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="networking-visualization__request-content">
                        <span className="networking-visualization__request-label">
                            Incoming request
                        </span>

                        <span className="networking-visualization__request-address">
                            api.nexora.dev
                        </span>
                    </div>
                </div>

                <div className="networking-visualization__request-meta">
                    <span className="networking-visualization__request-protocol">
                        HTTPS
                    </span>

                    <span className="networking-visualization__request-port">
                        :443
                    </span>
                </div>
            </div>

            <div className="networking-visualization__network">
                <div className="networking-visualization__entry">
                    <div className="networking-visualization__entry-node">
                        <Network
                            className="networking-visualization__entry-icon"
                            size={18}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="networking-visualization__entry-content">
                        <span className="networking-visualization__entry-name">
                            Edge gateway
                        </span>

                        <span className="networking-visualization__entry-detail">
                            Global anycast
                        </span>
                    </div>
                </div>

                <div className="networking-visualization__route">
                    <span className="networking-visualization__route-line" />

                    <span className="networking-visualization__route-packet networking-visualization__route-packet--1" />
                    <span className="networking-visualization__route-packet networking-visualization__route-packet--2" />
                    <span className="networking-visualization__route-packet networking-visualization__route-packet--3" />

                    <div className="networking-visualization__router">
                        <span className="networking-visualization__router-label">
                            Smart routing
                        </span>

                        <span className="networking-visualization__router-rule">
                            latency + health
                        </span>
                    </div>
                </div>

                <div className="networking-visualization__regions">
                    {regions.map((region, index) => (
                        <div
                            className={`networking-visualization__region networking-visualization__region--${index + 1}`}
                            key={region.id}
                        >
                            <div className="networking-visualization__region-route">
                                <span className="networking-visualization__region-route-line" />

                                <span
                                    className="networking-visualization__region-packet"
                                    style={
                                        {
                                            "--region-order": index,
                                        } as CSSProperties
                                    }
                                />
                            </div>

                            <div className="networking-visualization__region-card">
                                <div className="networking-visualization__region-header">
                                    <div className="networking-visualization__region-identity">
                                        <Server
                                            className="networking-visualization__region-icon"
                                            size={15}
                                            aria-hidden="true"
                                        />

                                        <div className="networking-visualization__region-name-group">
                                            <span className="networking-visualization__region-id">
                                                {region.id}
                                            </span>

                                            <span className="networking-visualization__region-city">
                                                {region.city}
                                            </span>
                                        </div>
                                    </div>

                                    <span
                                        className={`networking-visualization__region-status${
                                            index === 0
                                                ? " networking-visualization__region-status--primary"
                                                : ""
                                        }`}
                                    >
                                        {region.status}
                                    </span>
                                </div>

                                <div className="networking-visualization__region-metrics">
                                    <div className="networking-visualization__region-metric">
                                        <span className="networking-visualization__region-metric-label">
                                            Latency
                                        </span>

                                        <span className="networking-visualization__region-metric-value">
                                            {region.latency}
                                        </span>
                                    </div>

                                    <div className="networking-visualization__region-metric">
                                        <span className="networking-visualization__region-metric-label">
                                            Instances
                                        </span>

                                        <span className="networking-visualization__region-metric-value networking-visualization__region-metric-value--healthy">
                                            {region.instances}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="networking-visualization__decision">
                <div className="networking-visualization__decision-result">
                    <Check
                        className="networking-visualization__decision-icon"
                        size={14}
                        aria-hidden="true"
                    />

                    <div className="networking-visualization__decision-content">
                        <span className="networking-visualization__decision-label">
                            Request routed
                        </span>

                        <span className="networking-visualization__decision-detail">
                            Nearest healthy region selected automatically
                        </span>
                    </div>
                </div>

                <div className="networking-visualization__decision-route">
                    <span className="networking-visualization__decision-region">
                        iad1
                    </span>

                    <span className="networking-visualization__decision-latency">
                        18ms
                    </span>
                </div>
            </div>

            <div className="networking-visualization__summary">
                <div className="networking-visualization__summary-item">
                    <span className="networking-visualization__summary-label">
                        TLS
                    </span>

                    <span className="networking-visualization__summary-value">
                        1.3
                    </span>
                </div>

                <div className="networking-visualization__summary-item">
                    <span className="networking-visualization__summary-label">
                        Edge
                    </span>

                    <span className="networking-visualization__summary-value">
                        Global
                    </span>
                </div>

                <div className="networking-visualization__summary-item">
                    <span className="networking-visualization__summary-label">
                        Health
                    </span>

                    <span className="networking-visualization__summary-value networking-visualization__summary-value--healthy">
                        7/7
                    </span>
                </div>

                <div className="networking-visualization__summary-item">
                    <span className="networking-visualization__summary-label">
                        Route
                    </span>

                    <span className="networking-visualization__summary-value">
                        iad1
                    </span>
                </div>
            </div>
        </div>
    );
}