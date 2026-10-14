import type { LucideIcon } from "lucide-react";

import "./MetricCard.css";


type MetricCardProps = {
    label: string;
    value: string;
    description: string;
    icon: LucideIcon;
};


/*
 * REUSABLE PRESENTATION COMPONENT
 *
 * MetricCard receives already-calculated and formatted values.
 *
 * It does not perform business calculations.
 * This keeps presentation separate from the data layer.
 */
export default function MetricCard({
    label,
    value,
    description,
    icon: Icon,
}: MetricCardProps) {
    return (
        <article className="analytics-metric">
            <div className="analytics-metric__header">
                <p className="analytics-metric__label">
                    {label}
                </p>

                <span className="analytics-metric__icon-wrapper">
                    <Icon
                        className="analytics-metric__icon"
                        aria-hidden="true"
                        strokeWidth={1.7}
                    />
                </span>
            </div>

            <p className="analytics-metric__value analytics-tabular">
                {value}
            </p>

            <p className="analytics-metric__description">
                {description}
            </p>
        </article>
    );
}