import { useEffect } from 'react'


// CSS Style Sheet Import
import '../../css/resume_analyzer_css/ResumeAnalyzerDashboardHeaderButton.css'

// Image Asset Imports
import newIconUrl from "../../assets/website_tab_logo.png"

// React Router Imports
import { useNavigate, useLocation } from 'react-router-dom';


export default function ResumeAnalyzerDashboardHeaderButton({
    button,
}:{
    button: {
        title: string,
        order: number,
        link: string,
    }
}) {
    const location = useLocation();

    useEffect(()=> {
        // Ensures The Correct Button is Highlight Styled On Refresh, Load, or Redirect.
        if(location.pathname == button.link || location.pathname == button.link.slice(0, -1) || location.pathname == button.link + "/"){
            let clickedButton = document.getElementById(button.title + "Button") as HTMLElement
            clickedButton.style.color = "rgb(19, 145, 184)";
            clickedButton.style.borderBottom = "2px solid rgb(19, 145, 184)"
        }
    }, [])

    const navigate = useNavigate();
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

    function handleButtonClickedStyleChange(id:string){
        let allButtons = document.querySelectorAll<HTMLElement>(".ResumeAnalyzerDashboardHeaderButton")
        allButtons.forEach((button)=> {
            button.style.color = "rgb(51, 51, 51)";
            button.style.borderBottom = "none"
        })
        let clickedButton = document.getElementById(id) as HTMLElement
        clickedButton.style.color = "rgb(19, 145, 184)";
        clickedButton.style.borderBottom = "2px solid rgb(19, 145, 184)"
    }


  return (
    <>
    <button className="ResumeAnalyzerDashboardHeaderButton" id={button.title + "Button"} onClick={()=> {navigate(button.link); handleButtonClickedStyleChange(button.title + "Button")}} >{button.title}</button>
    </>
  );

}