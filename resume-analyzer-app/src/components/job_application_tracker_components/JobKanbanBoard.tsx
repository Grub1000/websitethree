import {useState, useEffect} from 'react'
import{
    type JobApplication,
    type JobApplicationStatus,
    deleteJobApplication
} from "../../api/job_application_service";

import "../../css/job_application_tracker/JobKanbanBoard.css"

import JobApplicationCreateFormPopUp from "../job_application_tracker_components/JobApplicationCreateFormPopUp.tsx"

import trashIconSVG from "../../assets/trash_bin_svg.svg"

type JobKanbanBoardProps = {
    applications: JobApplication[];

    onStatusChange?: (
        applicationId: string,
        status: JobApplicationStatus
    ) => void;

    onApplicationClick?: (
        application: JobApplication
    ) => void;

    handleGetJobApplications: () => void
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
    handleGetJobApplications,
}: JobKanbanBoardProps) {

    const [createFormIsVisible, setCreateFormIsVisible] = useState(false)

    useEffect(()=> {
        function handleClick(event: MouseEvent) {
            const target = event.target as HTMLElement;
            console.log("clicked")
            if (
                !target.closest(".JobKanbanMenuDropdownWrapper") 
                // &&
                // !target.closest(".JobKanbanMenuButton")
            ) {
                document
                    .querySelectorAll<HTMLElement>(".JobKanbanMenuDropdownWrapper")
                    .forEach(dropdown => {
                        dropdown.style.display = "none";
                    });
            }
        }

        document.addEventListener("mousedown", handleClick);

        // Before I destroy this component (or before rerunning this effect), call this method (return). Prevents Memory Leak
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };

    }, [])













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

    function handleDropDown(id:string){
        const allDropdownWrappers = document.querySelectorAll<HTMLElement>(".JobKanbanMenuDropdownWrapper")
        allDropdownWrappers.forEach((dropdownWrapper)=> dropdownWrapper.style.display = "none")
        const targetDropdownWrapper = document.getElementById(id) as HTMLElement
        targetDropdownWrapper.style.display = "block"
    }

    async function handleJobDelete(id:string){
        await deleteJobApplication(id)
        handleGetJobApplications()
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
                    onClick={()=> setCreateFormIsVisible(true)}
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

                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="JobKanbanMenuButton"
                                                                        onClick={(
                                                                            event
                                                                            
                                                                        ) => {
                                                                            event.stopPropagation();
                                                                            handleDropDown(application.application_id);
                                                                        }}
                                                                    >
                                                                        •••
                                                                    </button>
                                                                    <div className="JobKanbanMenuDropdownWrapper" id={application.application_id}>
                                                                        <button className="JobKanbanMenuDropdownDeleteButton" onClick={()=> handleJobDelete(application.application_id)}>
                                                                            <img src={trashIconSVG} className="JobKanbanMenuDropdownDeleteButtonIcon"></img>
                                                                            <p className="JobKanbanMenuDropdownDeleteButtonText">Delete</p>
                                                                        </button>
                                                                    </div>
                                                                </div>

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
            {createFormIsVisible && <JobApplicationCreateFormPopUp handleSetCreateFormIsVisible={setCreateFormIsVisible} loadJobApplications={handleGetJobApplications}/>}
        </section>
    );
}