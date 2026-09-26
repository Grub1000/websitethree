import {
    HelpCircle,
    Minus,
    Plus,
} from "lucide-react";
import {
    useState,
} from "react";
import "./FAQ.css";

const faqItems = [
    {
        id: "infrastructure",
        question: "Do I need to manage my own infrastructure?",
        answer:
            "No. Nexora provisions and manages the infrastructure required by your services, including compute, networking, health checks, scaling, and deployment orchestration. You still retain visibility into how your workloads are running.",
    },
    {
        id: "git-provider",
        question: "Can I deploy from my existing Git provider?",
        answer:
            "Yes. Connect an existing repository or deploy directly through the Nexora CLI. Source integrations can trigger builds automatically whenever changes reach your configured production branch.",
    },
    {
        id: "regions",
        question: "Can the same application run in multiple regions?",
        answer:
            "Yes. Services can be deployed across multiple regions while Nexora manages health-aware routing between available instances. Regional capacity can be adjusted independently as your traffic changes.",
    },
    {
        id: "scaling",
        question: "How does automatic scaling work?",
        answer:
            "Autoscaling policies respond to application demand and provision additional capacity when configured thresholds are reached. Capacity is reduced again when demand falls while respecting the minimum instance count you define.",
    },
    {
        id: "rollback",
        question: "What happens when a deployment fails?",
        answer:
            "Nexora monitors deployment health before shifting production traffic. If a release fails its health policy, the platform can automatically restore the previous healthy version without requiring a manual redeployment.",
    },
    {
        id: "database",
        question: "Does Nexora manage databases too?",
        answer:
            "Yes. Managed data services can handle provisioning, backups, replication, connection management, and health monitoring while remaining connected to the same application environment as your deployed services.",
    },
];

export default function FAQ() {
    /*
     * Only one FAQ is intentionally allowed to remain open at a time.
     *
     * Storing the item's stable ID instead of its array index keeps
     * the state tied to the content itself. Reordering the FAQ array
     * later therefore will not change which item React considers open.
     *
     * The first question starts expanded so the section immediately
     * demonstrates its interaction without requiring an initial click.
     */
    const [openItem, setOpenItem] = useState<string | null>(
        faqItems[0].id,
    );

    function handleToggle(id: string) {
        /*
         * Selecting the currently open item closes it.
         *
         * Selecting any other item replaces the previous ID, which
         * gives us traditional single-open accordion behavior without
         * maintaining a separate boolean state for every question.
         */
        setOpenItem((currentItem) => (
            currentItem === id ? null : id
        ));
    }

    return (
        <section
            className="faq"
            id="faq"
            aria-labelledby="faq-heading"
        >
            <div className="faq__container">
                <div className="faq__intro">
                    <div className="faq__header">
                        <span className="faq__eyebrow">
                            FAQ
                        </span>

                        <h2
                            className="faq__heading"
                            id="faq-heading"
                        >
                            Infrastructure without the mystery.
                        </h2>

                        <p className="faq__description">
                            A few answers about how Nexora handles
                            deployments, scaling, regions, recovery,
                            and managed infrastructure.
                        </p>
                    </div>

                    <div className="faq__support">
                        <HelpCircle
                            className="faq__support-icon"
                            size={18}
                            strokeWidth={1.6}
                            aria-hidden="true"
                        />

                        <div className="faq__support-copy">
                            <span className="faq__support-title">
                                Still have questions?
                            </span>

                            <span className="faq__support-description">
                                Technical support is available on every
                                production plan.
                            </span>
                        </div>
                    </div>
                </div>

                <div className="faq__accordion">
                    {faqItems.map((item, index) => {
                        const isOpen = openItem === item.id;
                        const triggerId = `faq-trigger-${item.id}`;
                        const panelId = `faq-panel-${item.id}`;

                        return (
                            <article
                                className={`faq__item${isOpen ? " faq__item--open" : ""}`}
                                key={item.id}
                            >
                                <h3 className="faq__item-heading">
                                    <button
                                        className="faq__trigger"
                                        id={triggerId}
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
                                        onClick={() => handleToggle(item.id)}
                                    >
                                        <span className="faq__number">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <span className="faq__question">
                                            {item.question}
                                        </span>

                                        <span
                                            className="faq__toggle"
                                            aria-hidden="true"
                                        >
                                            {isOpen ? (
                                                <Minus
                                                    className="faq__toggle-icon"
                                                    size={17}
                                                    strokeWidth={1.7}
                                                />
                                            ) : (
                                                <Plus
                                                    className="faq__toggle-icon"
                                                    size={17}
                                                    strokeWidth={1.7}
                                                />
                                            )}
                                        </span>
                                    </button>
                                </h3>

                                {/*
                                 * The panel remains mounted even while closed.
                                 *
                                 * This lets CSS animate the grid track between
                                 * zero and its natural content height without
                                 * measuring scrollHeight in JavaScript.
                                 *
                                 * aria-labelledby establishes the relationship
                                 * back to the button that controls this panel.
                                 */}
                                <div
                                    className="faq__panel"
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={triggerId}
                                    aria-hidden={!isOpen}
                                >
                                    <div className="faq__panel-inner">
                                        <p className="faq__answer">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}