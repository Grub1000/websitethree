import {
    CheckCircle2,
    CircleDollarSign,
    PackageCheck,
    TrendingUp,
} from "lucide-react";

import MetricCard from "../../components/data-display/MetricCard/MetricCard";
import { overviewData } from "../../data/overviewData";
import { calculateOverviewMetrics } from "../../utils/overviewMetrics";

import "./Overview.css";


/*
 * The dataset currently contains seven fixed demonstration days.
 *
 * calculateOverviewMetrics() derives all four values from the same
 * records. Later, the date filter will select which records to pass in.
 */
export default function Overview() {
    const metrics = calculateOverviewMetrics(overviewData);

    /*
     * Intl.NumberFormat is a native JavaScript internationalization API.
     *
     * It handles currency symbols, thousands separators, and decimals
     * without manually building formatted strings.
     */
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });

    const numberFormatter = new Intl.NumberFormat("en-US");

    return (
        <section
            className="analytics-overview"
            aria-labelledby="analytics-overview-title"
        >
            <header className="analytics-overview__header">
                <div className="analytics-overview__heading">
                    <p className="analytics-overview__eyebrow">
                        OPERATIONS INTELLIGENCE
                    </p>

                    <h1
                        className="analytics-overview__title"
                        id="analytics-overview-title"
                    >
                        Overview
                    </h1>

                    <p className="analytics-overview__description">
                        Monitor operational efficiency and financial
                        performance from one workspace.
                    </p>
                </div>
            </header>

            <div className="analytics-overview__metrics">
                <MetricCard
                    label="Operating Profit"
                    value={currencyFormatter.format(metrics.netRevenue)}
                    description="Revenue after operating expenses"
                    icon={CircleDollarSign}
                />

                <MetricCard
                    label="Orders Processed"
                    value={numberFormatter.format(metrics.ordersProcessed)}
                    description="Successfully fulfilled orders"
                    icon={PackageCheck}
                />

                <MetricCard
                    label="Operating Margin"
                    value={`${metrics.operatingMargin.toFixed(1)}%`}
                    description="Operating profit as a share of revenue"
                    icon={TrendingUp}
                />

                <MetricCard
                    label="Fulfillment Rate"
                    value={`${metrics.fulfillmentRate.toFixed(1)}%`}
                    description="Percentage of received orders fulfilled"
                    icon={CheckCircle2}
                />
            </div>
        </section>
    );
}