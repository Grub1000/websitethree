/*
 * ==========================================================================
 * RESUSCAN BOARD REGION
 * ==========================================================================
 *
 * ResuScan's visual language is application workflow rather than system
 * infrastructure or retrieval.
 */

import { ArrowUpRight } from "lucide-react";

import ResuScanPNG from "../../assets/images/projects/resuscan/ResuScan.png"


function ResuScanCard() {
    return (
        <article
            className="
                project-board__card
                project-board__card--resuscan
            "
            aria-labelledby="resuscan-card-title"
        >

            <header className="project-board__card-header">

                <div className="project-board__card-index-group text-mono">

                    <span className="project-board__card-index">
                        03 /
                    </span>

                    <span className="project-board__card-category">
                        FULL-STACK PRODUCT
                    </span>

                </div>


                <span className="project-board__status text-mono">

                    <span
                        className="project-board__status-dot"
                        aria-hidden="true"
                    />

                    PRODUCTION

                </span>

            </header>


            <div className="project-board__identity">

                <h3
                    className="project-board__title"
                    id="resuscan-card-title"
                >
                    RESUSCAN
                    <span className="project-board__title-mark">
                        .
                    </span>
                </h3>

                <p className="project-board__description">
                    Resume analysis and job tracking combined into a
                    production full-stack application.
                </p>

            </div>


            <div className="project-board__visual">

                <figure className="project-board__image-frame">

                    <img
                        className="project-board__image"
                        src={ResuScanPNG}
                        alt="ResuScan resume analysis and job tracking application"
                    />

                    <figcaption className="project-board__image-caption text-mono">
                        PRODUCT / INTERFACE
                    </figcaption>

                </figure>


                <div
                    className="resuscan-card__system"
                    aria-label="Simplified ResuScan application workflow"
                >

                    <div className="resuscan-card__system-header text-mono">
                        APPLICATION FLOW / 01
                    </div>


                    <div className="resuscan-card__workflow">

                        <div className="resuscan-card__node">
                            <span className="resuscan-card__node-index text-mono">
                                01
                            </span>

                            <span className="resuscan-card__node-label text-mono">
                                RESUME
                            </span>
                        </div>


                        <span
                            className="resuscan-card__arrow"
                            aria-hidden="true"
                        >
                            →
                        </span>


                        <div className="resuscan-card__node">
                            <span className="resuscan-card__node-index text-mono">
                                02
                            </span>

                            <span className="resuscan-card__node-label text-mono">
                                ANALYSIS
                            </span>
                        </div>


                        <span
                            className="resuscan-card__arrow"
                            aria-hidden="true"
                        >
                            →
                        </span>


                        <div className="resuscan-card__node">
                            <span className="resuscan-card__node-index text-mono">
                                03
                            </span>

                            <span className="resuscan-card__node-label text-mono">
                                TRACKER
                            </span>
                        </div>

                    </div>


                    <div className="resuscan-card__states">

                        <span className="resuscan-card__state text-mono">
                            SAVED
                        </span>

                        <span className="resuscan-card__state text-mono">
                            APPLIED
                        </span>

                        <span className="resuscan-card__state text-mono">
                            INTERVIEW
                        </span>

                        <span className="resuscan-card__state text-mono">
                            OFFER
                        </span>

                    </div>

                </div>

            </div>


            <dl className="project-board__technologies">

                <div className="project-board__technology-row">
                    <dt className="project-board__technology-label text-mono">
                        LANGUAGES
                    </dt>

                    <dd className="project-board__technology-value text-mono">
                        TYPESCRIPT / PYTHON / SQL
                    </dd>
                </div>


                <div className="project-board__technology-row">
                    <dt className="project-board__technology-label text-mono">
                        CORE
                    </dt>

                    <dd className="project-board__technology-value text-mono">
                        REACT / DRF / MYSQL
                    </dd>
                </div>


                <div className="project-board__technology-row">
                    <dt className="project-board__technology-label text-mono">
                        INFRA
                    </dt>

                    <dd className="project-board__technology-value text-mono">
                        AWS EC2 / S3 / APACHE / JWT
                    </dd>
                </div>

            </dl>


            <a
                className="project-board__action"
                href="https://jorgeramirez.net/resuscan/"
                aria-label="Explore ResuScan"
            >
                <span className="project-board__action-line" />

                <span className="project-board__action-content">

                    <span className="project-board__action-label text-mono">
                        EXPLORE RESUSCAN
                    </span>

                    <span className="project-board__action-secondary text-mono">
                        OPEN SYSTEM
                    </span>

                    <ArrowUpRight
                        className="project-board__action-icon"
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />

                </span>
            </a>

        </article>
    );
}


export default ResuScanCard;