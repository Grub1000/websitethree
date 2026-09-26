import {
    Check,
    ChevronRight,
    Circle,
    Cloud,
    Copy,
    Terminal,
} from "lucide-react";
import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
} from "react";

import "./DeveloperTerminal.css";

const terminalLines = [
    {
        id: "command",
        type: "command",
        content: "nexora deploy --production",
    },
    {
        id: "repository",
        type: "info",
        label: "repo",
        content: "github.com/acme/production-api",
    },
    {
        id: "runtime",
        type: "info",
        label: "runtime",
        content: "Node.js 22",
    },
    {
        id: "build",
        type: "success",
        label: "build",
        content: "Application compiled successfully",
    },
    {
        id: "image",
        type: "success",
        label: "image",
        content: "Container image created",
    },
    {
        id: "deploy",
        type: "success",
        label: "deploy",
        content: "3 instances provisioned in iad1",
    },
    {
        id: "health",
        type: "success",
        label: "health",
        content: "3/3 health checks passed",
    },
];

export default function DeveloperTerminal() {
    const sectionRef = useRef<HTMLElement>(null);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        /*
         * The terminal sequence should begin when the user can
         * actually see it rather than running during initial page
         * load while the section is still below the viewport.
         *
         * Unlike the selectable Features visualizations, this
         * section only needs to play once during normal scrolling.
         */
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }

                setShouldAnimate(true);
                observer.disconnect();
            },
            {
                threshold: 0.3,
            },
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            className={`developer-terminal${shouldAnimate ? " developer-terminal--animate" : ""}`}
            id="developer-terminal"
            ref={sectionRef}
            aria-labelledby="developer-terminal-heading"
        >
            <div className="developer-terminal__container">
                <div className="developer-terminal__content">
                    <span className="developer-terminal__eyebrow">
                        Developer experience
                    </span>

                    <h2
                        className="developer-terminal__heading"
                        id="developer-terminal-heading"
                    >
                        From repository to production in one command.
                    </h2>

                    <p className="developer-terminal__description">
                        Deploy directly from your terminal while Nexora
                        handles builds, containers, infrastructure,
                        health checks, and traffic routing behind the
                        scenes.
                    </p>

                    <div className="developer-terminal__command-preview">
                        <span
                            className="developer-terminal__command-symbol"
                            aria-hidden="true"
                        >
                            $
                        </span>

                        <code className="developer-terminal__command-code">
                            nexora deploy --production
                        </code>

                        <Copy
                            className="developer-terminal__command-copy"
                            size={15}
                            strokeWidth={1.6}
                            aria-hidden="true"
                        />
                    </div>

                    <div className="developer-terminal__details">
                        <div className="developer-terminal__detail">
                            <Check
                                className="developer-terminal__detail-icon"
                                size={15}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />

                            <span className="developer-terminal__detail-text">
                                Zero infrastructure configuration
                            </span>
                        </div>

                        <div className="developer-terminal__detail">
                            <Check
                                className="developer-terminal__detail-icon"
                                size={15}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />

                            <span className="developer-terminal__detail-text">
                                Automatic health verification
                            </span>
                        </div>

                        <div className="developer-terminal__detail">
                            <Check
                                className="developer-terminal__detail-icon"
                                size={15}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />

                            <span className="developer-terminal__detail-text">
                                Production traffic switched automatically
                            </span>
                        </div>
                    </div>
                </div>

                <div className="developer-terminal__window">
                    <div className="developer-terminal__window-header">
                        <div
                            className="developer-terminal__window-controls"
                            aria-hidden="true"
                        >
                            <Circle
                                className="developer-terminal__window-control"
                                size={8}
                                fill="currentColor"
                            />

                            <Circle
                                className="developer-terminal__window-control"
                                size={8}
                                fill="currentColor"
                            />

                            <Circle
                                className="developer-terminal__window-control"
                                size={8}
                                fill="currentColor"
                            />
                        </div>

                        <div className="developer-terminal__window-title">
                            <Terminal
                                className="developer-terminal__window-title-icon"
                                size={14}
                                strokeWidth={1.6}
                                aria-hidden="true"
                            />

                            <span className="developer-terminal__window-title-text">
                                nexora-cli
                            </span>
                        </div>

                        <span className="developer-terminal__window-version">
                            v2.8.4
                        </span>
                    </div>

                    <div className="developer-terminal__terminal">
                        <div className="developer-terminal__terminal-context">
                            <span className="developer-terminal__terminal-path">
                                ~/production-api
                            </span>

                            <span className="developer-terminal__terminal-branch">
                                main
                            </span>
                        </div>

                        <div className="developer-terminal__lines">
                            {terminalLines.map((line, index) => (
                                <div
                                    className={`developer-terminal__line developer-terminal__line--${line.type}`}
                                    style={{
                                        "--terminal-line-order": index,
                                    } as CSSProperties}
                                    key={line.id}
                                >
                                    {line.type === "command" ? (
                                        <>
                                            <ChevronRight
                                                className="developer-terminal__prompt"
                                                size={15}
                                                strokeWidth={2}
                                                aria-hidden="true"
                                            />

                                            <code className="developer-terminal__line-command">
                                                {line.content}
                                            </code>
                                        </>
                                    ) : (
                                        <>
                                            <span className="developer-terminal__line-status">
                                                {line.type === "success" ? (
                                                    <Check
                                                        className="developer-terminal__line-check"
                                                        size={13}
                                                        strokeWidth={2}
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <span
                                                        className="developer-terminal__line-info-dot"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </span>

                                            <span className="developer-terminal__line-label">
                                                {line.label}
                                            </span>

                                            <span className="developer-terminal__line-content">
                                                {line.content}
                                            </span>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="developer-terminal__result">
                            <div className="developer-terminal__result-header">
                                <Cloud
                                    className="developer-terminal__result-icon"
                                    size={16}
                                    strokeWidth={1.7}
                                    aria-hidden="true"
                                />

                                <span className="developer-terminal__result-title">
                                    Deployment live
                                </span>

                                <span className="developer-terminal__result-time">
                                    31.8s
                                </span>
                            </div>

                            <div className="developer-terminal__result-url">
                                <span className="developer-terminal__result-url-label">
                                    production
                                </span>

                                <code className="developer-terminal__result-url-value">
                                    https://api.acme.nexora.app
                                </code>
                            </div>
                        </div>

                        <div className="developer-terminal__cursor-line">
                            <ChevronRight
                                className="developer-terminal__prompt"
                                size={15}
                                strokeWidth={2}
                                aria-hidden="true"
                            />

                            <span
                                className="developer-terminal__cursor"
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}