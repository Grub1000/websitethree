import {
    Activity,
    Boxes,
    Braces,
    GitBranch,
    Globe2,
    HeartPulse,
    Network,
    Package,
    Scaling,
    Server,
    Settings2,
} from "lucide-react";

import "./Story.css";


/*
 * Story
 *
 * This section explains the core value proposition of the
 * fictional platform without introducing another interactive
 * product interface.
 *
 * The previous ProductOverview section demonstrates HOW the
 * deployment workflow works.
 *
 * This section explains WHAT responsibility the platform
 * removes from the developer.
 *
 * Visually:
 *
 *   Your application
 *          ↓
 *   Platform boundary
 *          ↓
 *   Infrastructure
 *
 * The restrained design is intentional. The following
 * GlobalArchitecture section will contain the page's major
 * scroll-driven animation, so Story acts as visual breathing
 * room before that experience.
 */
function Story() {

    return (
        <section
            className="story"
            aria-labelledby="story-title"
        >

            <div className="story__container saas-container">

                <header className="story__header">

                    <span className="story__eyebrow">
                        Platform abstraction
                    </span>

                    <div className="story__heading-layout">

                        <h2
                            className="story__title"
                            id="story-title"
                        >
                            Your application.
                            <br />
                            Our infrastructure.
                        </h2>

                        <p className="story__description">
                            You define the code, dependencies, and
                            configuration. Nexora handles the systems
                            required to build, run, scale, and distribute
                            it in production.
                        </p>

                    </div>

                </header>


                {/*
                 * The architecture diagram contains three conceptual
                 * areas:
                 *
                 *   1. Application responsibilities
                 *   2. Nexora's abstraction boundary
                 *   3. Infrastructure responsibilities
                 *
                 * CSS Grid controls their relationship at larger
                 * breakpoints.
                 *
                 * On narrow screens they intentionally stack instead
                 * of attempting to compress a desktop architecture
                 * diagram into mobile width.
                 */}
                <div className="story__architecture">

                    <div className="story__application">

                        <div className="story__column-header">

                            <span className="story__column-number">
                                01
                            </span>

                            <div className="story__column-heading">

                                <span className="story__column-label">
                                    You manage
                                </span>

                                <h3 className="story__column-title">
                                    The application
                                </h3>

                            </div>

                        </div>


                        <div className="story__responsibility-list">

                            <div className="story__responsibility">

                                <Braces
                                    className="story__responsibility-icon"
                                    size={17}
                                    aria-hidden="true"
                                />

                                <div className="story__responsibility-content">

                                    <strong className="story__responsibility-name">
                                        Application code
                                    </strong>

                                    <span className="story__responsibility-detail">
                                        Your product and business logic
                                    </span>

                                </div>

                            </div>


                            <div className="story__responsibility">

                                <Package
                                    className="story__responsibility-icon"
                                    size={17}
                                    aria-hidden="true"
                                />

                                <div className="story__responsibility-content">

                                    <strong className="story__responsibility-name">
                                        Dependencies
                                    </strong>

                                    <span className="story__responsibility-detail">
                                        Packages and runtime requirements
                                    </span>

                                </div>

                            </div>


                            <div className="story__responsibility">

                                <Settings2
                                    className="story__responsibility-icon"
                                    size={17}
                                    aria-hidden="true"
                                />

                                <div className="story__responsibility-content">

                                    <strong className="story__responsibility-name">
                                        Configuration
                                    </strong>

                                    <span className="story__responsibility-detail">
                                        Environment and service settings
                                    </span>

                                </div>

                            </div>


                            <div className="story__responsibility">

                                <GitBranch
                                    className="story__responsibility-icon"
                                    size={17}
                                    aria-hidden="true"
                                />

                                <div className="story__responsibility-content">

                                    <strong className="story__responsibility-name">
                                        Source control
                                    </strong>

                                    <span className="story__responsibility-detail">
                                        Branches and deployment revisions
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/*
                     * The boundary is the conceptual center of the
                     * section.
                     *
                     * It does not represent another product step.
                     * Instead, it represents the point where application
                     * responsibility becomes infrastructure responsibility.
                     *
                     * CSS changes this from a horizontal handoff on
                     * narrow screens into a vertical boundary at 64rem.
                     */}
                    <div
                        className="story__boundary"
                        aria-hidden="true"
                    >

                        <span className="story__boundary-line" />

                        <div className="story__boundary-node">

                            <Boxes
                                className="story__boundary-icon"
                                size={18}
                            />

                        </div>

                        <span className="story__boundary-line" />

                    </div>


                    <div className="story__infrastructure">

                        <div className="story__column-header">

                            <span className="story__column-number">
                                02
                            </span>

                            <div className="story__column-heading">

                                <span className="story__column-label">
                                    Nexora handles
                                </span>

                                <h3 className="story__column-title">
                                    The infrastructure
                                </h3>

                            </div>

                        </div>


                        {/*
                         * Infrastructure responsibilities use a compact
                         * Grid rather than large feature cards.
                         *
                         * These items should read like capabilities of
                         * one system, not six separate marketing blocks.
                         */}
                        <div className="story__infrastructure-grid">

                            <div className="story__infrastructure-item">

                                <Server
                                    className="story__infrastructure-icon"
                                    size={17}
                                    aria-hidden="true"
                                />

                                <span className="story__infrastructure-name">
                                    Compute
                                </span>

                                <span className="story__infrastructure-detail">
                                    Provisioned automatically
                                </span>

                            </div>


                            <div className="story__infrastructure-item">

                                <Activity
                                    className="story__infrastructure-icon"
                                    size={17}
                                    aria-hidden="true"
                                />

                                <span className="story__infrastructure-name">
                                    Builds
                                </span>

                                <span className="story__infrastructure-detail">
                                    From commit to artifact
                                </span>

                            </div>


                            <div className="story__infrastructure-item">

                                <Network
                                    className="story__infrastructure-icon"
                                    size={17}
                                    aria-hidden="true"
                                />

                                <span className="story__infrastructure-name">
                                    Networking
                                </span>

                                <span className="story__infrastructure-detail">
                                    Routing and connectivity
                                </span>

                            </div>


                            <div className="story__infrastructure-item">

                                <HeartPulse
                                    className="story__infrastructure-icon"
                                    size={17}
                                    aria-hidden="true"
                                />

                                <span className="story__infrastructure-name">
                                    Health
                                </span>

                                <span className="story__infrastructure-detail">
                                    Continuous service checks
                                </span>

                            </div>


                            <div className="story__infrastructure-item">

                                <Scaling
                                    className="story__infrastructure-icon"
                                    size={17}
                                    aria-hidden="true"
                                />

                                <span className="story__infrastructure-name">
                                    Scaling
                                </span>

                                <span className="story__infrastructure-detail">
                                    Capacity when demand changes
                                </span>

                            </div>


                            <div className="story__infrastructure-item">

                                <Globe2
                                    className="story__infrastructure-icon"
                                    size={17}
                                    aria-hidden="true"
                                />

                                <span className="story__infrastructure-name">
                                    Regions
                                </span>

                                <span className="story__infrastructure-detail">
                                    Workloads distributed globally
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                <footer className="story__footer">

                    <span className="story__footer-label">
                        One deployment model
                    </span>

                    <p className="story__footer-text">
                        The same application definition moves from
                        commit to production without requiring your
                        team to manage the infrastructure between them.
                    </p>

                </footer>

            </div>

        </section>
    );
}


export default Story;