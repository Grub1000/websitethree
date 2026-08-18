// React Router imports
import {useNavigate } from "react-router-dom";

// CSS Imports
import "../css/home_page_css/HeaderButtonDropdownButton.css"

export default function HeaderButtonDropdownButton(
{
    button
}:{
    button: {
        title: string,
        link: string,
        description: string,
    }
}){

    const navigate = useNavigate();

    return(
        <button className="HeaderButtonDropdownButton" onClick={()=> navigate(button.link)}>
            <div className="HeaderButtonDropdownButtonColorPad"></div>
            <h5 className="HeaderButtonDropdownButtonTopText">{button.title}</h5>
            <p className="HeaderButtonDropdownButtonBottomText">{button.description}</p>
        </button>  
    )
}