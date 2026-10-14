import type {
    DailyOperationsRecord,
    OverviewMetrics,
} from "../types/overview";


/*
 * PURE AGGREGATION FUNCTION
 *
 * A pure function derives its output exclusively from its inputs.
 * It does not modify the dataset or update React state.
 *
 * This makes the calculation reusable across pages and easy to test.
 */
export function calculateOverviewMetrics(
    records: DailyOperationsRecord[]
): OverviewMetrics {
    /*
     * reduce() is a native JavaScript array method.
     *
     * It processes every record and accumulates the values into
     * a single totals object.
     *
     * We start every total at zero so an empty dataset produces
     * predictable results.
     */
    const totals = records.reduce(
        (accumulator, record) => {
            accumulator.revenue += record.revenue;
            accumulator.expenses += record.expenses;
            accumulator.ordersReceived += record.ordersReceived;
            accumulator.ordersFulfilled += record.ordersFulfilled;

            return accumulator;
        },
        {
            revenue: 0,
            expenses: 0,
            ordersReceived: 0,
            ordersFulfilled: 0,
        }
    );

    /*
     * Operating margin:
     *
     * (Revenue - Expenses) / Revenue × 100
     *
     * Example:
     * Revenue = $100,000
     * Expenses = $75,000
     * Margin = 25%
     *
     * The zero check prevents division by zero.
     */
    const operatingMargin =
        totals.revenue > 0
            ? ((totals.revenue - totals.expenses) / totals.revenue) * 100
            : 0;

    /*
     * Fulfillment rate:
     *
     * Fulfilled Orders / Received Orders × 100
     *
     * We calculate this from aggregated counts rather than averaging
     * individual daily percentages.
     *
     * That ensures high-volume days contribute proportionally.
     */
    const fulfillmentRate =
        totals.ordersReceived > 0
            ? (totals.ordersFulfilled / totals.ordersReceived) * 100
            : 0;

    return {
        /*
         * For our demonstration dataset, net revenue means revenue
         * after expenses. In financial reporting this is more accurately
         * described as operating profit, so the UI uses that label.
         */
        netRevenue: totals.revenue - totals.expenses,
        operatingMargin,
        ordersProcessed: totals.ordersFulfilled,
        fulfillmentRate,
    };
}