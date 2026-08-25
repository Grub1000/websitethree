// CSS Styling Import
import "../../css/job_application_tracker/JobApplicationEditStatusPopUp.css"

import {updateJobApplication} from "../../api/job_application_service.tsx"

import exitIcon from "../../assets/burger_menu_exit_svg.svg"

export default function JobApplicationEditStatusPopUp(
{
    selectedJobCurrentStatus,
    selectedJobCurrentApplicationID,
    handleEditStatusPopUpIsVisible,
}:{
    selectedJobCurrentStatus: string,
    selectedJobCurrentApplicationID: string,
    handleEditStatusPopUpIsVisible: (bool:boolean) => void
}
){
    return(
        <div className="JobApplicationEditStatusPopUpWrapper">
            <div className="JobApplicationEditStatusOrderedListWrapper">
                <button onClick={()=> handleEditStatusPopUpIsVisible(false)} className="JobApplicationEditStatusPopUpExitButton">
                    <img className="JobApplicationEditStatusPopUpExitIcon" src={exitIcon}></img>
                </button>
                <ol >
                    { selectedJobCurrentStatus == "saved" ?
                    <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "saved"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton" style={{backgroundColor: "#08a0cec7"}}>Saved</button></li>
                    :
                    <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "saved"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton">Saved</button></li>
                    }
                    {/* <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "saved"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton">Saved</button></li> */}
                    { selectedJobCurrentStatus == "applied" ? 
                    <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "applied"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton" style={{backgroundColor: "#08a0cec7"}}>Applied</button></li>
                    :
                    <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "applied"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton">Applied</button></li>
                    }
                    { selectedJobCurrentStatus == "interview" ?
                    <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "interview"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton" style={{backgroundColor: "#08a0cec7"}}>Interviewing</button></li>
                    :
                    <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "interview"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton">Interviewing</button></li>
                    }
                    { selectedJobCurrentStatus == "offer" ? 
                    <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "offer"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton" style={{backgroundColor: "#08a0cec7"}}>Offered</button></li>
                    :
                    <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "offer"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton">Offered</button></li>
                    }
                    {/* { selectedJobCurrentStatus == "rejected" ?
                    <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "rejected"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton" style={{backgroundColor: "#08a0cec7"}}>Rejected</button></li>
                    :
                    <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "rejected"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton">Rejected</button></li>
                    }
                    { selectedJobCurrentStatus == "withdrawn" ? 
                    <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "withdrawn"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton" style={{backgroundColor: "#08a0cec7"}}>Withdrawn</button></li>
                    :
                    <li><button onClick={async ()=> {await updateJobApplication(selectedJobCurrentApplicationID, {status: "withdrawn"}); handleEditStatusPopUpIsVisible(false)}} className="JobApplicationEditStatusOrderedListButton">Withdrawn</button></li>       
                    } */}
                </ol>
            </div>
            {/* <p>{selectedJobCurrentStatus}</p>
            <p>{selectedJobCurrentApplicationID}</p> */}
        </div>
    )
}