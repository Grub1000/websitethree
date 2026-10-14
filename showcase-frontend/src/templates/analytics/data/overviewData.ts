import type { DailyOperationsRecord } from "../types/overview";

/*
 * DEMONSTRATION DATA
 *
 * These are fictional daily business records.
 *
 * We'll eventually expand this into a larger, deterministic dataset
 * that supports date filtering, charts, and cross-page analytics.
 */
export const overviewData: DailyOperationsRecord[] = [
    {
        date: "2026-10-01",
        revenue: 12450,
        expenses: 8850,
        ordersReceived: 310,
        ordersFulfilled: 298,
    },
    {
        date: "2026-10-02",
        revenue: 13800,
        expenses: 9600,
        ordersReceived: 342,
        ordersFulfilled: 330,
    },
    {
        date: "2026-10-03",
        revenue: 11950,
        expenses: 8500,
        ordersReceived: 295,
        ordersFulfilled: 287,
    },
    {
        date: "2026-10-04",
        revenue: 15200,
        expenses: 10750,
        ordersReceived: 380,
        ordersFulfilled: 361,
    },
    {
        date: "2026-10-05",
        revenue: 14300,
        expenses: 9900,
        ordersReceived: 355,
        ordersFulfilled: 344,
    },
    {
        date: "2026-10-06",
        revenue: 16100,
        expenses: 11200,
        ordersReceived: 401,
        ordersFulfilled: 387,
    },
    {
        date: "2026-10-07",
        revenue: 15750,
        expenses: 10900,
        ordersReceived: 392,
        ordersFulfilled: 379,
    },
];