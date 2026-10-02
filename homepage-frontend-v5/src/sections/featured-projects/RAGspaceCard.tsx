/*
 * ==========================================================================
 * RAGSPACE BOARD REGION
 * ==========================================================================
 *
 * RAGspace combines:
 *
 * - A real product screenshot.
 * - A compact retrieval-pipeline visualization.
 * - Immediately scannable AI/data/infrastructure technologies.
 */

import { ArrowUpRight } from "lucide-react";

import RAGspacePNG from "../../assets/images/projects/ragspace/RAGspace.png"


function RAGspaceCard() {
    return (
        <article
            className="
                project-board__card
                project-board__card--ragspace
            "
            aria-labelledby="ragspace-card-title"
        >

            <header className="project-board__card-header">

                <div className="project-board__card-index-group text-mono">

                    <span className="project-board__card-index">
                        02 /
                    </span>

                    <span className="project-board__card-category">
                        AI + RETRIEVAL
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
                    id="ragspace-card-title"
                >
                    RAGSPACE
                    <span className="project-board__title-mark">
                        .
                    </span>
                </h3>

                <p className="project-board__description">
                    Conversational RAG for private document collections with
                    semantic retrieval, reranking, persistent conversations,
                    and page-level citations.
                </p>

            </div>


            {/* --------------------------------------------------------------
                PRODUCT IMAGE

                RAGspace is narrower than Relay on desktop, so its screenshot
                receives a wider horizontal treatment with the technical
                pipeline directly beneath it.
            -------------------------------------------------------------- */}
            <div className="project-board__visual">

                <figure className="project-board__image-frame">

                    <img
                        className="project-board__image"
                        src={RAGspacePNG}
                        alt="RAGspace document retrieval application"
                    />

                    <figcaption className="project-board__image-caption text-mono">
                        PRODUCT / INTERFACE
                    </figcaption>

                </figure>


                <div
                    className="ragspace-card__system"
                    aria-label="Simplified RAGspace retrieval pipeline"
                >

                    <div className="ragspace-card__system-header text-mono">
                        RETRIEVAL / 01
                    </div>


                    <div className="ragspace-card__pipeline">

                        <div className="ragspace-card__stage">
                            <span className="ragspace-card__stage-index text-mono">
                                01
                            </span>

                            <span className="ragspace-card__stage-label text-mono">
                                DOC
                            </span>
                        </div>


                        <span
                            className="ragspace-card__pipeline-line"
                            aria-hidden="true"
                        />


                        <div className="ragspace-card__stage">
                            <span className="ragspace-card__stage-index text-mono">
                                02
                            </span>

                            <span className="ragspace-card__stage-label text-mono">
                                CHUNKS
                            </span>
                        </div>


                        <span
                            className="ragspace-card__pipeline-line"
                            aria-hidden="true"
                        />


                        <div className="ragspace-card__stage">
                            <div
                                className="ragspace-card__vectors"
                                aria-hidden="true"
                            >
                                <span className="ragspace-card__vector" />
                                <span className="ragspace-card__vector" />
                                <span className="ragspace-card__vector" />
                            </div>

                            <span className="ragspace-card__stage-label text-mono">
                                EMBED
                            </span>
                        </div>


                        <span
                            className="ragspace-card__pipeline-line"
                            aria-hidden="true"
                        />


                        <div className="ragspace-card__stage">
                            <span className="ragspace-card__stage-index text-mono">
                                04
                            </span>

                            <span className="ragspace-card__stage-label text-mono">
                                QDRANT
                            </span>
                        </div>

                    </div>

                </div>

            </div>


            <dl className="project-board__technologies">

                <div className="project-board__technology-row">
                    <dt className="project-board__technology-label text-mono">
                        LANGUAGES
                    </dt>

                    <dd className="project-board__technology-value text-mono">
                        TYPESCRIPT / PYTHON
                    </dd>
                </div>


                <div className="project-board__technology-row">
                    <dt className="project-board__technology-label text-mono">
                        AI / DATA
                    </dt>

                    <dd className="project-board__technology-value text-mono">
                        EMBEDDINGS / RAG / QDRANT / RERANKING
                    </dd>
                </div>


                <div className="project-board__technology-row">
                    <dt className="project-board__technology-label text-mono">
                        INFRA
                    </dt>

                    <dd className="project-board__technology-value text-mono">
                        DJANGO / MYSQL / S3 / AWS
                    </dd>
                </div>

            </dl>


            <a
                className="project-board__action"
                href="https://jorgeramirez.net/ragspace/"
                aria-label="Explore RAGspace"
            >
                <span className="project-board__action-line" />

                <span className="project-board__action-content">

                    <span className="project-board__action-label text-mono">
                        EXPLORE RAGSPACE
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


export default RAGspaceCard;