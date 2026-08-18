// import { useState } from 'react'
import '../../css/resume_analyzer_css/ResumeAnalyzerDashboardHeaderButton.css'
import newIconUrl from "../../assets/website_tab_logo.png"

const handleDropdown = (eventType:string, ddNum:number, buttonID:string) => {
    const dropdowns = document.getElementsByClassName("ResumeAnalyzerDashboardHeaderButtonDropdown") as HTMLCollectionOf<HTMLElement>;
    const button = document.getElementById(buttonID) as HTMLElement;
    const rect = button.getBoundingClientRect();
    // console.log("Pixels from left (viewport):", rect.left);
    const absoluteLeft = rect.left + window.scrollX;

    if(eventType == "mouseIn"){
        dropdowns[ddNum].style.display = "block";dropdowns[ddNum].style.left = absoluteLeft + "px";
    }
    else if(eventType == "mouseOut"){
        dropdowns[ddNum].style.display = "none"
    }
}

export default function ResumeAnalyzerDashboardHeaderButton({
    button,
}:{
    button: {
        title: string,
        order: number,
        link: string,
    }
}) {

    // Start the process of updating the tab icon
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    // If it doesn't exist, create a new one
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    // Update the icon path
    link.href = newIconUrl;
    // const [count, setCount] = useState(0);

  return (
    <>
    <button className="ResumeAnalyzerDashboardHeaderButton" id={button.title + "Button"} onMouseEnter={()=> handleDropdown("mouseIn", button.order, button.title + "Button")} onMouseLeave={()=> handleDropdown("mouseOut", button.order, button.title + "Button")}>{button.title}</button>
    <div className="ResumeAnalyzerDashboardHeaderButtonDropdown" id="templatesDropdownWrapper" onMouseEnter={()=>handleDropdown("mouseIn", button.order, button.title + "Button")} onMouseLeave={()=> handleDropdown("mouseOut", button.order, button.title + "Button")}>
        {/* <div className="ResumeAnalyzerDashboardHeaderButtonDropdownButtonWrapper">
            <button className="ResumeAnalyzerDashboardHeaderButtonDropdownButton">
                <div className="ResumeAnalyzerDashboardHeaderButtonDropdownButtonColorPad"></div>
                <h5 className="ResumeAnalyzerDashboardHeaderButtonDropdownButtonTopText">Coming Soon...</h5>
                <p className="ResumeAnalyzerDashboardHeaderButtonDropdownButtonBottomText">ResuScan button</p>
            </button>
            <button className="ResumeAnalyzerDashboardHeaderButtonDropdownButton">
                <div className="ResumeAnalyzerDashboardHeaderButtonDropdownButtonColorPad"></div>
                <h5 className="ResumeAnalyzerDashboardHeaderButtonDropdownButtonTopText">Coming Soon...</h5>
                <p className="ResumeAnalyzerDashboardHeaderButtonDropdownButtonBottomText">ResuScan button</p>
            </button>
        </div> */}
    </div>
    </>
  );

}