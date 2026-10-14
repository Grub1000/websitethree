/*
 * Each record represents one day of business activity.
 *
 * Revenue and expenses are stored in USD.
 * Order counts are non-negative integers.
 *
 * Using raw values lets us derive KPIs consistently instead of
 * maintaining separate, potentially contradictory totals.
 */
export interface DailyOperationsRecord {
    date: string;
    revenue: number;
    expenses: number;
    ordersReceived: number;
    ordersFulfilled: number;
}

export interface OverviewMetrics {
    netRevenue: number;
    operatingMargin: number;
    ordersProcessed: number;
    fulfillmentRate: number;
}