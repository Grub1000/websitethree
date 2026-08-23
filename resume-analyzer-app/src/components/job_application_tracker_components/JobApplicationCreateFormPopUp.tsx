import "../../css/job_application_tracker/JobApplicationCreateFormPopUp.css"


export default function JobApplicationCreateFormPopUp(
    {
        handleSetCreateFormIsVisible,
    }:{
        handleSetCreateFormIsVisible: (state: boolean) => void        
    }
){

    return(
        <div className="JobApplicationCreateFormPopUpWrapper">
            <div onClick={()=> handleSetCreateFormIsVisible(false)}>Exit</div>    
            <form className="JobApplicationCreateForm">
                <input/>
                <input/>
                <input/>
            </form>
        </div>
    )
}