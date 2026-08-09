import { useState, useEffect} from 'react'
import '../css/home_page_css/App.css'

// Auth Context import
import { useAuth } from "../context/AuthContext";

// React Router imports
import { Link } from "react-router-dom";

// Image imports
import logo from "../assets/website_logo_new.png"
import homepageMainSectionDescriptionImage from "../assets/Resume.svg"
import burgerMenuIconSVG from "../assets/burger_menu_svg.svg" 
import burgerMenuExitIconSVG from "../assets/burger_menu_exit_svg.svg"

// Component imports
import HeaderButton from '../components/HeaderButton'
import InfiniteCarouselTrack from '../components/InfiniteCarouselTrack'
import HeaderBurgerDropdownNav from '../components/HeaderBurgerDropdownNav';

// CarouselImage Imports
import carouselImageOne from "../assets/Carousel Images/carousel_image_1.png"
import carouselImageTwo from "../assets/Carousel Images/carousel_image_2.png"
import carouselImageThree from "../assets/Carousel Images/carousel_image_3.png"
import carouselImageFour from "../assets/Carousel Images/carousel_image_4.png"
import carouselImageFive from "../assets/Carousel Images/carousel_image_5.png"
import carouselImageSix from "../assets/Carousel Images/carousel_image_6.png"
import carouselImageSeven from "../assets/Carousel Images/carousel_image_7.png"
import carouselImageEight from "../assets/Carousel Images/carousel_image_8.png"
import carouselImageNine from "../assets/Carousel Images/carousel_image_9.png"
import carouselImageTen from "../assets/Carousel Images/carousel_image_10.png"
import carouselImageEleven from "../assets/Carousel Images/carousel_image_11.png"
import carouselImageTwelve from "../assets/Carousel Images/carousel_image_12.png"


function HomePage() {
  // const [count, setCount] = useState(0)
  
  useEffect(() => {
    // The componentDidMount logic goes here (e.g., API calls, subscriptions)
    console.log('Component successfully mounted!');
    const homepageImage = document.getElementById('homepageMainSectionDescriptionImage') as HTMLImageElement;
    homepageImage.style.transform = "scale(100%)";
  }, []);

  const [buttons] = useState({
    button1: {order: 0, title: "Resume", dropdownButtons: {}},
    button2: {order: 1, title: "Tools", dropdownButtons: {}},
    button3: {order: 2, title: "Examples", dropdownButtons: {}},
    button4: {order: 3, title: "Pricing", dropdownButtons: {}},
    // button5: {order: 4, title: "Chicken", dropdownButtons: {}},
    // button6: {order: 5, title: "Noodle", dropdownButtons: {}},
    // button7: {order: 6, title: "Soup", dropdownButtons: {}}
  })

  const [carouselImages] = useState([
    carouselImageOne,
    carouselImageTwo,
    carouselImageThree,
    carouselImageFour,
    carouselImageFive,
    carouselImageSix,
    carouselImageSeven,
    carouselImageEight,
    carouselImageNine,
    carouselImageTen,
    carouselImageEleven,
    carouselImageTwelve,
    carouselImageOne,
    carouselImageTwo,
    carouselImageThree,
    carouselImageFour,
    carouselImageFive,
    carouselImageSix,
  ]);


  const headerButtonsArray = Object.values(buttons);

  const carouselImagesArray = carouselImages;

  const { isAuthenticated } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // const [isLoading, setIsLoading] = useState(false);

  const handleBurgerDropdown = (dropdownOpen: boolean) => {
    const hamburgerDropdown = document.getElementById("headerBurgerDropdownWrapper") as HTMLElement;
    hamburgerDropdown.style.display = dropdownOpen ? "block" : "none";
    setDropdownOpen(dropdownOpen);
  }

  // If window width > 760px go ahead and remove the burger button dropdown menu and set the state of dropdownOpen to false.
  const hamburgerDropdown = document.getElementById('headerBurgerDropdownWrapper') as HTMLSelectElement;
  window.addEventListener('resize', () => {
    const isBigScreen = window.innerWidth > 760;
    if (hamburgerDropdown && isBigScreen) {
      hamburgerDropdown.style.display = "none"
      setDropdownOpen(false);
    }
  });


  return (
    <section className="HomePage"> 

      <header className="Header">
        <a className="HeaderLogoWrapper" href="/resuscan/">
          <img src={logo} className="HeaderLogoImage" alt="Website Logo"></img>
        </a>
        <nav>
          <section className="HeaderButtonsWrapper">
            {headerButtonsArray.map((button, index) => (
              <HeaderButton key={index} button={button}/>
            ))}
          </section>
        </nav>
        <section className="HeaderSignInLogInButtonsWrapper">
          {isAuthenticated ? (
          // <Link to="/profile" className="HeaderSignInButton Btn">My Profile</Link>
            null
          ) : (
            <Link to="/login" className="HeaderSignInButton Btn">Sign In</Link>)}
          
          {isAuthenticated ? (
            <Link to="/resume-analyzer" className="HeaderGetStartedButton Btn">My Documents</Link>
          ) : (
            <Link to="/login" className="HeaderGetStartedButton Btn">Get Started</Link>
          )}
        </section>
        <section className="HeaderBurgerButtonWrapper">
          <button className="HeaderBurgerButton Btn" onClick={() => handleBurgerDropdown(!dropdownOpen)}>
            {dropdownOpen ? (
              <img className="HeaderBurgerButtonIconImage"  style={{ transform: 'scale(90%)', opacity: 0.7 }} src={burgerMenuExitIconSVG} alt="Exit Icon"/>
            ) : (
              <img className="HeaderBurgerButtonIconImage"  src={burgerMenuIconSVG} alt="Burger Icon"/>
            )}
          </button>
          {/* <button className="HeaderSignInButton Btn">Burger</button> */}
        </section>
        <div className="HeaderBurgerDropdownWrapper" id="headerBurgerDropdownWrapper">
          <HeaderBurgerDropdownNav />
        </div>
      </header>

      <main className='Main'>
        <section className="HomePageMainSectionWrapper">
          <div className="HomePageMainSectionDescriptionWrapper">
            <h1 className="HomePageMainSectionDescriptionTitle">Land more interviews with ResuScan <span className="Highlight">Analyzer</span></h1>
            <p className="HomePageMainSectionDescriptionText">Get instant feedback on your resume and increase your chances of landing interviews. Powered by AI technology.</p>
            <button className="HomePageMainSectionDescriptionResumeScoreButton Btn">Get Your Resume Score</button>
            <button className="HomePageMainSectionDescriptionJobMatchButton Btn">Get A Job Match</button>
          </div>
          <div className="HomePageMainSectionDescriptionImageWrapper">
            <img className="HomePageMainSectionDescriptionImage" src={homepageMainSectionDescriptionImage} alt="Description Image" id="homepageMainSectionDescriptionImage"/>
          </div>
        </section>
        <section className="HomePageMainSectionLowerWrapper">
          <InfiniteCarouselTrack images={carouselImagesArray} />
        </section>
      </main>

      <footer className='Footer'>
        <p className="FooterCopyRightMessage">© 2026 Jorge Ramirez. All rights reserved.</p>
      </footer>
      
    </section>
  )
}

export default HomePage
