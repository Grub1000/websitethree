// import { useState } from 'react'
import '../css/HeaderButton.css'
import newIconUrl from "../assets/website_tab_logo.png"

const handleDropdown = (eventType:string, ddNum:number, buttonID:string) => {
    const dropdowns = document.getElementsByClassName("HeaderButtonDropdown") as HTMLCollectionOf<HTMLElement>;
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

export default function HeaderButton({
    button,
}:{
    button: {
        title: string,
        order: number,
        dropdownButtons: {},
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
    <button className="HeaderButton" id={button.title + "Button"} onMouseEnter={()=> handleDropdown("mouseIn", button.order, button.title + "Button")} onMouseLeave={()=> handleDropdown("mouseOut", button.order, button.title + "Button")}>{button.title}</button>
    <div className="HeaderButtonDropdown" id="templatesDropdownWrapper" onMouseEnter={()=>handleDropdown("mouseIn", button.order, button.title + "Button")} onMouseLeave={()=> handleDropdown("mouseOut", button.order, button.title + "Button")}>
        <div className="HeaderButtonDropdownButtonWrapper">
            <button className="HeaderButtonDropdownButton">
                <div className="HeaderButtonDropdownButtonColorPad"></div>
                <h5 className="HeaderButtonDropdownButtonTopText">Coming Soon...</h5>
                <p className="HeaderButtonDropdownButtonBottomText">Merch-store mock up example</p>
            </button>
            <button className="HeaderButtonDropdownButton">
                <div className="HeaderButtonDropdownButtonColorPad"></div>
                <h5 className="HeaderButtonDropdownButtonTopText">Coming Soon...</h5>
                <p className="HeaderButtonDropdownButtonBottomText">Porfolio site mock up example</p>
            </button>
        </div>
    </div>
    </>
  );

}
