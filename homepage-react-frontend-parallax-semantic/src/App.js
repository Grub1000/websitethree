import React from "react"
import "./normalize.css"
import "./App.css"
import ProjectCard from "./ProjectCard"

import logo from "./assets/HomePageLogoFixed.png"
import myPortrait from "./assets/20240227_211318.jpg"

// Website Tab Logo

import newIconUrl from "./assets/website_tab_logo.png"

// Parallax Feature Images
import parallaxOne from "./assets/parallax_images/1.svg"
import parallaxTwo from "./assets/parallax_images/2.svg"
import parallaxThree from "./assets/parallax_images/3.svg"
import parallaxFour from "./assets/parallax_images/4.svg"
import parallaxFive from "./assets/parallax_images/5.svg"
import parallaxSix from "./assets/parallax_images/7.svg"

// Ordered Newest to Oldest (Project Images)
import activeProject from "./assets/project_images/active_project.png"
import compSciImage from "./assets/project_images/ComputerScienceCapstoneProjectImage.png"
import disasterRecoImage from "./assets/project_images/DisasterRecoveryBotProjectImage.png"
import careerBotImage from "./assets/project_images/ChatBotProjectImage.png"
import deliveryRouteImage from "./assets/project_images/DeliveryRouteProjectImage.png"
import schedulingSysImage from "./assets/project_images/SchedulingSystemImage.png"
import managementSysImage from "./assets/project_images/ManagementSystemImage.png"
import advancedDataImage from "./assets/project_images/AdvancedDataManagementImage.png"
import vdmImage from "./assets/project_images/VDMDemoTranSmall.png"
import groappImage from "./assets/project_images/ConfidentialScreensDarkResponsiveSmall.png"
import dijkstrasProImage from "./assets/project_images/AlgoAppResponsiveSmall.png"
import fullstackgrubImage from "./assets/project_images/FullstackgrubImage.png"
import socialMediaProImage from "./assets/project_images/BeatBoxResponsiveSmall.png"
import merchStoreProImage from "./assets/project_images/MerchStoreResponsiveSmall.png"
import taskAppImage from "./assets/project_images/TaskAppResponsiveSmall.png"
import eSigProImage from "./assets/project_images/EsignatureResponsiveSmall.png"

// Cert & University Logos
import wguLogo from "./assets/WGULogo.png"
import iTILv4Logo from "./assets/ITILv4FoundationLogo.png"
import compTIALogo from "./assets/CompTIAProjectPluslogo.webp"
import awsMLEnigneerLogo from "./assets/AWS_Machine_Learning_Engineer_Logo.png"

// About Me Section Logos Imports
import githubLogoSVG from "./assets/github_logo_svg.svg"
import linkedinLogoSVG from "./assets/linkedin_logo_svg.svg"
import youtubeLogoSVG from "./assets/youtube_logo_svg.svg"


export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      burgerDropDown: false,
      projects: [
        {  title: "Work In Progress ...", type: "Frontend & Backend", image: activeProject, description: "Come see what I'm currently developing!", techUsed: ["Typescript", "React", "Python", "Django Backend", "MySQL", "AWS-S3", "OpenAI", "LLMs", "JWT-Auth" ],  dateCreated: "2025", link: "https://jorgeramirez.net/resuscan", gitHub: "", youtube: "", notAvailable: 0},
        {  title: "Computer Science Capstone", type: "Frontend & Backend", image: compSciImage, description: "I created a neural network that takes in raw image data that I pre-process, normalize, and then flatten to work with the input layer of a convolutional neural network. The neural network consists of two hidden layers with 128 neurons each. Every neuron runs a Rectified Linear Unit (ReLU) activation function on output. The output layer consists of 2 neurons that, after ran through a SoftMax activation function, are ran through a Loss function and at the end of a 16 image batch the neural network would run its backpropagation step. The backpropagation optimization function is Stochastic Gradient Descent with Momentum. After 100 epochs of training the application then allows the user to submit an image of a particular type of metal product the networks never seen and tell the user whether that product has any defects or not. This type of software has applications in quality control systems around the world", techUsed: ["Tensorflow", "Convolutional-Neural-Network", "Python", "Machine Learning", "Image-Recognition", "Defect-Detection", "Deep-Learning"],  dateCreated: "2025", link: "", gitHub: "", youtube: "", notAvailable: 1},
        {  title: "Disaster Recovery Robot", type: "Frontend & Backend", image: disasterRecoImage, description: "I developed a robot for real-time search-and-rescue operations. Using the CoppeliaSim platform I designed a robot that can maneuver through a disaster ridden office building and find survivors of a natural disaster. Leveraging python scripts, motors, and sensors I came up with a solution that found it's way around the disaster ridden area efficiently.", techUsed: ["CoppeliaSim", "Simulations", "Python", "Robotics"],  dateCreated: "2025", link: "", gitHub: "", youtube: "https://www.youtube.com/watch?v=yrlYvvaAcVM", notAvailable: 0 },
        {  title: "Career Chat-Bot", type: "Frontend & Backend", image: careerBotImage, description: "Programmed a chatbot using the Pandorabots platform. Using AIML I wrote a chatbot capable of asking the user a series of questions to find a profession in computing. This project was made for students that don't know the exact career they want but do know their strengths and interests.", techUsed: ["PandoraBots-Platform", "AIML"],  dateCreated: "2025", link: "", gitHub: "", youtube: "", notAvailable: 1},
        {  title: "Delivery Route Optimization", type: "Frontend & Backend", image: deliveryRouteImage, description: "Designed and Developed an algorithmic solution where 40 packages are delivered on time while meeting each package’s requirements and keeping the combined total distance traveled under 140 miles for all delivery trucks. This project was my take on a solution to the more commonly known traveling-salesman problem. My solution used a Nearest-neighbor algorithm combined with Dijkstra's shortest path algorithm to route the trucks around the city. I managed to stay under 140 miles and only had to use two trucks while meeting all the requirements of each package. Some packages arrived hours late, had wrong addresses, and some needed to be delivered on the same truck / load as others.", techUsed: ["Python", "SP-Algorithms", "NN-Algorithms"],  dateCreated: "2025", link: "", gitHub: "https://github.com/Grub1000/University-C950-Solution", youtube: "", notAvailable: 0},
        {  title: "Scheduling System", type: "Frontend & Backend", image: schedulingSysImage, description: "Designed and Developed a GUI-based application for a simulated company that involved complex scheduling features. These features include scheduling appointments, appointments during work hours only, no scheduling overlap between clients, multiple time-zone scheduling, and more. The GUI has a fully integrated login page with full CRUD capability and analytics features.", techUsed: ["Intellij-IDE","Maven", "MySQL","JavaFX","Java", "FXML", "Desktop-Application"],  dateCreated: "2024", link: "", gitHub: "https://github.com/Grub1000/University-C195-Solution", youtube: "", notAvailable: 0},
        {  title: "Management System", type: "Frontend & Backend", image: managementSysImage, description: "Designed and Developed a GUI-based application for a simulated manufacturing business. The inventory management system I created involves both part and product inventory. Some products are dependent on parts and these dependencies are implemented with object relationships. Features include the deletion of products when parts needed for them are no longer available, part and product deletion with warnings on dependencies, full CRUD capabilities and more.", techUsed: ["Intellij-IDE","Maven","JavaFX","Java", "FXML", "Desktop-Application" ],  dateCreated: "2024", link: "", gitHub: "https://github.com/Grub1000/University-C482-Solution", youtube: "", notAvailable: 0},
        {  title: "Data Management", type: "Backend Project", image: advancedDataImage, description: "Using complex queries I was able to extract data such as 'what film type makes the most money' and 'which films should be position front-of-store' for a simulated DVD store. The database contained many tables of related, but separate, data that had to be joined, grouped, triggered, and much more in order to gain actionable insights from said data.", techUsed: ["SQL", "Stored-Procedures", "Triggers", "Functions", "Data-Analysis"],  dateCreated: "2024", link: "", gitHub: "https://github.com/Grub1000/University-D191-Solution", youtube: "", notAvailable: 0},
        {  title: "PDF Editor Project", type: "Frontend & Backend", image: vdmImage, description: "This project is a demo version of the software I developed while working at Greenstar.ca. The pdf editor is built using the same technology stack but with different frontend and limited features for the demo version. These features include a login page, dashboard with file-system, and editor.", techUsed: ["Laravel", "React", "MySQL", "PHP", "Javascript", "HTML", "CSS", "RESTapi", "Responsive"],  dateCreated: "2022", link: "https://vdm.fullstackgrub.com/", gitHub: "", youtube: "", notAvailable: 0}, 
        {  title: "Thegroapp.com", type: "Frontend & Backend",  image: groappImage, description: "While working at Greenstar.ca I was assigned the task of designing and developing the new software module named LabelBuddy. This new module would be packaged together with two other modules that are now sold as a full package at thegroapp.com meant to help businesses manage the label creation and updating process. The module I created was a variable-data-mapping pdf editor specifically designed to handle many barcode types. The editor has the ability to save projects where they are, map values to existing barcode positions, manipulate shapes and text-fields, and much more. The product I created enables packaging labels to be updated at the press of a few buttons rather than creating new barcodes and text data every time you need to update the encoded values.", techUsed: ["Laravel", "React", "MySQL", "PHP", "Javascript", "HTML", "CSS", "RESTapi", "Responsive"],  dateCreated: "2021", link: "https://thegroapp.com/", gitHub: "", youtube: "", notAvailable: 0 }, 
        {  title: "Dijkstra's Traversal Project", type: "Frontend & Backend",  image: dijkstrasProImage, description: "This project visualizes the Dijkstra's shortest path algorithm in a fun way. You simply place your start node with the first click, end node with second click, and then the resulting clicks and click-and-drags result in the creation of obstacles. Click the green button to run the visualization. This project was great in aiding my ability to understand complex algorithms.", techUsed: ["React", "Django", "SP-Algorithms", "Javascript", "Python", "HTML", "CSS"],  dateCreated: "2021", link: "https://www.fullstackgrub.com/algoapps/traverse/", gitHub: "", youtube: "", notAvailable: 0  }, 
        {  title: "Fullstackgrub.com", type: "Frontend & Backend",  image: fullstackgrubImage, description: "This is my old porfolio website. This was version 2.0. We are currently on version 3.0", techUsed: ["Django", "React", "Apache2","Javascript", "HTML", "CSS", "Fontawsome","RESTapi", "Responsive"],  dateCreated: "2021", link: "https://www.fullstackgrub.com/", gitHub: "", youtube: "", notAvailable: 0 },
        {  title: "Social Media Project", type: "Frontend & Backend",  image: socialMediaProImage, description: "This Django social media application incorporates infinite-scrolling (with jQuery-waypoints and Django pagination), full CRUD capabilities, user login (with profile customization), and a likes feature. Another nice feature is that the media is stored in S3 buckets, allowing the server to run without having to store large amounts of image data.", techUsed: ["Django", "JQuery-Waypoints","AWS-S3", "MySQL", "Javascript", "Python", "HTML", "CSS", "Responsive"],  dateCreated: "2020", link: "https://www.fullstackgrub.com/beatbox/", gitHub: "", youtube: "", notAvailable: 0 }, 
        {  title: "Merch Store Project", type: "Frontend & Backend", image: merchStoreProImage, description: "This Django/React application incorporates an in-house search engine to make looking for product a little easier. The purpose of this application was to develop a merch store mock-up full with a cart and search feature. This application does also contain a sudo admin mode where the users can see and use the Create, Update, and Delete features.", techUsed: ["ReactJS", "Django", "AWS-S3", "MySQL", "Javascript", "Python", "HTML", "CSS", "RESTapi", "Responsive"],  dateCreated: "2020", link: "https://www.fullstackgrub.com/merchstore/", gitHub: "", youtube: "", notAvailable: 0 }, 
        {  title: "Task App", type: "Frontend & Backend",  image: taskAppImage, description: "This Django/React application is my take on the typical task app project so many have done before me. My little Full-Stack twist on it was to add a simple login feature on top of the persistant tasks that are saved in a database for later use by the user. Thats about it for this one.", techUsed: ["React", "Django", "AWS-S3", "MySQL", "Javascript", "Python", "HTML", "CSS", "RESTapi", "Responsive"],  dateCreated: "2020", link: "https://www.fullstackgrub.com/taskapp/", gitHub: "", youtube: "", notAvailable: 0 }, 
        {  title: "E-Signature Project", type: "Frontend",  image: eSigProImage, description: "This very simple application was made to test an Esignature field concept I was briefed on. It worked just fine and only took about 30 minutes to implement myself.", techUsed: ["Javascript", "HTML", "CSS"],  dateCreated: "2020", link: "https://www.fullstackgrub.com/formquixi/", gitHub: "", youtube: "", notAvailable: 0  }
        ],      
      favorites: [
        {title: "Computer Science Capstone",image: compSciImage, description: "I created a neural network that takes in raw image data that I pre-process, normalize, and then flatten to work with the input layer of a convolutional neural network. The neural network consists of two hidden layers with 128 neurons each. Every neuron runs a Rectified Linear Unit (ReLU) activation function on output. The output layer consists of 2 neurons that, after ran through a SoftMax activation function, are ran through a Loss function and at the end of a 16 image batch the neural network would run its backpropagation step. The backpropagation optimization function is Stochastic Gradient Descent with Momentum. After 100 epochs of training the application then allows the user to submit an image of a particular type of metal product the networks never seen and tell the user whether that product has any defects or not. This type of software has applications in quality control systems around the world", techUsed: ["Tensorflow", "Convolutional-Neural-Network", "Python", "Machine Learning", "Image-Recognition", "Defect-Detection", "Deep-Learning"],  dateCreated: "2025", link: "", gitHub: "", youtube: "", notAvailable: 1},
        {title: "Delivery Route Optimization",image: deliveryRouteImage, description: "Designed and Developed an algorithmic solution where 40 packages are delivered on time while meeting each package’s requirements and keeping the combined total distance traveled under 140 miles for all delivery trucks. This project was my take on a solution to the more commonly known traveling-salesman problem. My solution used a Nearest-neighbor algorithm combined with Dijkstra's shortest path algorithm to route the trucks around the city. I managed to stay under 140 miles and only had to use two trucks while meeting all the requirements of each package. Some packages arrived hours late, had wrong addresses, and some needed to be delivered on the same truck / load as others.", techUsed: ["Python", "SP-Algorithms", "NN-Algorithms"],  dateCreated: "2025", link: "", gitHub: "https://github.com/Grub1000/University-C950-Solution", youtube: "", notAvailable: 0},
        {title: "PDF Editor Project",image: vdmImage, description: "This project is a demo version of the software I developed while working at Greenstar.ca. The pdf editor is built using the same technology stack but with different frontend and limited features for the demo version. These features include a login page, dashboard with file-system, and editor.", techUsed: ["Laravel", "ReactJS", "MySQL", "PHP", "Javascript", "HTML", "CSS", "RESTapi", "Responsive"],  dateCreated: "2022", link: "https://vdm.fullstackgrub.com/", gitHub: "", youtube: "", notAvailable: 0}, 
        ],
      }
    this.handleDropdown = this.handleDropdown.bind(this)
    this.handleSectionChange = this.handleSectionChange.bind(this)
    this.updateClock = this.updateClock.bind(this)
    this.handleBurgerDropDown = this.handleBurgerDropDown.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  // Hamburger Dropdown Click Off Functionality function (called during component did mount and will-unmount)
  handleClick(event) {
      const target = event.target;
      console.log("clicked")
      if (
          !target.closest(".HeaderHamburgerDropdownWrapper")
          && !target.closest(".HeaderHamburgerButton")
      ) {
          document
              .querySelectorAll(".HeaderHamburgerDropdownWrapper")
              .forEach(dropdown => {
                  dropdown.style.display = "none";
              });
      }
  }
    
            
  // React Component DidMount Method
  componentDidMount(){
    setInterval(this.updateClock, 1000);
    this.updateClock();
    let mainContentWrapper = document.getElementById("mainContentWrapper")
    // let parallaxOne = document.getElementById("parallaxImageOne")
    let parallaxTwo = document.getElementById("parallaxImageTwo")
    let parallaxThree = document.getElementById("parallaxImageThree")
    let parallaxFour = document.getElementById("parallaxImageFour")
    let parallaxFive = document.getElementById("parallaxImageFive")
    let parallaxSix = document.getElementById("parallaxImageSix")
    // let parallaxTitle = document.getElementById("parallaxTitle")
    let parallaxImageBuffer = document.getElementById("parallaxImageBuffer")
    mainContentWrapper.addEventListener("scroll", ()=>{  
        let value = mainContentWrapper.scrollTop
        // parallaxOne.style.top = value * -1.0 + "px"
        parallaxTwo.style.top = value * -0.05 - 80 + "px"
        parallaxThree.style.top = value * -0.06 - 80 + "px"
        parallaxFour.style.top = value * -0.07 - 80 + "px"
        parallaxFour.style.top = value * -0.07 - 80 + "px"
        parallaxFive.style.top = value * -0.08 - 80 + "px"
        parallaxFive.style.top = value * -0.09 - 80 + "px"
        parallaxSix.style.top = value * -0.1 - 80 + "px"
        // parallaxTitle.style.top = 20 + (value * 1) + "px"
        parallaxImageBuffer.style.top = value * -0.05 + "px"
        console.log(value)
    })
    mainContentWrapper.tabIndex = 1 



    let link = document.querySelector("link[rel~='icon']");
  
    // If it doesn't exist, create a new one
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
  
    // Update the icon path
    link.href = newIconUrl;
    
    setTimeout(()=> {
      document.getElementById("homepageProjectsSectionSuperWrapper").style.transform = "scale(100%)"
    }, 1);

    // Event Listener Initialization for Hamburger Dropdown Functionality
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount(){
    // Event Listener De-Initialization for Hamburger Dropdown Functionality
    document.removeEventListener("mousedown", this.handleClick);
  }

  // Handles The Dropdowns on the top of the page. (Recently Optimized)
  handleDropdown(eventType, ddNum){
    if(eventType == "mouseIn"){ 
      document.getElementsByClassName("HeaderButtonDropdown")[ddNum].style.display = "block"
    }
    else if(eventType == "mouseOut"){
      document.getElementsByClassName("HeaderButtonDropdown")[ddNum].style.display = "none"
    }
  }


  // Handles The Top Right Burger Icon Functionality
  handleBurgerDropDown(id){
    const selectedDropdown = document.getElementById(id)
        selectedDropdown.style.display = "flex"
  }



  // Handles Page Changes In The Lower Sections (All, Favorites, Education, and About)
  handleSectionChange(event, eventType){
    let allSection = document.getElementById("homepageProjectsSectionCardWrapper")
    let favoriteSection = document.getElementById("homepageFavoritesSectionCardWrapper")
    let educationSection = document.getElementById("homepageEducationSectionWrapper")
    let aboutSection = document.getElementById("homepageAboutSectionWrapper")
    document.querySelectorAll(".HomepageProjectsSectionNavButton").forEach(button => {button.style.borderColor = "transparent"})
    // event.target.style.borderColor = "white"
    document.getElementsByClassName("HomepageProjectsSectionSuperWrapper")[0].scrollIntoView()
    if(eventType == "all"){
      allSection.style.display = "flex"
      favoriteSection.style.display = "none"
      educationSection.style.display = "none"
      aboutSection.style.display = "none"
      document.getElementById("homepageProjectsSectionNavButtonAll").style.borderColor = "White"
    }else if(eventType == "favorites"){
      allSection.style.display = "none"
      favoriteSection.style.display = "flex"
      educationSection.style.display = "none"
      aboutSection.style.display = "none"
      document.getElementById("homepageProjectsSectionNavButtonFavorites").style.borderColor = "White"
    }else if(eventType == "education"){
      allSection.style.display = "none"
      favoriteSection.style.display = "none"
      educationSection.style.display = "block"
      aboutSection.style.display = "none"
      document.getElementById("homepageProjectsSectionNavButtonEducation").style.borderColor = "White"
    }else if(eventType == "about"){
      allSection.style.display = "none"
      favoriteSection.style.display = "none"
      educationSection.style.display = "none"
      aboutSection.style.display = "block"
      document.getElementById("homepageProjectsSectionNavButtonAbout").style.borderColor = "White"
    }
  }

  // Clock Functionality Function
  updateClock(){
    // Get the current date and time
    const now = new Date(); 
    // Get the current date and time in UTC as a string
    const utcString = now.toUTCString(); 
    // Get the current date and time in UTC as an ISO 8601 string
    const isoUTCString = now.toISOString(); 
    const utcDate = new Date(isoUTCString); 
    // Convert the Date object to PST using toLocaleString()
    const pstString = utcDate.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles" });
    document.getElementById('timeAndLocationTextTwo').textContent = "Santa Ana, CA " + pstString + " PST";
  }




  render(){
    const  myProjectCardList = this.state.projects.map((i) => <ProjectCard data={i}/>);
    const  myProjectFavoriteCardList = this.state.favorites.map((i) => <ProjectCard data={i}/>);
    return(
      <React.Fragment>
          <section className="ParallaxWrapper">
            {/* <img className="ParallaxImage" id="parallaxImageOne" src={parallaxOne}></img> */}
            <img className="ParallaxImage" id="parallaxImageTwo" src={parallaxTwo}></img>
            <img className="ParallaxImage" id="parallaxImageThree" src={parallaxThree}></img>
            {/* <h2 className="ParallaxTitle" id="parallaxTitle">Fullstack Developer</h2> */}
            <img className="ParallaxImage" id="parallaxImageFour" src={parallaxFour}></img>
            <img className="ParallaxImage" id="parallaxImageFive" src={parallaxFive}></img>
            <img className="ParallaxImage" id="parallaxImageSix" src={parallaxSix}></img>
            <div className="ParallaxImageBuffer" id="parallaxImageBuffer"></div>
          </section>
          <header className="Header">
            <a className="HeaderLogoWrapper" onClick={()=>window.location.reload()}>
              <img src={logo} className="HeaderLogoImage" alt="Website Logo"></img>  
            </a>
            <nav>
              <section className="HeaderButtonsWrapper">
                <button className="HeaderButton" onMouseEnter={()=>this.handleDropdown("mouseIn", 0)} onMouseLeave={()=>this.handleDropdown("mouseOut", 0)}>Templates</button>
                <div className="HeaderButtonDropdown" id="templatesDropdownWrapper" onMouseEnter={()=>this.handleDropdown("mouseIn", 0)} onMouseLeave={()=>this.handleDropdown("mouseOut", 0)}>
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
                    <button className="HeaderButtonDropdownButton">
                      <div className="HeaderButtonDropdownButtonColorPad"></div>
                      <h5 className="HeaderButtonDropdownButtonTopText">Coming Soon...</h5>
                      <p className="HeaderButtonDropdownButtonBottomText">Web Designer mock up example</p>
                    </button>
                    <button className="HeaderButtonDropdownButton">
                      <div className="HeaderButtonDropdownButtonColorPad"></div>
                      <h5 className="HeaderButtonDropdownButtonTopText">Coming Soon...</h5>
                      <p className="HeaderButtonDropdownButtonBottomText">Web Portal mock up example</p>
                    </button>
                    <button className="HeaderButtonDropdownButton">
                      <div className="HeaderButtonDropdownButtonColorPad"></div>
                      <h5 className="HeaderButtonDropdownButtonTopText">Coming Soon...</h5>
                      <p className="HeaderButtonDropdownButtonBottomText">Company Site mock up example</p>
                    </button>
                  </div>
                </div>
                <button className="HeaderButton" onMouseEnter={()=>this.handleDropdown("mouseIn", 1)} onMouseLeave={()=>this.handleDropdown("mouseOut", 1)} onClick={(e)=>this.handleSectionChange(e, "all")}>Projects</button>
                <div className="HeaderButtonDropdown" id="semanticsDropdownWrapper" onMouseEnter={()=>this.handleDropdown("mouseIn", 1)} onMouseLeave={()=>this.handleDropdown("mouseOut", 1)}>
                  <div className="HeaderButtonDropdownButtonWrapper">
                    <button className="HeaderButtonDropdownButton" onClick={(e)=>this.handleSectionChange(e, "all")}>
                      <div className="HeaderButtonDropdownButtonColorPad"></div>
                      <h5 className="HeaderButtonDropdownButtonTopText">Projects</h5>
                      <p className="HeaderButtonDropdownButtonBottomText">Personal & Work projects</p>
                    </button>
                  </div>
                </div>
                <button className="HeaderButton" onMouseEnter={()=>this.handleDropdown("mouseIn", 2)} onMouseLeave={()=>this.handleDropdown("mouseOut", 2)} onClick={(e)=>this.handleSectionChange(e, "about")}>About</button>
                <div className="HeaderButtonDropdown" id="blogDropdownWrapper" onMouseEnter={()=>this.handleDropdown("mouseIn", 2)} onMouseLeave={()=>this.handleDropdown("mouseOut", 2)}>
                  <div className="HeaderButtonDropdownButtonWrapper">
                    <button className="HeaderButtonDropdownButton" onClick={(e)=>this.handleSectionChange(e, "about")}>
                      <div className="HeaderButtonDropdownButtonColorPad"></div>
                      <h5 className="HeaderButtonDropdownButtonTopText">About</h5>
                      <p className="HeaderButtonDropdownButtonBottomText">Information about me / Skills  </p>
                    </button>
                    <button className="HeaderButtonDropdownButton" onClick={() => window.open("https://jorgeramirez.net/home", "_blank")}>
                      <div className="HeaderButtonDropdownButtonColorPad"></div>
                      <h5 className="HeaderButtonDropdownButtonTopText">Alternate View</h5>
                      <p className="HeaderButtonDropdownButtonBottomText">Home Page View - Outdated</p>
                    </button>
                  </div>
                </div>
                <button className="HeaderButton" onMouseEnter={()=>this.handleDropdown("mouseIn", 3)} onMouseLeave={()=>this.handleDropdown("mouseOut", 3)} onClick={(e)=>this.handleSectionChange(e, "education")}>Education</button>
                <div className="HeaderButtonDropdown" id="helpDropdownWrapper" onMouseEnter={()=>this.handleDropdown("mouseIn", 3)} onMouseLeave={()=>this.handleDropdown("mouseOut", 3)}>
                  <div className="HeaderButtonDropdownButtonWrapper">
                    <button className="HeaderButtonDropdownButton" onClick={(e)=>this.handleSectionChange(e, "education")}>
                      <div className="HeaderButtonDropdownButtonColorPad"></div>
                      <h5 className="HeaderButtonDropdownButtonTopText">Education</h5>
                      <p className="HeaderButtonDropdownButtonBottomText">Degrees / Certificates Earned</p>
                    </button>
                  </div>
                </div>
                <button className="HeaderHamburgerButton" onClick={()=>{this.handleBurgerDropDown("headerHamburgerDropdownWrapper")}}style={{color: "white"}}><i class=" fa fa-solid fa-bars" style={{transform: "scale(1.4)"}}></i>
                <div className="HeaderHamburgerDropdownWrapper" id="headerHamburgerDropdownWrapper">
                  <div className="HeaderButtonDropdownButtonWrapper">
                    <button className="HeaderButtonDropdownButton">
                      <div className="HeaderButtonDropdownButtonColorPad"></div>
                      <h5 className="HeaderButtonDropdownButtonTopText">Templates</h5>
                      <p className="HeaderButtonDropdownButtonBottomText">Coming Soon...</p>
                    </button>
                    <button className="HeaderButtonDropdownButton" onClick={(e)=>this.handleSectionChange(e, "all")}>
                      <div className="HeaderButtonDropdownButtonColorPad"></div>
                      <h5 className="HeaderButtonDropdownButtonTopText">Projects</h5>
                      <p className="HeaderButtonDropdownButtonBottomText">Personal & Work projects</p>
                    </button>    
                    <button className="HeaderButtonDropdownButton" onClick={(e)=>this.handleSectionChange(e, "about")}>
                      <div className="HeaderButtonDropdownButtonColorPad"></div>
                      <h5 className="HeaderButtonDropdownButtonTopText">About</h5>
                      <p className="HeaderButtonDropdownButtonBottomText">Information about me / Skills</p>
                    </button>
                    <button className="HeaderButtonDropdownButton" onClick={(e)=>this.handleSectionChange(e, "education")}>
                      <div className="HeaderButtonDropdownButtonColorPad"></div>
                      <h5 className="HeaderButtonDropdownButtonTopText">Education</h5>
                      <p className="HeaderButtonDropdownButtonBottomText">Degrees / Certificates Earned</p>
                    </button>
                  </div>
                </div>
                </button>
              </section>
            </nav>
          </header>
          
          <main className="MainContentWrapper" id="mainContentWrapper">
            <section className="HomepageSuperWrapper">
              <div className="HomepageTitleWrapper">
                <div class="typing-container">
                  {/* <h1 className="HomepageTitle" style={{'--n': 45}}>Full Stack Software Developer & MSCS Graduate</h1> */}
                  <span class="HomepageTitle type" style={{'--n': 45}} aria-level="1">Full Stack Software Developer & MSCS Graduate</span>

                </div>
                <p className="HomepageTitleDescription">Let’s collaborate to turn your vision into reality. I provide full-cycle digital product creation, taking your idea from initial concept and UI/UI design through robust development to a successful deployment.</p>
                <a href="mailto:jorgeramirezsoftware@gmail.com?subject=Subject%20Line&body=Body%20Text"><button className="HomepageTitleDescriptionEmailButton">jorgeramirezsoftware@gmail.com</button></a>
              </div>
              <div className="HomepageRightSectionWrapper">
                <p className="TimeAndLocationText" id="timeAndLocationTextOne">Current Location:</p>
                <p className="TimeAndLocationText" id="timeAndLocationTextTwo"></p>
                <p className="TimeAndLocationText" id="timeAndLocationTextThree">(available 8am - 9pm)</p>
              </div>
              <div className="HomepageProjectsSectionSuperWrapper" id="homepageProjectsSectionSuperWrapper">
                <nav className="HomepageProjectsSectionNav">
                  <button className="HomepageProjectsSectionNavButton" id="homepageProjectsSectionNavButtonAll" onClick={(e)=>this.handleSectionChange(e, "all")} style={{borderColor: "white"}}>All</button>
                  <button className="HomepageProjectsSectionNavButton" id="homepageProjectsSectionNavButtonFavorites" onClick={(e)=>this.handleSectionChange(e, "favorites")}>Favorites</button>
                  <button className="HomepageProjectsSectionNavButton" id="homepageProjectsSectionNavButtonEducation" onClick={(e)=>this.handleSectionChange(e, "education")}>Education</button>
                  <button className="HomepageProjectsSectionNavButton" id="homepageProjectsSectionNavButtonAbout" onClick={(e)=>this.handleSectionChange(e, "about")}>About Jorge</button>
                </nav>
                <section className="HomepageProjectsSectionCardWrapper" id="homepageProjectsSectionCardWrapper">
                  {myProjectCardList}
                </section>
                <section className="HomepageFavoritesSectionCardWrapper" id="homepageFavoritesSectionCardWrapper">
                  {myProjectFavoriteCardList}
                </section>
                <section className="HomepageEducationSectionWrapper" id="homepageEducationSectionWrapper">
                  <div className="EducationCard" style={{marginBottom: "20px", marginTop: "50px"}}> 
                    <div className="EducationImage" style={{backgroundImage: "url(" + wguLogo + ")"}}></div>
                    <div className="EducationText" >
                      <div style={{marginBottom: "10px"}}>Western Governors University</div> 
                      <div style={{fontSize: "13px", marginBottom: "8px", lineHeight: "18px"}}>Master of Science - MS, Computer Science, Artificial Intelligence and Machine Learning </div> 
                      <div style={{fontSize: "13px", color: "rgb(184, 184, 184)", marginBottom: "10px"}}>August 2025 - July 2026</div> 
                      {/* <div style={{}}>ABET-accredited CS Program</div> */}
                    </div>
                  </div>
                  <div className="EducationCard"> 
                    <div className="EducationImage" style={{backgroundImage: "url(" + wguLogo + ")"}}></div>
                    <div className="EducationText" >
                      <div style={{marginBottom: "10px"}}>Western Governors University</div> 
                      <div style={{fontSize: "13px", marginBottom: "8px"}}>Bachelor of Science - BS, Computer Science</div> 
                      <div style={{fontSize: "13px", color: "rgb(184, 184, 184)", marginBottom: "10px"}}>August 2022 - June 2025</div> 
                      {/* <div style={{}}>ABET-accredited CS Program</div> */}
                    </div>
                  </div>
                  <div className="EducationCard" style={{marginBottom: "38px", marginLeft: "6px"}}> 
                    <div className="EducationImage" style={{backgroundImage: "url(" + awsMLEnigneerLogo + ")", width: "46px", height: "46px"}}></div>
                    <div className="EducationText" >
                      <div style={{marginBottom: "2px"}}>AWS Certified Machine Learning Engineer – Associate</div> 
                      <div className="EducationCredentialID" style={{fontSize: "13px", marginBottom: "8px"}} onClick={() => window.open("https://www.credly.com/badges/72468fe3-5bce-4cbe-b051-2f348025d216/linked_in_profile", "_blank")}>Credential ID 72468fe3-5bce-4cbe-b051-2f348025d216  </div> 
                      <div style={{fontSize: "13px", color: "rgb(184, 184, 184)", marginBottom: "10px"}}>Issued Jun 2026 · Expires Jun 2029</div> 
                      {/* <div style={{}}>ABET-accredited CS Program</div> */}
                    </div>
                  </div>
                  <div className="EducationCard" style={{marginBottom: "35px", marginLeft: "6px"}}> 
                    <div className="EducationImage" style={{backgroundImage: "url(" + iTILv4Logo + ")", width: "38px", height: "38px", marginRight: "10px"}}></div>
                    <div className="EducationText" style={{paddingTop: "0px"}}>
                      <div style={{marginBottom: "10px"}}>ITIL® 4 Foundation Certificate in IT Service Management</div> 
                      <div style={{fontSize: "13px", marginBottom: "2px"}}>AXELOS Global Best Practice</div>
                      <div className="EducationCredentialID" style={{fontSize: "13px", marginBottom: "8px"}} onClick={() => window.open("https://www.peoplecert.org/for-corporations/certificate-verification-service", "_blank")}>Credential ID GR671767461JR</div> 
                      <div style={{fontSize: "13px", color: "rgb(184, 184, 184)", marginBottom: "10px"}}>Issued Apr 2025 · Expires Apr 2028</div> 
                      {/* <div style={{}}>ABET-accredited CS Program</div> */}
                    </div>
                  </div>
                  <div className="EducationCard" style={{marginLeft: "6px"}}> 
                    <div className="EducationImage" style={{backgroundImage: "url(" + compTIALogo + ")", width: "46px", height: "46px"}}></div>
                    <div className="EducationText" >
                      <div style={{marginBottom: "2px"}}>CompTIA Project+ Certification</div> 
                      <div className="EducationCredentialID" style={{fontSize: "13px", marginBottom: "8px"}} onClick={() => window.open("https://www.credly.com/badges/674f816e-6e0a-4349-91f0-8e818440bb73/linked_in_profile", "_blank")}>Credential ID COMP001022737827  </div> 
                      <div style={{fontSize: "13px", color: "rgb(184, 184, 184)", marginBottom: "10px"}}>Issued Mar 2025</div> 
                      {/* <div style={{}}>ABET-accredited CS Program</div> */}
                    </div>
                  </div>
                </section>

                <section className="HomepageAboutSectionWrapper" id="homepageAboutSectionWrapper">
                  <div className="HomepageAboutSectionDescriptionSectionWrapper">
                    <img className="HomepageAboutPortraitImage" src={myPortrait}></img>
                    <div className="HomepageAboutSectionDescriptionSectionHeaderAndDescriptionWrapper">
                      <h2 className="HomepageAboutSectionDescriptionSectionNameHeader">Hey, I'm Jorge</h2>
                      <h2 className="HomepageAboutSectionDescriptionSectionNameHeader">Full-Stack Developer and Machine Learning Engineer</h2>
                      <p className="HomepageAboutSectionDescriptionSectionDescription">
                      I'm a Full-Stack Developer and Machine Learning Engineer who enjoys turning ideas into real, working software. My work spans modern web development, cloud infrastructure, and machine learning—from building full-stack applications with React and Django to developing and deploying intelligent systems with TensorFlow and AWS.
                      I enjoy learning by building, solving challenging problems, and taking projects from an initial idea all the way to a deployed product.
                      </p>
                    </div>
                  </div>
                  <div className="HomepageAboutSectionSocialMediaLinksSuperWrapper">
                    <div className="HomepageAboutSectionSocialMediaLinksWrapper">
                      <div className="HomepageAboutSectionSocialMediaLinkCard">
                        <button className="SemanticButtonDiv" onClick={()=> window.open("https://github.com/Grub1000")}>
                          <img className="HomepageAboutSectionSocialMediaLinkCardIcon" src={githubLogoSVG}></img>
                          <p className="HomepageAboutSectionSocialMediaLinkCardDescription"></p>
                        </button>
                      </div>
                      <div className="HomepageAboutSectionSocialMediaLinkCard">
                        <button className="SemanticButtonDiv" onClick={()=> window.open("https://www.linkedin.com/in/jorge-ramirez-02363a18b/")}>
                          <img className="HomepageAboutSectionSocialMediaLinkCardIcon" src={linkedinLogoSVG}></img>
                          <p className="HomepageAboutSectionSocialMediaLinkCardDescription"></p>
                        </button>
                      </div>
                      <div className="HomepageAboutSectionSocialMediaLinkCard">
                        <button className="SemanticButtonDiv" onClick={()=> window.open("https://www.youtube.com/@grub194")}>
                          <img className="HomepageAboutSectionSocialMediaLinkCardIcon" src={youtubeLogoSVG}></img>
                          <p className="HomepageAboutSectionSocialMediaLinkCardDescription"></p>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* <div className="HomepageAboutUpperSectionWrapper">
                    <img className="HomepageAboutPortraitImage" src={myPortrait}></img>
                    <p className="HomepageAboutDescription">
                      Full-Stack Software Developer and AWS Certified Machine Learning Engineer with a 
                      strong foundation in modern engineering ecosystems. Proficient in building scalable, 
                      secure web architectures using Python, Django, C#, .Net, MySQL, and React. Backed by 
                      Comptia Project+ and ITIL v4 certifications, ensuring clean code delivery aligns 
                      seamlessly with Agile engineering workflows and IT service standards. Proven track 
                      record at Greenstaar.ca designing workflow streamlining software, including a custom 
                      web-based PDF editor.<br></br></p>
                  </div>
                  <div className="HomepageAboutSkillsSuperWrapper">
                    <h2 className="HomepageAboutSkillTitle">Skills:</h2>
                    <div className="HomepageAboutSkillsWrapper">
                      <p className="HomePageAboutSkillCard">Javascript</p>
                      <p className="HomePageAboutSkillCard">Typescript</p>
                      <p className="HomePageAboutSkillCard">Python</p>
                      <p className="HomePageAboutSkillCard">Java</p>
                      <p className="HomePageAboutSkillCard">C#</p>
                      <p className="HomePageAboutSkillCard">C++</p>
                      <p className="HomePageAboutSkillCard">CSS</p>
                      <p className="HomePageAboutSkillCard">HTML5</p>
                      <p className="HomePageAboutSkillCard">Django</p>
                      <p className="HomePageAboutSkillCard">.Net</p>
                      <p className="HomePageAboutSkillCard">ReactJS</p>
                      <p className="HomePageAboutSkillCard">Laravel</p>
                      <p className="HomePageAboutSkillCard">MySQL</p>
                      <p className="HomePageAboutSkillCard">SQL</p>
                      <p className="HomePageAboutSkillCard">Apache2</p>
                      <p className="HomePageAboutSkillCard">Webserver Config</p>
                      <p className="HomePageAboutSkillCard">AWS</p>
                      <p className="HomePageAboutSkillCard">EC2</p>
                      <p className="HomePageAboutSkillCard">Google OAuth</p>
                      <p className="HomePageAboutSkillCard">S3</p>
                      <p className="HomePageAboutSkillCard">Git/GitHub</p>
                      <p className="HomePageAboutSkillCard">Github Actions</p>
                      <p className="HomePageAboutSkillCard">Postman</p>
                      <p className="HomePageAboutSkillCard">Machine Learning</p>
                      <p className="HomePageAboutSkillCard">Tensorflow</p>
                      <p className="HomePageAboutSkillCard">Neural Networks</p>
                      <p className="HomePageAboutSkillCard">Image Recognition</p>
                      <p className="HomePageAboutSkillCard">Webdev</p>
                      <p className="HomePageAboutSkillCard">Native App Dev</p>
                      <p className="HomePageAboutSkillCard">GIMP GNU</p>
                      <p className="HomePageAboutSkillCard">Project Management</p>
                      <p className="HomePageAboutSkillCard">Agile Methodologies</p>
                      <p className="HomePageAboutSkillCard">Design</p>
                      <p className="HomePageAboutSkillCard">Development</p>
                      <p className="HomePageAboutSkillCard">Deployment</p>
                      <p className="HomePageAboutSkillCard">Windows/Linux</p>
                      <p className="HomePageAboutSkillCard">CI / CD</p>
                    </div>
                  </div> */}
                </section>




              </div>
            </section>
          </main>
          <footer>

          </footer>
      </React.Fragment>
    )
  }
}