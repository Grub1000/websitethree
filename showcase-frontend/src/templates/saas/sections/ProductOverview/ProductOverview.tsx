import { useState, useRef, useEffect } from "react";
import {
    ArrowRight,
    Box,
    Check,
    ChevronDown,
    Code2,
    Cpu,
    Database,
    ExternalLink,
    GitBranch,
    Globe2,
    MemoryStick,
    Rocket,
    Settings2,
    Terminal,
} from "lucide-react";

import "./ProductOverview.css";


/*
 * `ProductStep` limits the possible active states of the
 * walkthrough to these three exact string values.
 *
 * Without this type, TypeScript could treat our state as
 * a general string and would not protect us from mistakes
 * such as:
 *
 *   setActiveStep("conect");
 *
 * With ProductStep, that typo becomes a TypeScript error.
 */
type ProductStep = "connect" | "configure" | "deploy";

/*
* Each number represents how far the simulated
* deployment has progressed.
*
* 0 = deployment has not started
* 1 = repository cloned
* 2 = dependencies installed
* 3 = build completed
* 4 = health checks passed
* 5 = deployment live
*
* Using a number works well here because deployment
* progress is sequential. A larger number means every
* earlier stage has already completed.
*/
type DeploymentProgress = 0 | 1 | 2 | 3 | 4 | 5;



function ProductOverview() {

    /*
     * `activeStep` stores which part of the product
     * walkthrough the user is currently viewing.
     *
     * The section begins on "connect" because connecting
     * a repository is the first step in the deployment
     * workflow.
     *
     * Calling setActiveStep() causes React to render the
     * section again using the newly selected state.
     */
    const [activeStep, setActiveStep] =
        useState<ProductStep>("connect");


    /*
    * `deploymentProgress` controls how much of the simulated
    * deployment the interface currently reveals.
    *
    * We begin at 0 because no deployment has been triggered
    * when the section first loads.
    */
    const [deploymentProgress, setDeploymentProgress] =
        useState<DeploymentProgress>(0);


    /*
    * `deploymentTimeoutsRef` stores the IDs returned by
    * setTimeout() while a simulated deployment is running.
    *
    * WHY useRef instead of useState?
    *
    * These timeout IDs are bookkeeping information. The UI
    * does not render differently because a timeout ID was
    * added or removed.
    *
    * Updating state would cause unnecessary React renders.
    * Updating a ref does not.
    *
    * The ref also survives normal component re-renders, so
    * the same array remains available while the deployment
    * progresses.
    *
    * `number[]` means the ref stores an array of numeric
    * browser timeout IDs.
    */
    const deploymentTimeoutsRef =
        useRef<number[]>([]);


    /*
    * Cancel every timeout belonging to the current
    * simulated deployment.
    *
    * setTimeout() returns an ID that can later be passed to
    * clearTimeout().
    *
    * We store those IDs in deploymentTimeoutsRef so we can
    * cancel scheduled deployment updates when they are no
    * longer relevant.
    *
    * After clearing the timers, the array is reset so it
    * contains only timers belonging to the next deployment.
    */
    function clearDeploymentTimeouts() {

        deploymentTimeoutsRef.current.forEach((timeoutId) => {
            window.clearTimeout(timeoutId);
        });

        deploymentTimeoutsRef.current = [];
    }


    /*
    * Begin a new simulated deployment.
    *
    * Before scheduling anything new, we cancel timers from
    * any previous deployment.
    *
    * This matters if the user:
    *
    *   1. starts a deployment,
    *   2. returns to Configure,
    *   3. starts another deployment before the first set
    *      of timers has finished.
    *
    * Without cleanup, both deployments would continue
    * updating the same deploymentProgress state.
    */
    function handleDeploy() {

        clearDeploymentTimeouts();

        setDeploymentProgress(0);
        setActiveStep("deploy");


        /*
        * Every call to setTimeout() returns an ID.
        *
        * Instead of throwing those IDs away, we store them
        * so clearDeploymentTimeouts() can cancel them later.
        */
        const repositoryTimeout = window.setTimeout(() => {
            setDeploymentProgress(1);
        }, 500);


        const dependenciesTimeout = window.setTimeout(() => {
            setDeploymentProgress(2);
        }, 1000);


        const buildTimeout = window.setTimeout(() => {
            setDeploymentProgress(3);
        }, 1500);


        const healthTimeout = window.setTimeout(() => {
            setDeploymentProgress(4);
        }, 2000);


        const liveTimeout = window.setTimeout(() => {
            setDeploymentProgress(5);
        }, 2500);


        /*
        * Store all five timeout IDs in the ref.
        *
        * Changing `.current` does not trigger a React render
        * because refs are intended for mutable values that
        * do not directly control rendered output.
        */
        deploymentTimeoutsRef.current = [
            repositoryTimeout,
            dependenciesTimeout,
            buildTimeout,
            healthTimeout,
            liveTimeout,
        ];
    }



    /*
    * COMPONENT CLEANUP:
    *
    * The empty dependency array means this effect is set up
    * when ProductOverview mounts and is not re-created after
    * normal component renders.
    *
    * The function returned from useEffect() is the cleanup
    * function.
    *
    * React runs that cleanup when ProductOverview unmounts.
    *
    * This prevents deployment timers from continuing to run
    * after the component that created them has disappeared.
    *
    * IMPORTANT:
    *
    * We pass the function reference:
    *
    *   return clearDeploymentTimeouts;
    *
    * We do NOT call it here:
    *
    *   return clearDeploymentTimeouts();
    *
    * Calling it would execute the cleanup immediately.
    * Returning the function gives React something it can
    * execute later during unmount.
    */
    useEffect(() => {

        return clearDeploymentTimeouts;

    }, []);


    return (
        <section
            className="product-overview"
            aria-labelledby="product-overview-title"
        >
            <div className="product-overview__container saas-container">

                <header className="product-overview__header">

                    <span className="product-overview__eyebrow">
                        How it works
                    </span>

                    <div className="product-overview__heading-layout">

                        <h2
                            className="product-overview__title"
                            id="product-overview-title"
                        >
                            From repository to production
                            without the infrastructure work.
                        </h2>

                        <p className="product-overview__description">
                            Connect your repository and configure the
                            runtime. The platform handles builds,
                            deployments, networking, and the
                            infrastructure underneath.
                        </p>

                    </div>

                </header>


                <div className="product-overview__workspace">

                    {/*
                     * The step selector behaves like a tab interface.
                     *
                     * Each button changes `activeStep`, which determines
                     * what content appears in the workspace below.
                     *
                     * `role="tablist"`, `role="tab"`, `aria-selected`,
                     * and `aria-controls` describe that relationship to
                     * assistive technologies.
                     *
                     * We are using buttons because selecting a step is
                     * an interaction on the current page rather than
                     * navigation to another URL.
                     */}
                    <div
                        className="product-overview__steps"
                        role="tablist"
                        aria-label="Deployment workflow"
                    >

                        <button
                            className={
                                activeStep === "connect"
                                    ? "product-overview__step product-overview__step--active"
                                    : "product-overview__step"
                            }
                            type="button"
                            role="tab"
                            aria-selected={activeStep === "connect"}
                            aria-controls="product-panel-connect"
                            id="product-tab-connect"
                            onClick={() => setActiveStep("connect")}
                        >
                            <span className="product-overview__step-number">
                                01
                            </span>

                            <span className="product-overview__step-label">
                                Connect
                            </span>
                        </button>


                        <button
                            className={
                                activeStep === "configure"
                                    ? "product-overview__step product-overview__step--active"
                                    : "product-overview__step"
                            }
                            type="button"
                            role="tab"
                            aria-selected={activeStep === "configure"}
                            aria-controls="product-panel-configure"
                            id="product-tab-configure"
                            onClick={() => setActiveStep("configure")}
                        >
                            <span className="product-overview__step-number">
                                02
                            </span>

                            <span className="product-overview__step-label">
                                Configure
                            </span>
                        </button>


                        <button
                            className={
                                activeStep === "deploy"
                                    ? "product-overview__step product-overview__step--active"
                                    : "product-overview__step"
                            }
                            type="button"
                            role="tab"
                            aria-selected={activeStep === "deploy"}
                            aria-controls="product-panel-deploy"
                            id="product-tab-deploy"
                            onClick={() => setActiveStep("deploy")}
                        >
                            <span className="product-overview__step-number">
                                03
                            </span>

                            <span className="product-overview__step-label">
                                Deploy
                            </span>
                        </button>

                    </div>


                    <div className="product-overview__content">

                        {/*
                         * Only the panel matching `activeStep` is rendered.
                         *
                         * This is conditional rendering:
                         *
                         *   activeStep === "connect"
                         *             ↓
                         *       true / false
                         *
                         * When true, React renders this panel.
                         * When false, React skips it.
                         *
                         * Because inactive panels are removed from the DOM,
                         * users do not tab through controls belonging to a
                         * hidden product state.
                         */}
                        {activeStep === "connect" && (
                            <div
                                className="product-overview__panel"
                                id="product-panel-connect"
                                role="tabpanel"
                                aria-labelledby="product-tab-connect"
                            >

                                <div className="product-overview__panel-intro">

                                    <span className="product-overview__panel-label">
                                        Connect repository
                                    </span>

                                    <h3 className="product-overview__panel-title">
                                        Choose what you want to deploy.
                                    </h3>

                                    <p className="product-overview__panel-description">
                                        Connect a Git repository and select
                                        the branch that should become your
                                        production service.
                                    </p>

                                </div>


                                <div className="product-overview__repository">

                                    <div className="product-overview__repository-header">

                                        <div className="product-overview__repository-identity">

                                            <div className="product-overview__repository-icon">
                                                <Code2
                                                    size={18}
                                                    aria-hidden="true"
                                                />
                                            </div>

                                            <div className="product-overview__repository-name-group">

                                                <span className="product-overview__repository-owner">
                                                    acme
                                                </span>

                                                <strong className="product-overview__repository-name">
                                                    production-api
                                                </strong>

                                            </div>

                                        </div>

                                        <span className="product-overview__repository-status">
                                            <Check
                                                size={12}
                                                aria-hidden="true"
                                            />

                                            Connected
                                        </span>

                                    </div>


                                    <div className="product-overview__repository-details">

                                        <div className="product-overview__repository-detail">

                                            <GitBranch
                                                className="product-overview__repository-detail-icon"
                                                size={15}
                                                aria-hidden="true"
                                            />

                                            <span className="product-overview__repository-detail-label">
                                                Branch
                                            </span>

                                            <strong className="product-overview__repository-detail-value">
                                                main
                                            </strong>

                                        </div>


                                        <div className="product-overview__repository-detail">

                                            <Box
                                                className="product-overview__repository-detail-icon"
                                                size={15}
                                                aria-hidden="true"
                                            />

                                            <span className="product-overview__repository-detail-label">
                                                Detected
                                            </span>

                                            <strong className="product-overview__repository-detail-value">
                                                Node.js 22
                                            </strong>

                                        </div>

                                    </div>


                                    <button
                                        className="product-overview__continue-button"
                                        type="button"
                                        onClick={() => setActiveStep("configure")}
                                    >
                                        Configure service

                                        <ArrowRight
                                            className="product-overview__continue-icon"
                                            size={15}
                                            aria-hidden="true"
                                        />
                                    </button>

                                </div>

                            </div>
                        )}


                        {/*
                         * These two panels are intentionally minimal for
                         * now.
                         *
                         * Their purpose in this first implementation is
                         * simply to prove that activeStep correctly swaps
                         * the workspace content.
                         *
                         * Once we verify that behavior, we'll replace each
                         * placeholder with its real product interface.
                         */}
                        {activeStep === "configure" && (
                            <div
                                className="product-overview__panel"
                                id="product-panel-configure"
                                role="tabpanel"
                                aria-labelledby="product-tab-configure"
                            >

                                <div className="product-overview__panel-intro">

                                    <span className="product-overview__panel-label">
                                        Configure service
                                    </span>

                                    <h3 className="product-overview__panel-title">
                                        Define what your service needs.
                                    </h3>

                                    <p className="product-overview__panel-description">
                                        Choose runtime resources, deployment region,
                                        and environment configuration without
                                        provisioning infrastructure manually.
                                    </p>

                                </div>


                                <div className="product-overview__configuration">

                                    <div className="product-overview__configuration-header">

                                        <div className="product-overview__configuration-identity">

                                            <Settings2
                                                className="product-overview__configuration-icon"
                                                size={18}
                                                aria-hidden="true"
                                            />

                                            <div className="product-overview__configuration-name-group">

                                                <span className="product-overview__configuration-label">
                                                    Service
                                                </span>

                                                <strong className="product-overview__configuration-name">
                                                    production-api
                                                </strong>

                                            </div>

                                        </div>

                                        <span className="product-overview__configuration-runtime">
                                            Node.js 22
                                        </span>

                                    </div>


                                    {/*
                                    * These controls visually represent infrastructure
                                    * configuration inside the fictional product.
                                    *
                                    * They are intentionally buttons rather than actual
                                    * form controls for now because this walkthrough is
                                    * demonstrating the deployment workflow rather than
                                    * implementing a real infrastructure configuration
                                    * form.
                                    *
                                    * Later, if we decide these values should actually be
                                    * editable, we can promote them into controlled React
                                    * inputs/selects with their own state.
                                    */}
                                    <div className="product-overview__configuration-grid">

                                        <button
                                            className="product-overview__configuration-control"
                                            type="button"
                                        >
                                            <Cpu
                                                className="product-overview__configuration-control-icon"
                                                size={16}
                                                aria-hidden="true"
                                            />

                                            <span className="product-overview__configuration-control-content">

                                                <span className="product-overview__configuration-control-label">
                                                    CPU
                                                </span>

                                                <strong className="product-overview__configuration-control-value">
                                                    2 vCPU
                                                </strong>

                                            </span>

                                            <ChevronDown
                                                className="product-overview__configuration-control-chevron"
                                                size={14}
                                                aria-hidden="true"
                                            />
                                        </button>


                                        <button
                                            className="product-overview__configuration-control"
                                            type="button"
                                        >
                                            <MemoryStick
                                                className="product-overview__configuration-control-icon"
                                                size={16}
                                                aria-hidden="true"
                                            />

                                            <span className="product-overview__configuration-control-content">

                                                <span className="product-overview__configuration-control-label">
                                                    Memory
                                                </span>

                                                <strong className="product-overview__configuration-control-value">
                                                    4 GB
                                                </strong>

                                            </span>

                                            <ChevronDown
                                                className="product-overview__configuration-control-chevron"
                                                size={14}
                                                aria-hidden="true"
                                            />
                                        </button>


                                        <button
                                            className="product-overview__configuration-control"
                                            type="button"
                                        >
                                            <Globe2
                                                className="product-overview__configuration-control-icon"
                                                size={16}
                                                aria-hidden="true"
                                            />

                                            <span className="product-overview__configuration-control-content">

                                                <span className="product-overview__configuration-control-label">
                                                    Region
                                                </span>

                                                <strong className="product-overview__configuration-control-value">
                                                    US West
                                                </strong>

                                            </span>

                                            <ChevronDown
                                                className="product-overview__configuration-control-chevron"
                                                size={14}
                                                aria-hidden="true"
                                            />
                                        </button>


                                        <button
                                            className="product-overview__configuration-control"
                                            type="button"
                                        >
                                            <Database
                                                className="product-overview__configuration-control-icon"
                                                size={16}
                                                aria-hidden="true"
                                            />

                                            <span className="product-overview__configuration-control-content">

                                                <span className="product-overview__configuration-control-label">
                                                    Replicas
                                                </span>

                                                <strong className="product-overview__configuration-control-value">
                                                    3 instances
                                                </strong>

                                            </span>

                                            <ChevronDown
                                                className="product-overview__configuration-control-chevron"
                                                size={14}
                                                aria-hidden="true"
                                            />
                                        </button>

                                    </div>


                                    <div className="product-overview__environment">

                                        <div className="product-overview__environment-header">

                                            <div className="product-overview__environment-heading">

                                                <span className="product-overview__environment-title">
                                                    Environment variables
                                                </span>

                                                <span className="product-overview__environment-count">
                                                    3 variables
                                                </span>

                                            </div>

                                            <span className="product-overview__environment-status">
                                                Encrypted
                                            </span>

                                        </div>


                                        <div className="product-overview__environment-list">

                                            <div className="product-overview__environment-variable">
                                                <code className="product-overview__environment-key">
                                                    DATABASE_URL
                                                </code>

                                                <span className="product-overview__environment-value">
                                                    ••••••••••••
                                                </span>
                                            </div>

                                            <div className="product-overview__environment-variable">
                                                <code className="product-overview__environment-key">
                                                    REDIS_URL
                                                </code>

                                                <span className="product-overview__environment-value">
                                                    ••••••••••••
                                                </span>
                                            </div>

                                            <div className="product-overview__environment-variable">
                                                <code className="product-overview__environment-key">
                                                    API_SECRET
                                                </code>

                                                <span className="product-overview__environment-value">
                                                    ••••••••••••
                                                </span>
                                            </div>

                                        </div>

                                    </div>


                                    <button
                                        className="product-overview__continue-button"
                                        type="button"
                                        onClick={handleDeploy}
                                    >
                                        Deploy service

                                        <ArrowRight
                                            className="product-overview__continue-icon"
                                            size={15}
                                            aria-hidden="true"
                                        />
                                    </button>

                                </div>

                            </div>
                        )}


                        {activeStep === "deploy" && (
                            <div
                                className="product-overview__panel"
                                id="product-panel-deploy"
                                role="tabpanel"
                                aria-labelledby="product-tab-deploy"
                            >

                                <div className="product-overview__panel-intro">

                                    <span className="product-overview__panel-label">
                                        Deploy service
                                    </span>

                                    <h3 className="product-overview__panel-title">
                                        From commit to production.
                                    </h3>

                                    <p className="product-overview__panel-description">
                                        The platform builds your application,
                                        deploys it across the selected infrastructure,
                                        verifies its health, and exposes the
                                        production endpoint.
                                    </p>

                                </div>


                                <div className="product-overview__deployment">

                                    <div className="product-overview__deployment-header">

                                        <div className="product-overview__deployment-identity">

                                            <Rocket
                                                className="product-overview__deployment-icon"
                                                size={18}
                                                aria-hidden="true"
                                            />

                                            <div className="product-overview__deployment-name-group">

                                                <span className="product-overview__deployment-label">
                                                    Deployment
                                                </span>

                                                <strong className="product-overview__deployment-name">
                                                    production-api #1842
                                                </strong>

                                            </div>

                                        </div>

                                        {/*
                                        * The deployment status changes based on React state.
                                        *
                                        * Before progress reaches 5, the deployment is still
                                        * running.
                                        *
                                        * At progress 5, the deployment has completed and the
                                        * status changes to Live.
                                        */}
                                        <span
                                            className={
                                                deploymentProgress === 5
                                                    ? "product-overview__deployment-status product-overview__deployment-status--live"
                                                    : "product-overview__deployment-status product-overview__deployment-status--building"
                                            }
                                        >
                                            {deploymentProgress === 5 ? (
                                                <>
                                                    <Check
                                                        size={12}
                                                        aria-hidden="true"
                                                    />

                                                    Live
                                                </>
                                            ) : (
                                                <>
                                                    <span
                                                        className="product-overview__deployment-spinner"
                                                        aria-hidden="true"
                                                    />

                                                    Deploying
                                                </>
                                            )}
                                        </span>

                                    </div>


                                    {/* 
                                    * Deployment metadata explains exactly what
                                    * source revision produced this deployment.
                                    *
                                    * The layout is intentionally compact because
                                    * this information behaves like technical
                                    * metadata rather than primary page content.
                                    */}
                                    <div className="product-overview__deployment-meta">

                                        <div className="product-overview__deployment-meta-item">

                                            <GitBranch
                                                className="product-overview__deployment-meta-icon"
                                                size={14}
                                                aria-hidden="true"
                                            />

                                            <span className="product-overview__deployment-meta-label">
                                                Branch
                                            </span>

                                            <strong className="product-overview__deployment-meta-value">
                                                main
                                            </strong>

                                        </div>


                                        <div className="product-overview__deployment-meta-item">

                                            <Code2
                                                className="product-overview__deployment-meta-icon"
                                                size={14}
                                                aria-hidden="true"
                                            />

                                            <span className="product-overview__deployment-meta-label">
                                                Commit
                                            </span>

                                            <strong className="product-overview__deployment-meta-value">
                                                a84fc91
                                            </strong>

                                        </div>

                                    </div>


                                    {/* 
                                    * These stages represent the deployment lifecycle.
                                    *
                                    * They are static completed states for this first
                                    * implementation.
                                    *
                                    * Once the layout is verified, we can animate these
                                    * stages sequentially using the same general concept
                                    * as the Hero pipeline without duplicating the exact
                                    * Hero animation.
                                    */}
                                    <div className="product-overview__deployment-stages">

                                        <div className="product-overview__deployment-stage">

                                            <span
                                                className={
                                                    deploymentProgress >= 3
                                                        ? "product-overview__deployment-stage-marker product-overview__deployment-stage-marker--complete"
                                                        : "product-overview__deployment-stage-marker"
                                                }
                                            >
                                                {deploymentProgress >= 3 && (
                                                    <Check
                                                        size={11}
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </span>

                                            <span className="product-overview__deployment-stage-label">
                                                Build
                                            </span>

                                        </div>


                                        {/*
                                        * CONNECTOR: Build → Deploy
                                        *
                                        * Build completes at deploymentProgress 3.
                                        *
                                        * Once the build has completed, this connector receives
                                        * the --complete modifier so the visual pipeline can
                                        * progress toward the Deploy stage.
                                        */}
                                        <span
                                            className={
                                                deploymentProgress >= 3
                                                    ? "product-overview__deployment-stage-line product-overview__deployment-stage-line--complete"
                                                    : "product-overview__deployment-stage-line"
                                            }
                                            aria-hidden="true"
                                        />


                                        <div className="product-overview__deployment-stage">

                                            <span
                                                className={
                                                    deploymentProgress >= 4
                                                        ? "product-overview__deployment-stage-marker product-overview__deployment-stage-marker--complete"
                                                        : "product-overview__deployment-stage-marker"
                                                }
                                            >
                                                {deploymentProgress >= 4 && (
                                                    <Check
                                                        size={11}
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </span>

                                            <span className="product-overview__deployment-stage-label">
                                                Deploy
                                            </span>

                                        </div>


                                        {/*
                                        * CONNECTOR: Deploy → Verify
                                        *
                                        * At progress 4, deployment and health verification have
                                        * been reached, so this connector becomes complete.
                                        */}
                                        <span
                                            className={
                                                deploymentProgress >= 4
                                                    ? "product-overview__deployment-stage-line product-overview__deployment-stage-line--complete"
                                                    : "product-overview__deployment-stage-line"
                                            }
                                            aria-hidden="true"
                                        />

                                        <div className="product-overview__deployment-stage">

                                            <span
                                                className={
                                                    deploymentProgress >= 4
                                                        ? "product-overview__deployment-stage-marker product-overview__deployment-stage-marker--complete"
                                                        : "product-overview__deployment-stage-marker"
                                                }
                                            >
                                                {deploymentProgress >= 4 && (
                                                    <Check
                                                        size={11}
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </span>

                                            <span className="product-overview__deployment-stage-label">
                                                Verify
                                            </span>

                                        </div>

                                        {/*
                                        * CONNECTOR: Verify → Live
                                        *
                                        * The final connector only completes once the deployment
                                        * reaches progress 5 and the service becomes live.
                                        */}
                                        <span
                                            className={
                                                deploymentProgress >= 5
                                                    ? "product-overview__deployment-stage-line product-overview__deployment-stage-line--complete"
                                                    : "product-overview__deployment-stage-line"
                                            }
                                            aria-hidden="true"
                                        />

                                        <div className="product-overview__deployment-stage">

                                            <span
                                                className={
                                                    deploymentProgress === 5
                                                        ? "product-overview__deployment-stage-marker product-overview__deployment-stage-marker--live"
                                                        : "product-overview__deployment-stage-marker"
                                                }
                                            >
                                                {deploymentProgress === 5 && (
                                                    <Check
                                                        size={11}
                                                        aria-hidden="true"
                                                    />
                                                )}
                                            </span>

                                            <span className="product-overview__deployment-stage-label">
                                                Live
                                            </span>

                                        </div>

                                    </div>


                                    {/* 
                                    * The log panel visually resembles terminal output,
                                    * but it is not an interactive terminal.
                                    *
                                    * <code> is appropriate for each log message because
                                    * the content represents machine-generated technical
                                    * output.
                                    */}
                                    <div className="product-overview__logs">

                                        <div className="product-overview__logs-header">

                                            <div className="product-overview__logs-title-group">

                                                <Terminal
                                                    className="product-overview__logs-icon"
                                                    size={14}
                                                    aria-hidden="true"
                                                />

                                                <span className="product-overview__logs-title">
                                                    Deployment logs
                                                </span>

                                            </div>

                                            <span className="product-overview__logs-duration">
                                                38.4s
                                            </span>

                                        </div>


                                        <div className="product-overview__logs-output">

                                            {deploymentProgress >= 1 && (
                                                <div className="product-overview__log-line">
                                                    <span className="product-overview__log-time">
                                                        00:02
                                                    </span>

                                                    <code className="product-overview__log-message">
                                                        Repository cloned successfully
                                                    </code>
                                                </div>
                                            )}


                                            {deploymentProgress >= 2 && (
                                                <div className="product-overview__log-line">
                                                    <span className="product-overview__log-time">
                                                        00:08
                                                    </span>

                                                    <code className="product-overview__log-message">
                                                        Installing production dependencies
                                                    </code>
                                                </div>
                                            )}


                                            {deploymentProgress >= 3 && (
                                                <div className="product-overview__log-line">
                                                    <span className="product-overview__log-time">
                                                        00:21
                                                    </span>

                                                    <code className="product-overview__log-message">
                                                        Build completed
                                                    </code>
                                                </div>
                                            )}


                                            {deploymentProgress >= 4 && (
                                                <div className="product-overview__log-line">
                                                    <span className="product-overview__log-time">
                                                        00:32
                                                    </span>

                                                    <code className="product-overview__log-message">
                                                        Health checks passed
                                                    </code>
                                                </div>
                                            )}


                                            {deploymentProgress >= 5 && (
                                                <div className="product-overview__log-line product-overview__log-line--success">
                                                    <span className="product-overview__log-time">
                                                        00:38
                                                    </span>

                                                    <code className="product-overview__log-message">
                                                        Deployment is live
                                                    </code>
                                                </div>
                                            )}

                                        </div>

                                    </div>


                                    {deploymentProgress === 5 && (
                                        <div className="product-overview__endpoint">

                                            <div className="product-overview__endpoint-content">

                                                <span className="product-overview__endpoint-label">
                                                    Production endpoint
                                                </span>

                                                <code className="product-overview__endpoint-url">
                                                    production-api.nexora.app
                                                </code>

                                            </div>

                                            <ExternalLink
                                                className="product-overview__endpoint-icon"
                                                size={15}
                                                aria-hidden="true"
                                            />

                                        </div>
                                    )}

                                </div>

                            </div>
                        )}

                    </div>

                </div>

            </div>
        </section>
    );
}

export default ProductOverview;