import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
} from "react";
import {
    Check,
    Database,
    HardDrive,
} from "lucide-react";
import "./DatabasesVisualization.css";

const replicas = [
    {
        id: "replica-01",
        region: "iad1",
        lag: "12ms",
    },
    {
        id: "replica-02",
        region: "fra1",
        lag: "38ms",
    },
    {
        id: "replica-03",
        region: "sin1",
        lag: "61ms",
    },
];

export default function DatabasesVisualization() {
    const visualizationRef = useRef<HTMLDivElement>(null);
    const [hasEnteredView, setHasEnteredView] = useState(false);

    /*
     * The database replication sequence should only begin once
     * the visualization is actually visible.
     *
     * The observer disconnects after its first trigger because a
     * single component mount only needs one playback. Switching
     * Features tabs unmounts this component, so returning to the
     * Databases tab creates a new observer and replays it.
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
            className={`databases-visualization${
                hasEnteredView
                    ? " databases-visualization--animate"
                    : ""
            }`}
            ref={visualizationRef}
        >
            <div className="databases-visualization__header">
                <div className="databases-visualization__identity">
                    <div className="databases-visualization__identity-icon">
                        <Database
                            className="databases-visualization__identity-icon-svg"
                            size={16}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="databases-visualization__identity-content">
                        <span className="databases-visualization__identity-name">
                            production-db
                        </span>

                        <span className="databases-visualization__identity-engine">
                            MySQL 8.4 · managed
                        </span>
                    </div>
                </div>

                <div className="databases-visualization__health">
                    <span className="databases-visualization__health-dot" />

                    <span className="databases-visualization__health-text">
                        Available
                    </span>
                </div>
            </div>

            <div className="databases-visualization__metrics">
                <div className="databases-visualization__metric">
                    <span className="databases-visualization__metric-label">
                        Connections
                    </span>

                    <span className="databases-visualization__metric-value">
                        68 / 120
                    </span>
                </div>

                <div className="databases-visualization__metric">
                    <span className="databases-visualization__metric-label">
                        Storage
                    </span>

                    <span className="databases-visualization__metric-value">
                        42.8 GB
                    </span>
                </div>

                <div className="databases-visualization__metric">
                    <span className="databases-visualization__metric-label">
                        Queries
                    </span>

                    <span className="databases-visualization__metric-value">
                        8.2k/s
                    </span>
                </div>
            </div>

            <div className="databases-visualization__topology">
                <div className="databases-visualization__primary">
                    <div className="databases-visualization__primary-card">
                        <div className="databases-visualization__primary-header">
                            <div className="databases-visualization__primary-identity">
                                <Database
                                    className="databases-visualization__primary-icon"
                                    size={18}
                                    aria-hidden="true"
                                />

                                <div className="databases-visualization__primary-name-group">
                                    <span className="databases-visualization__primary-name">
                                        Primary
                                    </span>

                                    <span className="databases-visualization__primary-region">
                                        iad1
                                    </span>
                                </div>
                            </div>

                            <span className="databases-visualization__primary-badge">
                                Read / Write
                            </span>
                        </div>

                        <div className="databases-visualization__primary-stats">
                            <div className="databases-visualization__primary-stat">
                                <span className="databases-visualization__primary-stat-label">
                                    CPU
                                </span>

                                <span className="databases-visualization__primary-stat-value">
                                    38%
                                </span>
                            </div>

                            <div className="databases-visualization__primary-stat">
                                <span className="databases-visualization__primary-stat-label">
                                    Writes
                                </span>

                                <span className="databases-visualization__primary-stat-value">
                                    2.1k/s
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="databases-visualization__replication">
                    <span className="databases-visualization__replication-line" />

                    <div className="databases-visualization__replication-label">
                        <span className="databases-visualization__replication-label-text">
                            Replication
                        </span>

                        <span className="databases-visualization__replication-label-mode">
                            async
                        </span>
                    </div>

                    <span className="databases-visualization__replication-packet databases-visualization__replication-packet--1" />
                    <span className="databases-visualization__replication-packet databases-visualization__replication-packet--2" />
                    <span className="databases-visualization__replication-packet databases-visualization__replication-packet--3" />
                </div>

                <div className="databases-visualization__replicas">
                    {replicas.map((replica, index) => (
                        <div
                            className={`databases-visualization__replica databases-visualization__replica--${index + 1}`}
                            style={
                                {
                                    "--replica-order": index,
                                } as CSSProperties
                            }
                            key={replica.id}
                        >
                            <div className="databases-visualization__replica-header">
                                <div className="databases-visualization__replica-identity">
                                    <Database
                                        className="databases-visualization__replica-icon"
                                        size={14}
                                        aria-hidden="true"
                                    />

                                    <div className="databases-visualization__replica-name-group">
                                        <span className="databases-visualization__replica-name">
                                            {replica.id}
                                        </span>

                                        <span className="databases-visualization__replica-region">
                                            {replica.region}
                                        </span>
                                    </div>
                                </div>

                                <span className="databases-visualization__replica-health">
                                    Healthy
                                </span>
                            </div>

                            <div className="databases-visualization__replica-footer">
                                <span className="databases-visualization__replica-lag-label">
                                    Replication lag
                                </span>

                                <span className="databases-visualization__replica-lag-value">
                                    {replica.lag}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="databases-visualization__operations">
                <div className="databases-visualization__connections">
                    <div className="databases-visualization__operations-header">
                        <div className="databases-visualization__operations-title-group">
                            <span className="databases-visualization__operations-title">
                                Connection pool
                            </span>

                            <span className="databases-visualization__operations-detail">
                                68 active
                            </span>
                        </div>

                        <span className="databases-visualization__operations-value">
                            57%
                        </span>
                    </div>

                    <div className="databases-visualization__connection-track">
                        <span className="databases-visualization__connection-fill" />
                    </div>

                    <div className="databases-visualization__connection-scale">
                        <span className="databases-visualization__connection-scale-value">
                            0
                        </span>

                        <span className="databases-visualization__connection-scale-value">
                            120 max
                        </span>
                    </div>
                </div>

                <div className="databases-visualization__backup">
                    <div className="databases-visualization__backup-icon">
                        <HardDrive
                            className="databases-visualization__backup-icon-svg"
                            size={16}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="databases-visualization__backup-content">
                        <span className="databases-visualization__backup-title">
                            Automated backup
                        </span>

                        <span className="databases-visualization__backup-detail">
                            Snapshot completed · 14:45:02
                        </span>
                    </div>

                    <Check
                        className="databases-visualization__backup-check"
                        size={15}
                        aria-hidden="true"
                    />
                </div>
            </div>

            <div className="databases-visualization__summary">
                <div className="databases-visualization__summary-item">
                    <span className="databases-visualization__summary-label">
                        Primary
                    </span>

                    <span className="databases-visualization__summary-value">
                        iad1
                    </span>
                </div>

                <div className="databases-visualization__summary-item">
                    <span className="databases-visualization__summary-label">
                        Replicas
                    </span>

                    <span className="databases-visualization__summary-value databases-visualization__summary-value--healthy">
                        3 healthy
                    </span>
                </div>

                <div className="databases-visualization__summary-item">
                    <span className="databases-visualization__summary-label">
                        Max lag
                    </span>

                    <span className="databases-visualization__summary-value">
                        61ms
                    </span>
                </div>

                <div className="databases-visualization__summary-item">
                    <span className="databases-visualization__summary-label">
                        Backups
                    </span>

                    <span className="databases-visualization__summary-value databases-visualization__summary-value--healthy">
                        Current
                    </span>
                </div>
            </div>
        </div>
    );
}