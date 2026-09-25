// Used to create custom properties on our elements
import type { CSSProperties } from "react";

import {
    ArrowRight,
    BookOpen,
    Box,
    Check,
    CircleDot,
    Database,
    GitBranch,
    Server,
} from "lucide-react";

import "./Hero.css";


/**
 * Main introduction for the SaaS template.
 *
 * Rather than separating marketing copy from a large
 * dashboard card, the Hero treats the entire viewport
 * as an infrastructure workspace.
 *
 * The product story and infrastructure visualization
 * therefore share the same visual space.
 */
function Hero() {
    return (
        <section
            className="hero"
            aria-labelledby="hero-title"
        >

            {/* Subtle infrastructure grid */}
            <div
                className="hero__grid"
                aria-hidden="true"
            />


            <div className="hero__container saas-container">

                {/* ========================================
                    Introduction
                    ======================================== */}

                <div className="hero__intro">

                    <div className="hero__eyebrow">

                        <span
                            className="hero__eyebrow-dot"
                            aria-hidden="true"
                        />

                        <span className="hero__eyebrow-text">
                            Cloud infrastructure for developers
                        </span>

                    </div>


                    <h1
                        className="hero__title"
                        id="hero-title"
                    >
                        Ship code.
                        <span className="hero__title-line">
                            Not infrastructure.
                        </span>
                    </h1>


                    <p className="hero__description">
                        Deploy applications, databases, and workers
                        without managing the infrastructure underneath.
                    </p>


                    <div className="hero__actions">

                        <a
                            className="hero__primary-action"
                            href="#get-started"
                        >
                            <span className="hero__primary-action-text">
                                Start deploying
                            </span>

                            <ArrowRight
                                className="hero__primary-action-icon"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </a>


                        <a
                            className="hero__docs-link"
                            href="#developers"
                        >
                            <BookOpen
                                className="hero__docs-icon"
                                size={16}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />

                            <span className="hero__docs-text">
                                Read the docs
                            </span>
                        </a>

                    </div>

                </div>


                {/* ========================================
                    System Status
                    ======================================== */}

                <aside className="hero__system-status">

                    <span className="hero__system-label">
                        System status
                    </span>

                    <div className="hero__system-value">

                        <span
                            className="hero__system-dot"
                            aria-hidden="true"
                        />

                        <span className="hero__system-text">
                            All systems operational
                        </span>

                    </div>

                </aside>


                {/* ========================================
                    Infrastructure Workspace
                    ======================================== */}

                <div className="hero__workspace">

                    {/* Workspace header */}

                    <div className="hero__workspace-header">

                        <div className="hero__workspace-identity">

                            <span className="hero__workspace-path">
                                production
                            </span>

                            <span
                                className="hero__workspace-divider"
                                aria-hidden="true"
                            >
                                /
                            </span>

                            <strong className="hero__workspace-service">
                                production-api
                            </strong>

                        </div>


                        <div className="hero__workspace-health">

                            <span
                                className="hero__health-dot"
                                aria-hidden="true"
                            />

                            <span className="hero__health-text">
                                Healthy
                            </span>

                        </div>

                    </div>


                    {/* ========================================
                        Infrastructure Body
                        ======================================== */}

                    <div className="hero__infrastructure">

                        {/* Services */}

                        <div className="hero__services">

                            <span className="hero__section-label">
                                Services
                            </span>


                            <div className="hero__service-list">

                                <div className="hero__service">

                                    <div className="hero__service-icon">
                                        <Server
                                            size={15}
                                            strokeWidth={1.7}
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div className="hero__service-content">

                                        <span className="hero__service-name">
                                            production-api
                                        </span>

                                        <span className="hero__service-meta">
                                            4 instances
                                        </span>

                                    </div>

                                    <span
                                        className="hero__service-status hero__service-status--healthy"
                                        aria-label="Healthy"
                                    />

                                </div>


                                <div className="hero__service">

                                    <div className="hero__service-icon">
                                        <Box
                                            size={15}
                                            strokeWidth={1.7}
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div className="hero__service-content">

                                        <span className="hero__service-name">
                                            payments-worker
                                        </span>

                                        <span className="hero__service-meta">
                                            2 instances
                                        </span>

                                    </div>

                                    <span
                                        className="hero__service-status hero__service-status--healthy"
                                        aria-label="Healthy"
                                    />

                                </div>


                                <div className="hero__service">

                                    <div className="hero__service-icon">
                                        <Database
                                            size={15}
                                            strokeWidth={1.7}
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <div className="hero__service-content">

                                        <span className="hero__service-name">
                                            postgres-primary
                                        </span>

                                        <span className="hero__service-meta">
                                            PostgreSQL 17
                                        </span>

                                    </div>

                                    <span
                                        className="hero__service-status hero__service-status--healthy"
                                        aria-label="Healthy"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Deployment */}

                        <div className="hero__deployment">

                            <div className="hero__deployment-heading">

                                <span className="hero__section-label">
                                    Deployment
                                </span>

                                <span className="hero__deployment-number">
                                    #1842
                                </span>

                            </div>


                            <div className="hero__commit">

                                <GitBranch
                                    className="hero__commit-icon"
                                    size={15}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <span className="hero__commit-branch">
                                    main
                                </span>

                                <span className="hero__commit-separator">
                                    /
                                </span>

                                <span className="hero__commit-hash">
                                    a84fc91
                                </span>

                            </div>


                            {/* Deployment pipeline */}

                            {/*
                            * Each pipeline item receives a numeric `--pipeline-order`
                            * CSS custom property.
                            *
                            * CSS will use this number to calculate when that specific
                            * part of the deployment animation should begin.
                            *
                            * Sequence:
                            *
                            *   Build       = 0
                            *   Connector   = 1
                            *   Deploy      = 2
                            *   Connector   = 3
                            *   Verify      = 4
                            *   Connector   = 5
                            *   Live        = 6
                            *
                            * For example, CSS can later calculate:
                            *
                            *   animation-delay:
                            *       calc(var(--pipeline-order) * 400ms);
                            *
                            * If --pipeline-order is 3:
                            *
                            *   3 * 400ms = 1200ms
                            *
                            * This lets one animation rule control the entire sequence
                            * instead of creating a separate delay class for every
                            * pipeline step and connector.
                            *
                            * CSSProperties is used because TypeScript knows standard
                            * CSS properties, but it does not automatically recognize
                            * our custom `--pipeline-order` property inside React's
                            * inline style object.
                            */}
                            <div className="hero__pipeline">

                                <div
                                    className="hero__pipeline-step"
                                    style={{ "--pipeline-order": 0 } as CSSProperties}
                                >
                                    <span className="hero__pipeline-marker">
                                        <Check size={12} aria-hidden="true" />
                                    </span>

                                    <span className="hero__pipeline-label">
                                        Build
                                    </span>
                                </div>

                                <span
                                    className="hero__pipeline-connector"
                                    style={{ "--pipeline-order": 1 } as CSSProperties}
                                    aria-hidden="true"
                                />

                                <div
                                    className="hero__pipeline-step"
                                    style={{ "--pipeline-order": 2 } as CSSProperties}
                                >
                                    <span className="hero__pipeline-marker">
                                        <Check size={12} aria-hidden="true" />
                                    </span>

                                    <span className="hero__pipeline-label">
                                        Deploy
                                    </span>
                                </div>

                                <span
                                    className="hero__pipeline-connector"
                                    style={{ "--pipeline-order": 3 } as CSSProperties}
                                    aria-hidden="true"
                                />

                                <div
                                    className="hero__pipeline-step"
                                    style={{ "--pipeline-order": 4 } as CSSProperties}
                                >
                                    <span className="hero__pipeline-marker">
                                        <Check size={12} aria-hidden="true" />
                                    </span>

                                    <span className="hero__pipeline-label">
                                        Verify
                                    </span>
                                </div>

                                <span
                                    className="hero__pipeline-connector"
                                    style={{ "--pipeline-order": 5 } as CSSProperties}
                                    aria-hidden="true"
                                />

                                <div
                                    className="hero__pipeline-step hero__pipeline-step--live"
                                    style={{ "--pipeline-order": 6 } as CSSProperties}
                                >
                                    <span className="hero__pipeline-marker hero__pipeline-marker--live">
                                        <CircleDot size={12} aria-hidden="true" />
                                    </span>

                                    <span className="hero__pipeline-label">
                                        Live
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ========================================
                        Metrics
                        ======================================== */}

                    <div className="hero__metrics">

                        <div className="hero__metric">

                            <span className="hero__metric-label">
                                Requests
                            </span>

                            <strong className="hero__metric-value">
                                28.4k
                            </strong>

                            <span className="hero__metric-unit">
                                / min
                            </span>

                        </div>


                        <div className="hero__metric">

                            <span className="hero__metric-label">
                                CPU
                            </span>

                            <strong className="hero__metric-value">
                                42%
                            </strong>

                            <span className="hero__metric-unit">
                                avg
                            </span>

                        </div>


                        <div className="hero__metric">

                            <span className="hero__metric-label">
                                Memory
                            </span>

                            <strong className="hero__metric-value">
                                1.8
                            </strong>

                            <span className="hero__metric-unit">
                                / 4 GB
                            </span>

                        </div>


                        <div className="hero__metric">

                            <span className="hero__metric-label">
                                P95 latency
                            </span>

                            <strong className="hero__metric-value">
                                118
                            </strong>

                            <span className="hero__metric-unit">
                                ms
                            </span>

                        </div>

                    </div>


                    {/* ========================================
                        Global Regions
                        ======================================== */}

                    <div className="hero__regions">

                        <div className="hero__regions-heading">

                            <span className="hero__section-label">
                                Active regions
                            </span>

                            <span className="hero__regions-count">
                                3 regions
                            </span>

                        </div>


                        <div className="hero__region-network">

                            <div className="hero__region">

                                <span className="hero__region-name">
                                    US West
                                </span>

                                <span className="hero__region-code">
                                    us-west-2
                                </span>

                            </div>


                            <div
                                className="hero__region-line"
                                aria-hidden="true"
                            />


                            <div className="hero__region">

                                <span className="hero__region-name">
                                    Frankfurt
                                </span>

                                <span className="hero__region-code">
                                    eu-central-1
                                </span>

                            </div>


                            <div
                                className="hero__region-line"
                                aria-hidden="true"
                            />


                            <div className="hero__region">

                                <span className="hero__region-name">
                                    Singapore
                                </span>

                                <span className="hero__region-code">
                                    ap-southeast-1
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;