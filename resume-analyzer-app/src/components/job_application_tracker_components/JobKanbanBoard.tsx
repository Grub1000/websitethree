import type {
    JobApplication,
    JobApplicationStatus,
} from "../../api/job_application_service";

import "../../css/job_application_tracker/JobKanbanBoard.css"

type JobKanbanBoardProps = {
    applications: JobApplication[];

    onStatusChange?: (
        applicationId: string,
        status: JobApplicationStatus
    ) => void;

    onApplicationClick?: (
        application: JobApplication
    ) => void;
};


type KanbanColumn = {
    title: string;
    status: JobApplicationStatus;
};


const columns: KanbanColumn[] = [
    {
        title: "Saved",
        status: "saved",
    },
    {
        title: "Applied",
        status: "applied",
    },
    {
        title: "Interview",
        status: "interview",
    },
    {
        title: "Offer",
        status: "offer",
    },
];


export default function JobKanbanBoard({
    applications,
    onStatusChange,
    onApplicationClick,
}: JobKanbanBoardProps) {

    function getApplicationsByStatus(
        status: JobApplicationStatus
    ) {
        return applications.filter(
            (application) =>
                application.status === status
        );
    }


    // function formatDate(
    //     date: string | null
    // ) {
    //     if (!date) {
    //         return "No date";
    //     }

    //     return new Date(
    //         `${date}T00:00:00`
    //     ).toLocaleDateString(
    //         "en-US",
    //         {
    //             month: "short",
    //             day: "numeric",
    //             year: "numeric",
    //         }
    //     );
    // }


    function formatSalary(
        application: JobApplication
    ) {
        if (
            !application.salary_min &&
            !application.salary_max
        ) {
            return null;
        }

        const formatter =
            new Intl.NumberFormat(
                "en-US",
                {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                }
            );


        if (
            application.salary_min &&
            application.salary_max
        ) {
            return (
                `${formatter.format(
                    Number(
                        application.salary_min
                    )
                )} - ` +
                formatter.format(
                    Number(
                        application.salary_max
                    )
                )
            );
        }


        if (application.salary_min) {
            return (
                `${formatter.format(
                    Number(
                        application.salary_min
                    )
                )}+`
            );
        }


        return formatter.format(
            Number(
                application.salary_max
            )
        );
    }


    return (
        <section className="JobKanbanBoardSection">

            <div className="JobKanbanBoardHeader">

                <div>
                    <h2 className="JobKanbanBoardTitle">
                        Job Tracker
                    </h2>

                    <p className="JobKanbanBoardSubtitle">
                        Keep track of your job search
                        from saved roles to offers.
                    </p>
                </div>

                <button
                    type="button"
                    className="JobKanbanAddButton"
                >
                    <span>
                        +
                    </span>

                    Add Job
                </button>

            </div>


            <div className="JobKanbanBoard">

                {columns.map((column) => {

                    const columnApplications =
                        getApplicationsByStatus(
                            column.status
                        );


                    return (
                        <section
                            key={column.status}
                            className="JobKanbanColumn"
                        >

                            <header
                                className="JobKanbanColumnHeader"
                            >

                                <h3>
                                    {column.title}
                                </h3>

                                <span
                                    className="JobKanbanColumnCount"
                                >
                                    {
                                        columnApplications.length
                                    }
                                </span>

                            </header>


                            <div
                                className="JobKanbanColumnBody"
                            >

                                {
                                    columnApplications.length === 0
                                        ? (
                                            <div
                                                className="JobKanbanEmpty"
                                            >
                                                No applications
                                            </div>
                                        )
                                        : (
                                            columnApplications.map(
                                                (
                                                    application
                                                ) => {

                                                    const salary =
                                                        formatSalary(
                                                            application
                                                        );


                                                    return (
                                                        <article
                                                            key={
                                                                application.application_id
                                                            }
                                                            className="JobKanbanCard"
                                                            onClick={() =>
                                                                onApplicationClick?.(
                                                                    application
                                                                )
                                                            }
                                                        >

                                                            <div
                                                                className="JobKanbanCardHeader"
                                                            >

                                                                <div
                                                                    className="JobKanbanCompanyIcon"
                                                                >
                                                                    {
                                                                        application.company_name
                                                                            .charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase()
                                                                    }
                                                                </div>


                                                                <button
                                                                    type="button"
                                                                    className="JobKanbanMenuButton"
                                                                    onClick={(
                                                                        event
                                                                    ) => {
                                                                        event.stopPropagation();
                                                                    }}
                                                                >
                                                                    •••
                                                                </button>

                                                            </div>


                                                            <h4
                                                                className="JobKanbanCardTitle"
                                                            >
                                                                {
                                                                    application.job_title
                                                                }
                                                            </h4>


                                                            <p
                                                                className="JobKanbanCompany"
                                                            >
                                                                {
                                                                    application.company_name
                                                                }
                                                            </p>


                                                            {
                                                                application.location &&
                                                                (
                                                                    <p
                                                                        className="JobKanbanCardMeta"
                                                                    >
                                                                        {
                                                                            application.location
                                                                        }
                                                                    </p>
                                                                )
                                                            }


                                                            {
                                                                salary &&
                                                                (
                                                                    <p
                                                                        className="JobKanbanCardMeta"
                                                                    >
                                                                        {
                                                                            salary
                                                                        }
                                                                    </p>
                                                                )
                                                            }


                                                            <div
                                                                className="JobKanbanCardFooter"
                                                            >

                                                                <span>
                                                                    {
                                                                        application.date_applied
                                                                            ? `Applied ${new Date(application.date_applied).toLocaleDateString("en-US", {
                                                                                month: "short",
                                                                                day: "numeric",
                                                                                year: "numeric",
                                                                            })}`
                                                                            : `Added ${new Date(application.created_at).toLocaleDateString("en-US", {
                                                                                month: "short",
                                                                                day: "numeric",
                                                                                year: "numeric",
                                                                            })}`
                                                                    }
                                                                </span>


                                                                <select
                                                                    value={
                                                                        application.status
                                                                    }
                                                                    onClick={(
                                                                        event
                                                                    ) =>
                                                                        event.stopPropagation()
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) => {
                                                                        onStatusChange?.(
                                                                            application.application_id,
                                                                            event.target.value as JobApplicationStatus
                                                                                
                                                                        );
                                                                    }}
                                                                    className="JobKanbanStatusSelect"
                                                                >
                                                                    <option value="saved">
                                                                        Saved
                                                                    </option>

                                                                    <option value="applied">
                                                                        Applied
                                                                    </option>

                                                                    <option value="interview">
                                                                        Interview
                                                                    </option>

                                                                    <option value="offer">
                                                                        Offer
                                                                    </option>

                                                                    {/* <option value="rejected">
                                                                        Rejected
                                                                    </option>

                                                                    <option value="withdrawn">
                                                                        Withdrawn
                                                                    </option> */}

                                                                </select>

                                                            </div>

                                                        </article>
                                                    );
                                                }
                                            )
                                        )
                                }

                            </div>

                        </section>
                    );
                })}

            </div>

        </section>
    );
}