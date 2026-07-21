import React from "react"
import "./App.css"
import CIcon from '@coreui/icons-react';
import { cil3d, cilContrast, cilEducation, cilWalk, cilZoom, cilHandPointLeft } from '@coreui/icons';
import MyProjectsCard from "./MyProjectsCard";

import backGroundOne from "../src/assets/BeatBoxResponsiveSmall.png";
import backGroundTwo from "../src/assets/MerchStoreResponsiveSmall.png";
import backGroundThree from "../src/assets/PipeLineResponsiveSmall.png";
import backGroundFour from "../src/assets/TaskAppResponsiveSmall.png";
import backGroundFive from "../src/assets/EsignatureResponsiveSmall.png";
import backGroundSix from "../src/assets/AlgoAppResponsiveSmall.png";
import backGroundSeven from "../src/assets/ConfidentialScreensDarkResponsiveSmall.png";
import backGroundEight from "../src/assets/VDMDemoTranSmall.png";
// import backGroundNine from "../src/assets/testwebsiteimage.png";
import backGroundTen from "../src/assets/AdvancedDataManagementImage.png";
import backGroundEleven from "../src/assets/ManagementSystemImage.png";
import backGroundTwelve from "../src/assets/SchedulingSystemImage.png";
import backGroundThirteen from "../src/assets/DeliveryRouteProjectImage.png";
import backGroundFourteen from "../src/assets/ChatBotProjectImage.png";
import backGroundFifteen from "../src/assets/DisasterRecoveryBotProjectImage.png";
import backGroundSixteen from "../src/assets/ComputerScienceCapstoneProjectImage.png";
import backGroundSeventeen from "../src/assets/FullstackgrubImage.png";

import wguLogo from "../src/assets/WGULogo.png";
import compTIALogo from "../src/assets/CompTIAProjectPluslogo.webp";
import iTILv4Logo from "../src/assets/ITILv4FoundationLogo.png"

import greenstaarLogo from "../src/assets/greenstaarWhite.db7e6195.png"


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      compArmTwoDesc: "About Me",
      projects: [
        {  title: "Computer Science Capstone",image: backGroundSixteen, description: "I created a neural network that takes in raw image data that I pre-process, normalize, and then flatten to work with the input layer of a convolutional neural network. The neural network consists of two hidden layers with 128 neurons each. Every neuron runs a Rectified Linear Unit (ReLU) activation function on output. The output layer consists of 2 neurons that, after ran through a SoftMax activation function, are ran through a Loss function and at the end of a 16 image batch the neural network would run its backpropagation step. The backpropagation optimization function is Stochastic Gradient Descent with Momentum. After 100 epochs of training the application then allows the user to submit an image of a particular type of metal product the networks never seen and tell the user whether that product has any defects or not. This type of software has applications in quality control systems around the world", techUsed: ["Tensorflow", "Convolutional-Neural-Network", "Python", "Machine Learning", "Image-Recognition", "Defect-Detection", "Deep-Learning"],  dateCreated: "2025", link: "", gitHub: "", youtube: "", notAvailable: 1},
        {  title: "Disaster Recovery Robot",image: backGroundFifteen, description: "I developed a robot for real-time search-and-rescue operations. Using the CoppeliaSim platform I designed a robot that can maneuver through a disaster ridden office building and find survivors of a natural disaster. Leveraging python scripts, motors, and sensors I came up with a solution that found it's way around the disaster ridden area efficiently.", techUsed: ["CoppeliaSim", "Simulations", "Python", "Robotics"],  dateCreated: "2025", link: "", gitHub: "", youtube: "https://www.youtube.com/watch?v=yrlYvvaAcVM", notAvailable: 0 },
        {  title: "Career Chat-Bot",image: backGroundFourteen, description: "Programmed a chatbot using the Pandorabots platform. Using AIML I wrote a chatbot capable of asking the user a series of questions to find a profession in computing. This project was made for students that don't know the exact career they want but do know their strengths and interests.", techUsed: ["PandoraBots-Platform", "AIML"],  dateCreated: "2025", link: "", gitHub: "", youtube: "", notAvailable: 1},
        {  title: "Delivery Route Optimization",image: backGroundThirteen, description: "Designed and Developed an algorithmic solution where 40 packages are delivered on time while meeting each package’s requirements and keeping the combined total distance traveled under 140 miles for all delivery trucks. This project was my take on a solution to the more commonly known traveling-salesman problem. My solution used a Nearest-neighbor algorithm combined with Dijkstra's shortest path algorithm to route the trucks around the city. I managed to stay under 140 miles and only had to use two trucks while meeting all the requirements of each package. Some packages arrived hours late, had wrong addresses, and some needed to be delivered on the same truck / load as others.", techUsed: ["Python", "SP-Algorithms", "NN-Algorithms"],  dateCreated: "2025", link: "", gitHub: "https://github.com/Grub1000/University-C950-Solution", youtube: "", notAvailable: 0},
        {  title: "Scheduling System",image: backGroundTwelve, description: "Designed and Developed a GUI-based application for a simulated company that involved complex scheduling features. These features include scheduling appointments, appointments during work hours only, no scheduling overlap between clients, multiple time-zone scheduling, and more. The GUI has a fully integrated login page with full CRUD capability and analytics features.", techUsed: ["Intellij-IDE","Maven", "MySQL","JavaFX","Java", "FXML", "Desktop-Application"],  dateCreated: "2024", link: "", gitHub: "https://github.com/Grub1000/University-C195-Solution", youtube: "", notAvailable: 0},
        {  title: "Management System",image: backGroundEleven, description: "Designed and Developed a GUI-based application for a simulated manufacturing business. The inventory management system I created involves both part and product inventory. Some products are dependent on parts and these dependencies are implemented with object relationships. Features include the deletion of products when parts needed for them are no longer available, part and product deletion with warnings on dependencies, full CRUD capabilities and more.", techUsed: ["Intellij-IDE","Maven","JavaFX","Java", "FXML", "Desktop-Application" ],  dateCreated: "2024", link: "", gitHub: "https://github.com/Grub1000/University-C482-Solution", youtube: "", notAvailable: 0},
        {  title: "Advanced Data Management",image: backGroundTen, description: "Using complex queries I was able to extract data such as 'what film type makes the most money' and 'which films should be position front-of-store' for a simulated DVD store. The database contained many tables of related, but separate, data that had to be joined, grouped, triggered, and much more in order to gain actionable insights from said data.", techUsed: ["SQL", "Stored-Procedures", "Triggers", "Functions", "Data-Analysis"],  dateCreated: "2024", link: "", gitHub: "https://github.com/Grub1000/University-D191-Solution", youtube: "", notAvailable: 0},
        {  title: "PDF Editor Project",image: backGroundEight, description: "This project is a demo version of the software I developed while working at Greenstar.ca. The pdf editor is built using the same technology stack but with different frontend and limited features for the demo version. These features include a login page, dashboard with file-system, and editor.", techUsed: ["Laravel", "ReactJS", "MySQL", "PHP", "Javascript", "HTML", "CSS", "RESTapi", "Responsive"],  dateCreated: "2022", link: "https://vdm.fullstackgrub.com/", gitHub: "", youtube: "", notAvailable: 0}, 
        {  title: "Thegroapp.com", image: backGroundSeven, description: "While working at Greenstar.ca I was assigned the task of designing and developing the new software module named LabelBuddy. This new module would be packaged together with two other modules that are now sold as a full package at thegroapp.com meant to help businesses manage the label creation and updating process. The module I created was a variable-data-mapping pdf editor specifically designed to handle many barcode types. The editor has the ability to save projects where they are, map values to existing barcode positions, manipulate shapes and text-fields, and much more. The product I created enables packaging labels to be updated at the press of a few buttons rather than creating new barcodes and text data every time you need to update the encoded values.", techUsed: ["Laravel", "ReactJS", "MySQL", "PHP", "Javascript", "HTML", "CSS", "RESTapi", "Responsive"],  dateCreated: "2021", link: "https://thegroapp.com/", gitHub: "", youtube: "", notAvailable: 0 }, 
        {  title: "Dijkstra's Traversal Project", image: backGroundSix, description: "This project visualizes the Dijkstra's shortest path algorithm in a fun way. You simply place your start node with the first click, end node with second click, and then the resulting clicks and click-and-drags result in the creation of obstacles. Click the green button to run the visualization. This project was great in aiding my ability to understand complex algorithms.", techUsed: ["ReactJS", "Django", "SP-Algorithms", "Javascript", "Python", "HTML", "CSS"],  dateCreated: "2021", link: "https://www.fullstackgrub.com/algoapps/traverse/", gitHub: "", youtube: "", notAvailable: 0  }, 
        {  title: "Fullstackgrub.com", image: backGroundSeventeen, description: "This is my old porfolio website. This was version 2.0. We are currently on version 3.0", techUsed: ["Django", "ReactJS", "Apache2","Javascript", "HTML", "CSS", "Fontawsome","RESTapi", "Responsive"],  dateCreated: "2021", link: "https://www.fullstackgrub.com/", gitHub: "", youtube: "", notAvailable: 0 },
        {  title: "Social Media Project", image: backGroundOne, description: "This Django social media application incorporates infinite-scrolling (with jQuery-waypoints and Django pagination), full CRUD capabilities, user login (with profile customization), and a likes feature. Another nice feature is that the media is stored in S3 buckets, allowing the server to run without having to store large amounts of image data.", techUsed: ["Django", "JQuery-Waypoints","AWS-S3", "MySQL", "Javascript", "Python", "HTML", "CSS", "Responsive"],  dateCreated: "2020", link: "https://www.fullstackgrub.com/beatbox/", gitHub: "", youtube: "", notAvailable: 0 }, 
        {  title: "Merch Store Project",image: backGroundTwo, description: "This Django/React application incorporates an in-house search engine to make looking for product a little easier. The purpose of this application was to develop a merch store mock-up full with a cart and search feature. This application does also contain a sudo admin mode where the users can see and use the Create, Update, and Delete features.", techUsed: ["ReactJS", "Django", "AWS-S3", "MySQL", "Javascript", "Python", "HTML", "CSS", "RESTapi", "Responsive"],  dateCreated: "2020", link: "https://www.fullstackgrub.com/merchstore/", gitHub: "", youtube: "", notAvailable: 0 }, 
        {  title: "Steam API Project", image: backGroundThree, description: "This Django application incorporates a steam account search feature built using steams web api. After entering your steam accounts specific ID, or Vanity ID, the application will deliver an info/stats card giving the user some useful information about their steam activity. This is similar to a game rank-checking website you've maybe used before.", techUsed: ["Django", "Javascript", "Python", "HTML", "CSS", "Api-Integration", "Responsive" ],  dateCreated: "2020", link: "https://www.fullstackgrub.com/pipeline/", gitHub: "", youtube: "", notAvailable: 0 },
        {  title: "Task App", image: backGroundFour, description: "This Django/React application is my take on the typical task app project so many have done before me. My little Full-Stack twist on it was to add a simple login feature on top of the persistant tasks that are saved in a database for later use by the user. Thats about it for this one.", techUsed: ["ReactJS", "Django", "AWS-S3", "MySQL", "Javascript", "Python", "HTML", "CSS", "RESTapi", "Responsive"],  dateCreated: "2020", link: "https://www.fullstackgrub.com/taskapp/", gitHub: "", youtube: "", notAvailable: 0 }, 
        {  title: "E-Signature Project", image: backGroundFive, description: "This very simple application was made to test an Esignature field concept I was briefed on. It worked just fine and only took about 30 minutes to implement myself.", techUsed: ["Javascript", "HTML", "CSS"],  dateCreated: "2020", link: "https://www.fullstackgrub.com/formquixi/", gitHub: "", youtube: "", notAvailable: 0  }],
      navigationValues: [],
      home: true,
      projectsPage: false,
      educationPage: false,
      aboutPage: false,
      linksPage: false,
      lightSwitch: true,
    }
    this.handleResize = this.handleResize.bind(this)
    this.handlePage = this.handlePage.bind(this)
    this.rocketLaunch = this.rocketLaunch.bind(this)
    this.compArmTwoMoveUp = this.compArmTwoMoveUp.bind(this)
    this.compArmTwoMoveDown = this.compArmTwoMoveDown.bind(this)
    this.handleLettersAnimOn = this.handleLettersAnimOn.bind(this)
    this.handleLettersAnimOff = this.handleLettersAnimOff.bind(this)
    this.handleTransition = this.handleTransition.bind(this)
    this.home = this.home.bind(this)
    this.lightSwitch = this.lightSwitch.bind(this)
  }
  componentDidMount() {
    let outerCircle = document.getElementById("outerCircle")
    let self = this
    outerCircle.onmousemove = (e) => { self.locateCursor(e) }
    let letters = document.getElementsByClassName("HomeScreenLetterWrapper")
    setInterval(() => {
      lettersAnimOn(letters)
      setTimeout(() => {
        lettersAnimOff(letters)
      }, 150)
      setTimeout(() => {
        lettersAnimOn(letters)
      }, 300)
      setTimeout(() => {
        lettersAnimOff(letters)
      }, 380)
    }, 12000)
    // Clear Desktop App for Mobile App to take over
    window.addEventListener('resize', this.handleResize);
    if(window.innerWidth < 1260){
      this.handlePage(1)
    }
    if(window.innerWidth > 1259){
      this.handlePage(2)
    }
    // This feature is for setting the y values of the left side navigation buttons to the exact coordinates as the incoming animation (increment by -25 to account for div sizes behind current div)
    let compButtonOneY= document.getElementById("compButtonOne").getBoundingClientRect().y.toString() + "px"
    let compButtonTwoY= (document.getElementById("compButtonTwo").getBoundingClientRect().y - 25).toString() + "px"
    let compButtonThreeY= (document.getElementById("compButtonThree").getBoundingClientRect().y - 50).toString() + "px"
    let compButtonFourY= (document.getElementById("compButtonFour").getBoundingClientRect().y - 75).toString() + "px"
    let compButtonFiveY= (document.getElementById("compButtonFive").getBoundingClientRect().y - 100).toString() + "px"
    this.setState({
      navigationValues: [compButtonOneY, compButtonTwoY, compButtonThreeY, compButtonFourY, compButtonFiveY]
    })
    // This feature is for scrolling the myprojects page with arrow keys, you can use tab to 
    const myProjectsSuperWrapper = document.getElementById('myProjectsSuperWrapper');
    myProjectsSuperWrapper.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            myProjectsSuperWrapper.scrollTop -= 20; // Adjust scroll step
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            myProjectsSuperWrapper.scrollTop += 20; // Adjust scroll step
        }
      })
  }
  handleResize (){
    // console.log("Resize Handler Ran")

    // V Clear Desktop App for Mobile App to take over V //
    if(window.innerWidth < 1260){
      this.handlePage(1)
    }
    if(window.innerWidth > 1259){
      this.handlePage(2)
    }
    // This feature is for setting the y values of the left side navigation buttons to the exact coordinates as the incoming animation (increment by -25 to account for div sizes behind current div)
    if(this.state.home){
      let compButtonOneY= document.getElementById("compButtonOne").getBoundingClientRect().y.toString() + "px"
      let compButtonTwoY= (document.getElementById("compButtonTwo").getBoundingClientRect().y - 25).toString() + "px"
      let compButtonThreeY= (document.getElementById("compButtonThree").getBoundingClientRect().y - 50).toString() + "px"
      let compButtonFourY= (document.getElementById("compButtonFour").getBoundingClientRect().y - 75).toString() + "px"
      let compButtonFiveY= (document.getElementById("compButtonFive").getBoundingClientRect().y - 100).toString() + "px"
      this.setState({
        navigationValues: [compButtonOneY, compButtonTwoY, compButtonThreeY, compButtonFourY, compButtonFiveY]
      })
    }
  }
  // Clear page takes care of the swap between desktop mode and mobile mode for the application
  handlePage(type){
      // let homeScreenSuperWrapper = document.getElementById("homeScreenSuperWrapper")
      // let childDivsHome = homeScreenSuperWrapper.getElementsByTagName('div')

      let transitionWrapper = document.getElementById("transitionWrapper")
      let childDivsTransition = transitionWrapper.getElementsByTagName('div')

      let homeScreenCompassSuperWrapper = document.getElementById("homeScreenCompassSuperWrapper")
      let childDivsCompass = homeScreenCompassSuperWrapper.getElementsByTagName('div')

      // for (let i = 0; i < childDivsHome.length; i++){
      //   childDivsHome[i].style.display = 'none';
      // }
      // for (let i = 0; i < childDivsTransition.length; i++){
      //   childDivsTransition[i].style.display = 'none';
      // }
      // for (let i = 0; i < childDivsCompass.length; i++){
      //   childDivsCompass[i].style.display = 'none';
      // }
      if(type == 1){
        if(this.state.home == true){
          document.getElementById("navigationSuperWrapper").style.display = "block"
          document.getElementById("navigationButtonOne").style.top = "20%"
          document.getElementById("navigationButtonTwo").style.top = "30%"
          document.getElementById("navigationButtonThree").style.top = "40%"
          document.getElementById("navigationButtonFour").style.top = "50%"
          document.getElementById("navigationButtonFive").style.top = "60%"
        }
        for (let i = 0; i < childDivsTransition.length; i++){
          childDivsTransition[i].style.display = 'none';
        }
        for (let i = 0; i < childDivsCompass.length; i++){
          childDivsCompass[i].style.display = 'none';
        }
      }
      if(type == 2){
        if(this.state.home == true){
          document.getElementById("navigationSuperWrapper").style.display = "none"
        }
        for (let i = 0; i < childDivsTransition.length; i++){
          childDivsTransition[i].style.display = 'block';
        }
        for (let i = 0; i < childDivsCompass.length; i++){
          childDivsCompass[i].style.display = 'block';
        }
      }
  }
  // V HomePage Handlers V //
  locateCursor(e) {
    let xMousePosition = e.clientX
    let yMousePosition = e.clientY
    let earth = document.getElementById("earth")
    const earthData = earth.getBoundingClientRect()
    const xEarthCenter = earthData.left + earthData.width / 2
    const yEarthCenter = earthData.top + earthData.width / 2
    earth.style.transform = 'rotate(' + this.rotationMath(xMousePosition, yMousePosition, xEarthCenter, yEarthCenter) + 'deg)'
    let compassdescription = document.getElementById("compassdescription")
    const compassdescriptionData = compassdescription.getBoundingClientRect()
    const xcompassdescriptionCenter = compassdescriptionData.left + compassdescriptionData.width / 2
    const ycompassdescriptionCenter = compassdescriptionData.top + compassdescriptionData.width / 2
    compassdescription.style.transform = 'rotate(' + -(this.rotationMath(xMousePosition, yMousePosition, xcompassdescriptionCenter, ycompassdescriptionCenter) + 180.6) + 'deg)'
  }
  rotationMath(x, y, xShapeCenter, yShapeCenter) {
    return Math.atan2(x - xShapeCenter, -(y - yShapeCenter)) * (180 / Math.PI)
  }
  rocketLaunch(e, buttonPressed) {
    let rocket = document.getElementById("rocket")
    let outerCircle = document.getElementById("outerCircle")
    outerCircle.onmousemove = null
    rocket.style.top = "-400px"
    setTimeout(() => {
      rocket.style.top = "0px"
      outerCircle.onmousemove = (e) => { this.locateCursor(e) }
      this.handleTransition(buttonPressed)
    }, 1500)
  }
  compArmTwoMoveUp() {
    let hand = document.getElementById("hand")
    hand.style.transform = "rotate(45deg)"
    hand.style.top = "89px"
    let desc = document.getElementById("desc")
    desc.style.top = "64px"
    this.setState({
      compArmTwoDesc: ""
    })
    let dot = document.getElementById("dot")
    dot.style.top = "-500px"
    document.getElementById("compassdescription").style.transition = "opacity 0s"
    document.getElementById("compassdescription").style.opacity = "0"
  }
  compArmTwoMoveDown(type) {
    if (type == "P") {
      this.setState({
        compArmTwoDesc: "Projects"
      })
    }
    else if (type == "E") {
      this.setState({
        compArmTwoDesc: "Education"
      })
    }
    else if (type == "A") {
      this.setState({
        compArmTwoDesc: "About Me"
      })
    }
    else if (type == "L") {
      this.setState({
        compArmTwoDesc: "Links"
      })
    }
    else if (type == "S") {
      this.setState({
        compArmTwoDesc: "Light Switch"
      })
    }
    if (!(window.visualViewport.width < 645 && window.visualViewport.height > 522)) {
      let hand = document.getElementById("hand")
      hand.style.display = "block"
      let desc = document.getElementById("desc")
      desc.style.left = "-40px"
      if (type == "L" || type == "S") {
        hand.style.transform = "rotate(-45deg)"
        hand.style.top = "109px"
        desc.style.top = "114px"
      }
    }
    else if (window.visualViewport.width < 645 && window.visualViewport.height > 522) {
      let hand = document.getElementById("hand")
      hand.style.display = "none"
      let desc = document.getElementById("desc")
      desc.style.top = "60px"
      if (type == "P") {
        desc.style.left = "6px"
      }
      else if (type == "E") {
        desc.style.left = "12px"
      }
      else if (type == "A") {
        desc.style.left = "10px"
      }
      else if (type == "L") {
        desc.style.left = "-4px"
      }
      else if (type == "S") {
        desc.style.left = "20px"
      }
    }
    let dot = document.getElementById("dot")
    dot.style.top = "-480px"
    document.getElementById("compassdescription").style.transition = "opacity 1s ease"
    document.getElementById("compassdescription").style.opacity = "1"
  }
  handleLettersAnimOn(e) {
    e.currentTarget.childNodes[0].style.top = "-15px"
    e.currentTarget.childNodes[0].style.color = "rgb(33, 134, 222)"
    e.currentTarget.childNodes[2].style.top = "+15px"
    e.currentTarget.childNodes[2].style.color = "rgb(102, 255, 0)"
  }
  handleLettersAnimOff(e) {
    e.currentTarget.childNodes[0].style.top = "0px"
    e.currentTarget.childNodes[0].style.color = "white"
    e.currentTarget.childNodes[2].style.top = "0px"
    e.currentTarget.childNodes[2].style.color = "white"
  }
  handleTransition(buttonPressed) {

    let transition = document.getElementById("transition")
    let compRotaterSubOne = document.getElementById("earth")
    let outerCircle = document.getElementById("outerCircle")
    
    transition.style.width = "100vw"

    compRotaterSubOne.style.opacity = "0"

    outerCircle.style.transition = "none"
    outerCircle.style.backgroundColor = "rgb(0, 0, 0)"
    outerCircle.style.boxShadow = "none"

    let transitionWrapper = document.getElementById("transitionWrapper")
    transitionWrapper.style.width = "100vw"

    let compButtons = document.getElementsByClassName("CompButton")
    for (let i = 0; i < compButtons.length; i++){
      compButtons[i].style.display = "none"
    }

    let transitionCircle = document.getElementById("transitionCircle")
    let transitionCompButtonOne = document.getElementById("transitionCompButtonOne")
    let transitionCompButtonTwo = document.getElementById("transitionCompButtonTwo")
    let transitionCompButtonThree = document.getElementById("transitionCompButtonThree")
    let transitionCompButtonFour = document.getElementById("transitionCompButtonFour")
    let transitionCompButtonFive = document.getElementById("transitionCompButtonFive")
    setTimeout(()=>{
      // transition.style.transistion = "all 4s ease"
      transitionCircle.style.borderRadius = "0%"
      transitionCompButtonOne.style.left = "-32px"
      transitionCompButtonTwo.style.left = "-32px"
      transitionCompButtonThree.style.left = "-32px"
      transitionCompButtonFour.style.left = "-32px"
      transitionCompButtonFive.style.left = "-32px"
    }, 400)

    let linksSuperWrapper = document.getElementById("linksSuperWrapper")
    let aboutMeSuperWrapper = document.getElementById("aboutMeSuperWrapper")
    let educationSuperWrapper = document.getElementById("educationSuperWrapper")
    let myProjectsSuperWrapper = document.getElementById("myProjectsSuperWrapper")
    let homeScreenSuperWrapper = document.getElementById("homeScreenSuperWrapper")
    let currentPageStates = [this.state.home, this.state.projectsPage, this.state.educationPage, this.state.aboutPage, this.state.linksPage]
    setTimeout(()=>{
      // Home is about to be display-none so change the state of home. Also so the resize function doesn't keep trying to call compass button positions which are now display none too.
      // if(buttonPressed == 0){
      //   this.setState({
      //   home: true,       ///
      //   projectsPage: false,
      //   educationPage: false,
      //   aboutPage: false,
      //   linksPage: false,
      // })
      //  myProjectsSuperWrapper .style.zIndex = "0"
      //  educationSuperWrapper.style.zIndex = "0"
      //  aboutMeSuperWrapper.style.zIndex = "0"
      //  linksSuperWrapper.style.zIndex = "0"       
      // }
      if(buttonPressed == 1){
        this.setState({
        home: false,       ///
        projectsPage: true,
        educationPage: false,
        aboutPage: false,
        linksPage: false,
      })
       myProjectsSuperWrapper .style.zIndex = "1"
       educationSuperWrapper.style.zIndex = "0"
       aboutMeSuperWrapper.style.zIndex = "0"
       linksSuperWrapper.style.zIndex = "0"
     
      }
      else if(buttonPressed == 2){
        this.setState({
        home: false,       ///
        projectsPage: false,
        educationPage: true,
        aboutPage: false,
        linksPage: false,
      })
       myProjectsSuperWrapper .style.zIndex = "0"
       educationSuperWrapper.style.zIndex = "1"
       aboutMeSuperWrapper.style.zIndex = "0"
       linksSuperWrapper.style.zIndex = "0"
      }
      else if(buttonPressed == 3){
        this.setState({
        home: false,       ///
        projectsPage: false,
        educationPage: false,
        aboutPage: true,
        linksPage: false,
      })
       myProjectsSuperWrapper .style.zIndex = "0"
       educationSuperWrapper.style.zIndex = "0"
       aboutMeSuperWrapper.style.zIndex = "1"
       linksSuperWrapper.style.zIndex = "0"
      }
      else if(buttonPressed == 4){
        this.setState({
        home: false,       ///
        projectsPage: false,
        educationPage: false,
        aboutPage: false,
        linksPage: true,
      })
       myProjectsSuperWrapper .style.zIndex = "0"
       educationSuperWrapper.style.zIndex = "0"
       aboutMeSuperWrapper.style.zIndex = "0"
       linksSuperWrapper.style.zIndex = "1"
      }
      if(currentPageStates[0]){
        let childDivs = homeScreenSuperWrapper.getElementsByTagName('div')
        for (let i = 0; i < childDivs.length; i++){
          childDivs[i].style.display = 'none';
        }
      }
      else if(currentPageStates[1]){
        let childDivs = myProjectsSuperWrapper.getElementsByTagName('div')
        // for (let i = 0; i < childDivs.length; i++){
        //   childDivs[i].style.display = 'none';
        // }
        // myProjectsSuperWrapper.style.display = "none"
        myProjectsSuperWrapper.style.opacity = "0"
      }
      else if(currentPageStates[2]){
        let childDivs = educationSuperWrapper.getElementsByTagName('div')
        // for (let i = 0; i < childDivs.length; i++){
        //   childDivs[i].style.display = 'none';
        // }
        educationSuperWrapper.style.opacity = "0"
      }
      else if(currentPageStates[3]){
        let childDivs = aboutMeSuperWrapper.getElementsByTagName('div')
        // for (let i = 0; i < childDivs.length; i++){
        //   childDivs[i].style.display = 'none';
        // }
        aboutMeSuperWrapper.style.opacity = "0"
      }
      else if(currentPageStates[4]){
        let childDivs = linksSuperWrapper.getElementsByTagName('div')
        // for (let i = 0; i < childDivs.length; i++){
        //   childDivs[i].style.display = 'none';
        // }
        linksSuperWrapper.style.opacity = "0"
      }

    },500)
    let navigationSuperWrapper = document.getElementById("navigationSuperWrapper")
    setTimeout(()=>{

      transitionWrapper.style.display = "none"
      // if(buttonPressed == 1){
      //   myProjectsSuperWrapper.style.opacity = "block"  /////
      //   let childDivs = myProjectsSuperWrapper.getElementsByTagName('div')
      //   // for (let i = 0; i < childDivs.length; i++){
      //   //   childDivs[i].style.display = 'block';
      //   // }
      // }else if(buttonPressed == 2){
      //   educationSuperWrapper.style.display = "block"
      // }else if(buttonPressed == 3){
      //   aboutMeSuperWrapper.style.display = "block"
      // }else if(buttonPressed == 4){
      //   linksSuperWrapper.style.display = "block"
      // }

      navigationSuperWrapper.style.display = "block"
      let childDivs = navigationSuperWrapper.getElementsByTagName('div')
      // Set the top-position values for navigation buttons according to compass buttons Y values
      for (let i = 0; i < childDivs.length; i++){
        childDivs[i].style.top = this.state.navigationValues[i];
      }

    },1000)

    let navigationButtonOne = document.getElementById("navigationButtonOne")
    let navigationButtonTwo = document.getElementById("navigationButtonTwo")
    let navigationButtonThree = document.getElementById("navigationButtonThree")
    let navigationButtonFour = document.getElementById("navigationButtonFour")
    let navigationButtonFive = document.getElementById("navigationButtonFive")
    let myProjectsTitleWrapper = document.getElementById("myProjectsTitleWrapper")

    setTimeout(()=>{
        // if(buttonPressed == 0){
        //   let childDivs = homeScreenSuperWrapper.getElementsByTagName('div')
        // }
        if(buttonPressed == 1){
          myProjectsSuperWrapper.style.opacity = "100"
          myProjectsSuperWrapper.style.transform = "scale(1.0)"
          myProjectsTitleWrapper.style.display = "block"
          myProjectsTitleWrapper.style.animation = "typing 2.0s steps(22, end),blink-caret .6s step-end infinite"
        }else if(buttonPressed == 2){
          educationSuperWrapper.style.opacity = "100"
          educationSuperWrapper.style.transform = "scale(1.0)"
        }else if(buttonPressed == 3){
          aboutMeSuperWrapper.style.opacity = "100"
          aboutMeSuperWrapper.style.transform = "scale(1.0)"
        }else if(buttonPressed == 4){
          linksSuperWrapper.style.opacity = "100"
          linksSuperWrapper.style.transform = "scale(1.0)"
        }

        navigationButtonOne.style.top = "20%"
        navigationButtonTwo.style.top = "30%"
        navigationButtonThree.style.top = "40%"
        navigationButtonFour.style.top = "50%"
        navigationButtonFive.style.top = "60%"
    }, 1200)


    if(window.innerWidth < 1640){
      transitionCircle.style.left = "-58px"
    }
  }
  home() {
    // let transition = document.getElementById("transition")
    // let myProjectsSuperWrapper = document.getElementsByClassName("PagesSuperWrapper")[0]
    // myProjectsSuperWrapper.style.position = "relative"
    // setTimeout(() => {
    //   transition.style.transition = "width 4s ease, height 4s ease"
    // }, 10)
    window.location.reload();
  }
  // ^ HomePage Handlers ^ //
  lightSwitch(){
    if(this.state.lightSwitch){
      document.getElementById("superWrapper").style.backgroundImage = "linear-gradient(to right, #FFC371, #FF5F6D)"
      this.setState({
        lightSwitch: false
      })
    }else{
      document.getElementById("superWrapper").style.backgroundImage = "linear-gradient(to right, rgb(0, 0, 0), rgb(24, 28, 37))"
      this.setState({
        lightSwitch: true
      })
    }
  }
  render() {
    const  myProjectCardList = this.state.projects.map((i) => <MyProjectsCard data={i}/>);
    return (
      <div className="SuperWrapper" id="superWrapper">
        <div className="NavigationSuperWrapper" id="navigationSuperWrapper">
            <div className="NavigationButtonOne NavigationButton" id="navigationButtonOne" onClick={(e) => { this.handleTransition(1) }} title="Projects">
              <CIcon icon={cil3d} size="xl" />
            </div>
            <div className="NavigationButtonTwo NavigationButton" id="navigationButtonTwo" onClick={(e) => { this.handleTransition(2) }} title="Education">
              <CIcon icon={cilEducation} size="xl" />
            </div>
            <div className="NavigationButtonThree NavigationButton" id="navigationButtonThree" onClick={(e) => { this.handleTransition(3) }}title="About Me">
              <CIcon icon={cilWalk} size="xl" />
            </div>
            <div className="NavigationButtonFour NavigationButton" id="navigationButtonFour" onClick={(e) => { this.handleTransition(4) }}title="Links">
              <CIcon icon={cilZoom} size="xl" />
            </div>
            <div className="NavigationButtonFive NavigationButton" id="navigationButtonFive" title="Light Switch" onClick={(e)=> this.lightSwitch()}>
              <CIcon icon={cilContrast} size="xl" />
            </div>
        </div>
        <div className="MyProjectsSuperWrapper" id="myProjectsSuperWrapper">
            <div className="MyProjectsHeaderWrapper"> <div className="MyProjectsTitleWrapper" id="myProjectsTitleWrapper">My Projects</div></div>
            <div className="MyProjectsCardsMasonryWrapper">
             
              {myProjectCardList}
        
            </div>
        </div>
        <div className="EducationSuperWrapper" id="educationSuperWrapper">
          <div className="EducationHeaderWrapper"><div className="EducationTitleWrapper">Education</div></div>
          <div className="EducationMidWrapper">
            <div className="EducationCard"> 
              <div className="EducationImage" style={{backgroundImage: "url(" + wguLogo + ")"}}></div>
              <div className="EducationText" >
                <div style={{marginBottom: "10px"}}>Western Governors University</div> 
                <div style={{fontSize: "13px", marginBottom: "8px"}}>Bachelor of Science - BS, Computer Science</div> 
                <div style={{fontSize: "13px", color: "rgb(184, 184, 184)", marginBottom: "10px"}}>August 2022 - June 2025</div> 
                {/* <div style={{}}>ABET-accredited CS Program</div> */}
              </div>
            </div>
            <div className="EducationCard" style={{marginBottom: "35px"}}> 
              <div className="EducationImage" style={{backgroundImage: "url(" + wguLogo + ")"}}></div>
              <div className="EducationText" >
                <div style={{marginBottom: "10px"}}>Western Governors University</div> 
                <div style={{fontSize: "13px", marginBottom: "8px", lineHeight: "15px"}}>Master of Science - MS, Computer Science, Artificial Intelligence and Machine Learning </div> 
                <div style={{fontSize: "13px", color: "rgb(184, 184, 184)", marginBottom: "10px"}}>August 2025 - Expected June 2026</div> 
                {/* <div style={{}}>ABET-accredited CS Program</div> */}
              </div>
            </div>
            <div className="EducationCard" style={{marginBottom: "38px"}}> 
              <div className="EducationImage" style={{backgroundImage: "url(" + iTILv4Logo + ")", width: "38px", height: "38px", marginRight: "10px"}}></div>
              <div className="EducationText" style={{paddingTop: "0px"}}>
                <div style={{marginBottom: "10px"}}>ITIL® 4 Foundation Certificate in IT Service Management</div> 
                <div style={{fontSize: "13px", marginBottom: "2px"}}>AXELOS Global Best Practice</div>
                <div className="EducationCredentialID" style={{fontSize: "13px", marginBottom: "8px"}} onClick={() => window.open("https://www.peoplecert.org/for-corporations/certificate-verification-service", "_blank")}>Credential ID GR671767461JR <CIcon style={{position: "relative",width: "18px", top: "3px"}}icon={cilHandPointLeft} size="xl" /></div> 
                <div style={{fontSize: "13px", color: "rgb(184, 184, 184)", marginBottom: "10px"}}>Issued Apr 2025 · Expires Apr 2028</div> 
                {/* <div style={{}}>ABET-accredited CS Program</div> */}
              </div>
            </div>
            <div className="EducationCard"> 
              <div className="EducationImage" style={{backgroundImage: "url(" + compTIALogo + ")", width: "46px", height: "46px"}}></div>
              <div className="EducationText" >
                <div style={{marginBottom: "2px"}}>CompTIA Project+ Certification</div> 
                <div className="EducationCredentialID" style={{fontSize: "13px", marginBottom: "8px"}} onClick={() => window.open("https://www.credly.com/badges/674f816e-6e0a-4349-91f0-8e818440bb73/linked_in_profile", "_blank")}>Credential ID COMP001022737827  <CIcon style={{position: "relative",width: "18px", top: "3px"}}icon={cilHandPointLeft} size="xl" /></div> 
                <div style={{fontSize: "13px", color: "rgb(184, 184, 184)", marginBottom: "10px"}}>Issued Mar 2025</div> 
                {/* <div style={{}}>ABET-accredited CS Program</div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="AboutMeSuperWrapper" id="aboutMeSuperWrapper">
          <div className="AboutMeHeaderWrapper"><div className="AboutMeTitleWrapper">About Me</div></div>
          <div className="AboutMeMidWrapper">
            <div className="AboutMeHeadShot"></div>
            <div className="AboutMeDescription">Dynamic Full-Stack Developer with proven expertise working at Greenstaar.ca. Successfully designed a web-based PDF Editor that streamlined THC product label creation. Adept in Agile methodologies and IT project management, I excel in delivering innovative software solutions while enhancing user experience through responsive design. <br></br> <br></br><div style={{textIndent: "10px"}}>Energetic problem-solver with knack for creative and efficient coding solutions. Proficient in modern web technologies including JavaScript, PHP, Python and Web Frameworks such as Laravel and ReactJS with experience in developing robust server-side architecture. Dedicated to leveraging skills to build impactful, scalable Software.</div></div>
          </div>
          <div className="AboutMeExperienceHeaderWrapper"><div className="AboutMeExperienceTitleWrapper">Experience</div></div>
          <div className="AboutMeExperienceWrapper">
            <div className="AboutMeExperienceCard">
              <div className="AboutMeExperienceImage" style={{ backgroundImage: "url(" + greenstaarLogo + ")" }}></div>
              <div className="AboutMeExperienceLocation">Full-Stack Web Developer</div>
              <div className="AboutMeExperienceDate">April - Sept 2021</div>
            </div>
          </div>
          <div className="AboutMeSkillsHeaderWrapper"><div className="AboutMeSkillsTitleWrapper">Skills</div></div>
          <div className="AboutMeSkillsWrapper">
            <div className="AboutMeSkillsCardWrapper">
              <div className="AboutMeSkillCard">Javascript</div>
              <div className="AboutMeSkillCard">Python</div>
              <div className="AboutMeSkillCard">Java</div>
              <div className="AboutMeSkillCard">C++</div>
              <div className="AboutMeSkillCard">CSS</div>
              <div className="AboutMeSkillCard">HTML5</div>
              <div className="AboutMeSkillCard">Django</div>
              <div className="AboutMeSkillCard">ReactJS</div>
              <div className="AboutMeSkillCard">Laravel</div>
              <div className="AboutMeSkillCard">MySQL</div>
              <div className="AboutMeSkillCard">SQL</div>
              <div className="AboutMeSkillCard">Apache2</div>
              <div className="AboutMeSkillCard">Webserver Config</div>
              <div className="AboutMeSkillCard">EC2</div>
              <div className="AboutMeSkillCard">S3</div>
              <div className="AboutMeSkillCard">Git/GitHub</div>
              <div className="AboutMeSkillCard">Machine Learning</div>
              <div className="AboutMeSkillCard">Tensorflow</div>
              <div className="AboutMeSkillCard">Neural Networks</div>
              <div className="AboutMeSkillCard">Image Recognition</div>
              <div className="AboutMeSkillCard">Webdev</div>
              <div className="AboutMeSkillCard">Native App Dev</div>
              <div className="AboutMeSkillCard">GIMP GNU</div>
              <div className="AboutMeSkillCard">Project Management</div>
              <div className="AboutMeSkillCard">Agile Methodologies</div>
              <div className="AboutMeSkillCard">Design</div>
              <div className="AboutMeSkillCard">Development</div>
              <div className="AboutMeSkillCard">Deployment</div>
              <div className="AboutMeSkillCard">Windows/Linux</div>
            </div>
          </div>
        </div>
        <div className="LinksSuperWrapper" id="linksSuperWrapper">
          <div className="LinksHeaderWrapper"><div class="LinksTitleWrapper">Links</div></div>
          <div className="LinksWrapper">
            <a style={{marginLeft: "40px", color: "white"}} href="https://github.com/Grub1000" target="_blank">GitHub</a>
            <a style={{marginLeft: "40px", color: "white"}} href="https://www.linkedin.com/in/jorge-ramirez-02363a18b/"target="_blank">LinkedIn</a>
          </div>
        </div>
        <div className="TransitionSuperWrapper" id="transitionWrapper">
          <div className="Transition" id="transition">
            <div className="TransitionCircle" id="transitionCircle">
              <div className="TransitionCompButtonOne TransitionCompButton" id="transitionCompButtonOne">
                <CIcon icon={cil3d} size="xl" />
              </div>
              <div className="TransitionCompButtonTwo TransitionCompButton" id="transitionCompButtonTwo">
                <CIcon icon={cilEducation} size="xl" />
              </div>
              <div className="TransitionCompButtonThree TransitionCompButton" id="transitionCompButtonThree">
                <CIcon icon={cilWalk} size="xl" />
              </div>
              <div className="TransitionCompButtonFour TransitionCompButton" id="transitionCompButtonFour">
                <CIcon icon={cilZoom} size="xl" />
              </div>
              <div className="TransitionCompButtonFive TransitionCompButton" id="transitionCompButtonFive">
                <CIcon icon={cilContrast} size="xl" />
              </div>
              <div className="TransitionInnerCircle"></div>
            </div>
          </div>
        </div>
        <div className="HeaderSuperWrapper">
          <div className="HeaderLogoWrapper" id="headerLogoWrapper" onClick={() => {this.home()} }></div>
        </div>
        <div className="HomeScreenSuperWrapper" id="homeScreenSuperWrapper">
          <div className="HomeScreenMidInfoWrapper">
            <div className="HomeScreenMidNameWrapper">
              <div className="HomeScreenMidName">
                <div className="HomeScreenLetterWrapper" onMouseOver={(e) => { this.handleLettersAnimOn(e) }} onMouseOut={(e) => { this.handleLettersAnimOff(e) }}>
                  <div className="HomeScreenLetterF">J</div>
                  <div className="HomeScreenLetterS">J</div>
                  <div className="HomeScreenLetterT"><div className="HomeScreenLetterTSub">J</div></div>
                </div>
                <div className="HomeScreenLetterWrapper" onMouseOver={(e) => { this.handleLettersAnimOn(e) }} onMouseOut={(e) => { this.handleLettersAnimOff(e) }}>
                  <div className="HomeScreenLetterF">o</div>
                  <div className="HomeScreenLetterS">o</div>
                  <div className="HomeScreenLetterT"><div className="HomeScreenLetterTSub">o</div></div>
                </div>
                <div className="HomeScreenLetterWrapper" onMouseOver={(e) => { this.handleLettersAnimOn(e) }} onMouseOut={(e) => { this.handleLettersAnimOff(e) }}>
                  <div className="HomeScreenLetterF">r</div>
                  <div className="HomeScreenLetterS">r</div>
                  <div className="HomeScreenLetterT"><div className="HomeScreenLetterTSub">r</div></div>
                </div>
                <div className="HomeScreenLetterWrapper" onMouseOver={(e) => { this.handleLettersAnimOn(e) }} onMouseOut={(e) => { this.handleLettersAnimOff(e) }}>
                  <div className="HomeScreenLetterF">g</div>
                  <div className="HomeScreenLetterS">g</div>
                  <div className="HomeScreenLetterT"><div className="HomeScreenLetterTSub">g</div></div>
                </div>
                <div className="HomeScreenLetterWrapper" onMouseOver={(e) => { this.handleLettersAnimOn(e) }} onMouseOut={(e) => { this.handleLettersAnimOff(e) }}>
                  <div className="HomeScreenLetterF">e</div>
                  <div className="HomeScreenLetterS">e</div>
                  <div className="HomeScreenLetterT"><div className="HomeScreenLetterTSub">e</div></div>
                </div>
                <div style={{ width: "20px" }}></div>
                <div className="HomeScreenLetterWrapper" onMouseOver={(e) => { this.handleLettersAnimOn(e) }} onMouseOut={(e) => { this.handleLettersAnimOff(e) }}>
                  <div className="HomeScreenLetterF">R</div>
                  <div className="HomeScreenLetterS">R</div>
                  <div className="HomeScreenLetterT"><div className="HomeScreenLetterTSub">R</div></div>
                </div>
                <div className="HomeScreenLetterWrapper" onMouseOver={(e) => { this.handleLettersAnimOn(e) }} onMouseOut={(e) => { this.handleLettersAnimOff(e) }}>
                  <div className="HomeScreenLetterF">a</div>
                  <div className="HomeScreenLetterS">a</div>
                  <div className="HomeScreenLetterT"><div className="HomeScreenLetterTSub">a</div></div>
                </div>
                <div className="HomeScreenLetterWrapper" onMouseOver={(e) => { this.handleLettersAnimOn(e) }} onMouseOut={(e) => { this.handleLettersAnimOff(e) }}>
                  <div className="HomeScreenLetterF">m</div>
                  <div className="HomeScreenLetterS">m</div>
                  <div className="HomeScreenLetterT"><div className="HomeScreenLetterTSub">m</div></div>
                </div>
                <div className="HomeScreenLetterWrapper" onMouseOver={(e) => { this.handleLettersAnimOn(e) }} onMouseOut={(e) => { this.handleLettersAnimOff(e) }}>
                  <div className="HomeScreenLetterF">i</div>
                  <div className="HomeScreenLetterS">i</div>
                  <div className="HomeScreenLetterT"><div className="HomeScreenLetterTSub">i</div></div>
                </div>
                <div className="HomeScreenLetterWrapper" onMouseOver={(e) => { this.handleLettersAnimOn(e) }} onMouseOut={(e) => { this.handleLettersAnimOff(e) }}>
                  <div className="HomeScreenLetterF">r</div>
                  <div className="HomeScreenLetterS">r</div>
                  <div className="HomeScreenLetterT"><div className="HomeScreenLetterTSub">r</div></div>
                </div>
                <div className="HomeScreenLetterWrapper" onMouseOver={(e) => { this.handleLettersAnimOn(e) }} onMouseOut={(e) => { this.handleLettersAnimOff(e) }}>
                  <div className="HomeScreenLetterF">e</div>
                  <div className="HomeScreenLetterS">e</div>
                  <div className="HomeScreenLetterT"><div className="HomeScreenLetterTSub">e</div></div>
                </div>
                <div className="HomeScreenLetterWrapper" onMouseOver={(e) => { this.handleLettersAnimOn(e) }} onMouseOut={(e) => { this.handleLettersAnimOff(e) }}>
                  <div className="HomeScreenLetterF">z</div>
                  <div className="HomeScreenLetterS">z</div>
                  <div className="HomeScreenLetterT"><div className="HomeScreenLetterTSub">z</div></div>
                </div>
              </div>
            </div>
            <div className="HomeScreenMidProfWrapper">
              <div className="HomeScreenMidProf">Full Stack Software Developer &</div>
              <div className="HomeScreenMidProf">Computer Science Graduate Student</div>
            </div>
            {/* <div className="HomeScreenMidAboutMeButWrapper">About Me</div> */}
          </div>
          {/* // VV Desktop Version VV // */}
          <div className="HomeScreenCompassSuperWrapper" id="homeScreenCompassSuperWrapper">
            <div className="CompOuterCircle" id="outerCircle">
              <div className="CompInnerCircle">
                <div className="CompRotater">
                  <div className="CompRotaterSubOne" id="earth">
                    <div className="CompRotaterArm" id="rocket"></div>
                    <div className="CompRotaterArmTwo" id="dot">
                      <div className="CompRotaterArmTwoDescFeatureWrapper" id="compassdescription">
                        <div className="CompRotaterArmTwoDescArm" id="hand"></div>
                        <div className="CompRotaterArmTwoDescBox" id="desc">{this.state.compArmTwoDesc}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="CompButtonOne CompButton" id="compButtonOne" onClick={(e) => { this.rocketLaunch(e, 1) }} onMouseEnter={() => { this.compArmTwoMoveDown("P") }} onMouseLeave={() => { this.compArmTwoMoveUp() }}>
                <CIcon icon={cil3d} size="xl" />
              </div>
              <div className="CompButtonTwo CompButton" id="compButtonTwo" onClick={(e) => this.rocketLaunch(e, 2)} onMouseEnter={() => { this.compArmTwoMoveDown("E") }} onMouseLeave={() => { this.compArmTwoMoveUp() }}>
                <CIcon icon={cilEducation} size="xl" />
              </div>
              <div className="CompButtonThree CompButton" id="compButtonThree" onClick={(e) => this.rocketLaunch(e, 3)} onMouseEnter={() => { this.compArmTwoMoveDown("A") }} onMouseLeave={() => { this.compArmTwoMoveUp() }}>
                <CIcon icon={cilWalk} size="xl" />
              </div>
              <div className="CompButtonFour CompButton" id="compButtonFour" onClick={(e) => this.rocketLaunch(e, 4)} onMouseEnter={() => { this.compArmTwoMoveDown("L") }} onMouseLeave={() => { this.compArmTwoMoveUp() }}>
                <CIcon icon={cilZoom} size="xl" />
              </div>
              {/* <div className="CompButtonFive CompButton" id="compButtonFive" onClick={(e) => this.rocketLaunch(e, 5)} onMouseEnter={() => { this.compArmTwoMoveDown("S") }} onMouseLeave={() => { this.compArmTwoMoveUp() }}> */}
              <div className="CompButtonFive CompButton" id="compButtonFive" onClick={(e)=> this.lightSwitch()}>
                <CIcon icon={cilContrast} size="xl" />
              </div>
            </div>
          </div>
          {/* // ^^ Desktop Version ^^ // */}
        </div> 
      </div>
    )
  }
}
const lettersAnimOn = (letters) => {
  for (let i = 0; i < 12; i++) {
    letters[i].childNodes[0].style.left = "-20px"
    letters[i].childNodes[0].style.textShadow = "0 0 8px red"
    letters[i].childNodes[1].style.left = "-10px"
    letters[i].childNodes[1].style.textShadow = "0 0 8px rgb(33, 134, 222)"
    letters[i].childNodes[2].style.left = "+20px"
    letters[i].childNodes[2].style.textShadow = "0 0 8px green"
  }
}
const lettersAnimOff = (letters) => {
  for (let i = 0; i < 12; i++) {
    letters[i].childNodes[0].style.left = "0px"
    letters[i].childNodes[0].style.textShadow = "none"
    letters[i].childNodes[1].style.left = "0px"
    letters[i].childNodes[1].style.textShadow = "none"
    letters[i].childNodes[2].style.left = "0px"
    letters[i].childNodes[2].style.textShadow = "none"
  }
}