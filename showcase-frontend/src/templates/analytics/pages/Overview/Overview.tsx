import "./Overview.css";


export default function Overview() {
    return (
        <section
            className="analytics-overview"
            aria-labelledby="analytics-overview-title"
        >
            <div className="analytics-overview__header">
                <div className="analytics-overview__heading">
                    <p className="analytics-overview__eyebrow">
                        MONDAY, OCTOBER 12, 2026
                    </p>

                    <h1
                        className="analytics-overview__title"
                        id="analytics-overview-title"
                    >
                        Overview
                    </h1>

                    <p className="analytics-overview__description">
                        Monitor your operations and financial performance
                        from one workspace.
                    </p>
                </div>
            </div>

            <div className="analytics-overview__placeholder">
                <p className="analytics-overview__placeholder-label">
                    DASHBOARD OVERVIEW
                </p>

                <p className="analytics-overview__placeholder-description">
                    Your operational metrics, financial insights, and
                    performance charts will appear here.
                </p>
            </div>
        </section>
    );
}