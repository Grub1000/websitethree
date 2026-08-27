
import "../../css/resume_analyzer_css/ConfirmDelete.css"


export default function ConfirmDelete(
{
    itemName,
    itemID,
    handleDelete,
    handleCancelDelete,
    handleToggleConfirmDeletePopUp

}:{
    itemName:string,
    itemID: string,
    handleDelete: (id: string) => Promise<void>,
    handleCancelDelete: () => void,
    handleToggleConfirmDeletePopUp: (bool: boolean) => void
}
){

    return(
        <div className="ConfirmDeleteSuperWrapper">
            <div className="ConfirmDeleteWrapper">
                <h2 className="ConfirmDeleteMessage">Delete {itemName}?</h2>
                <button className="Button CancelDeleteButton" onClick={()=> handleCancelDelete()}>Cancel</button>
                <button className="Button ConfirmDeleteButton" onClick={async ()=> {await handleDelete(itemID); handleToggleConfirmDeletePopUp(false);}}>Delete</button>
            </div>
        </div>
    )
}