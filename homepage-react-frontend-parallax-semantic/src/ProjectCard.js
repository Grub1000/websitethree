import React from "react"
import "./normalize.css"
import "./App.css"
import logo from "./assets/HomePageLogoFixed.png"

import linkedinLogoSVG from "./assets/linkedin_logo_svg.svg"
import pythonLogoSVG from "./assets/logos/python_logo_svg.svg"
import typescriptLogoSVG from "./assets/logos/typescript_logo_svg.svg"
import cssLogoSVG from "./assets/logos/css_logo_svg.svg"
import htmlLogoSVG from "./assets/logos/html_logo_svg.svg"
import mysqlLogoSVG from "./assets/logos/mysql_logo_svg.svg"
import cplusplusLogoSVG from "./assets/logos/cplusplus_logo_svg.svg"
import reactLogoSVG from "./assets/logos/react_logo_svg.svg"
import javascriptLogoSVG from "./assets/logos/javascript_logo_svg.svg"
import openaiLogoSVG from "./assets/logos/openai_logo_svg.svg"
import awsLogoSVG from "./assets/logos/aws_logo_svg.svg"
import aiLogoSVG from "./assets/logos/ai_logo_svg.svg"
import phpLogoSVG from "./assets/logos/php_logo_svg.svg"
import robotLogoSVG from "./assets/logos/robot_logo_svg.svg"
import tensorflowLogoSVG from "./assets/logos/tensorflow_logo_svg.svg"
import javaLogoSVG from "./assets/logos/java_logo_svg.svg"
import djangoLogoSVG from "./assets/logos/django_logo_svg.svg"
import sqlLogoSVG from "./assets/logos/sql_logo_svg.svg"
import laravelLogoSVG from "./assets/logos/laravel_logo_svg.svg"
import qdrantLogoSVG from "./assets/logos/qdrant_logo_svg.svg"
// import typescriptLogoSVG from "./assets/logos/typescript_logo_svg.svg"
// import typescriptLogoSVG from "./assets/logos/typescript_logo_svg.svg"

import checkmarkIcon from "./assets/checkmark-icon.svg"
import exitIconSVG from "./assets/exit_icon_svg.svg"

export default class ProjectCard extends React.Component{
  constructor(){
    super();
    this.state = {
      sliderOpen: false,
      readMoreOpen: false,
    }
    this.handleSliderAnim = this.handleSliderAnim.bind(this)
    this.handleTechIcons = this.handleTechIcons.bind(this)
    this.buttonRef = React.createRef()
    this.sliderRef = React.createRef()
    this.chevronIconRef = React.createRef()
    this.readMoreWrapperRef = React.createRef()
    this.handleReadMoreWrapperOpen = this.handleReadMoreWrapperOpen.bind(this)
  }

  handleSliderAnim(){
    if(!this.state.sliderOpen){
        this.buttonRef.current.style.left = "0px"
        this.sliderRef.current.style.left = "0px"
        this.chevronIconRef.current.style.transform = "rotate(180deg)"
        this.setState({
            sliderOpen: true,
        })
    }else{
        // this.buttonRef.current.style.left = "330px"
        // this.sliderRef.current.style.left = "330px"
        this.buttonRef.current.style.left = "calc(100% - 29px)"
        this.sliderRef.current.style.left = "calc(100% - 29px)"
        this.chevronIconRef.current.style.transform = "rotate(0deg)"
        this.setState({
            sliderOpen: false,
        })
    }
  }

  handleTechIcons(techName){
    if(techName == "Python"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={pythonLogoSVG}></img>)
    }
    else if(techName == "Typescript"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={typescriptLogoSVG}></img>)
    }
    else if(techName == "CSS"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={cssLogoSVG}></img>)
    }
    else if(techName == "MySQL"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={mysqlLogoSVG}></img>)
    }
    else if(techName == "C++"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={cplusplusLogoSVG}></img>)
    }
    else if(techName == "React"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={reactLogoSVG}></img>)
    }
    else if(techName == "Javascript"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={javascriptLogoSVG}></img>)
    }
    else if(techName == "Qdrant"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={qdrantLogoSVG}></img>)
    }
    else if(techName == "Java"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={javaLogoSVG}></img>)
    }
    else if(techName == "TensorFlow"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={tensorflowLogoSVG}></img>)
    }
    else if(techName.includes("AWS")){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={awsLogoSVG}></img>)
    }
    else if(techName == "Robotics"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={robotLogoSVG}></img>)
    }
    else if(techName.includes("Django")){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={djangoLogoSVG}></img>)
    }
    else if(techName.includes("AIML") || techName.includes("Machine Learning") || techName.includes("LLMs")){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={aiLogoSVG}></img>)
    }
    else if(techName == "SQL"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={sqlLogoSVG}></img>)
    }
    else if(techName == "Laravel"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={laravelLogoSVG}></img>)
    }
    else if(techName == "PHP"){
        return(<img className="HomePageProjectsSectionCardTechIcon" src={phpLogoSVG}></img>)
    }

  }

  handleReadMoreWrapperOpen(){
    this.readMoreWrapperRef.current.style.display = "block"
    this.readMoreWrapperRef.current.style.left = "0px"
  }
  handleReadMoreWrapperClose(){
    this.readMoreWrapperRef.current.style.display = "block"
    this.readMoreWrapperRef.current.style.left = "-100%"
  }

  render(){
    return(
        // <div className="HomepageProjectsSectionCard">
        //     <div className="HomepageProjectsSectionCardHeader">
        //         {this.props.data.link != "" && <i class="fa fa-solid fa-laptop"></i>}
        //         {this.props.data.gitHub != "" && <i class="fa fa-brands fa-github"></i>}
        //         {this.props.data.youtube != "" && <i class="fa fa-brands fa-youtube"></i>}
        //         {this.props.data.notAvailable != 0 && <i class="fa fa-solid fa-ban"></i>}
        //         <h2 className="HomepageProjectsSectionCardTitle">{this.props.data.title}</h2>
        //     </div>
        //     {this.props.data.link != "" && <a href={this.props.data.link} target="_blank"><img className="HomepageProjectsSectionCardImage" src={this.props.data.image}></img></a>}
        //     {this.props.data.gitHub != "" && <a href={this.props.data.gitHub} target="_blank"><img className="HomepageProjectsSectionCardImage" src={this.props.data.image}></img></a>}
        //     {this.props.data.youtube != "" && <a href={this.props.data.youtube} target="_blank"><img className="HomepageProjectsSectionCardImage" src={this.props.data.image}></img></a>}
        //     {this.props.data.notAvailable != 0 && <a><img className="HomepageProjectsSectionCardImage" src={this.props.data.image}></img></a>}
        //     {/* <a><img className="HomepageProjectsSectionCardImage" src={this.props.data.image}></img></a> */}
        //     <div className="HomepageProjectsSectionCardCardFooter">
        //         <button className="HomepageProjectsSectionCardDescButton" ref={this.buttonRef} onClick={()=>this.handleSliderAnim()}><i class="fa fa-solid fa-chevron-left HomepageProjectsSectionCardDescButtonIcon" ref={this.chevronIconRef}></i></button>
        //         <div className="HomepageProjectsSectionCardDescSlider" ref={this.sliderRef}>
        //             {this.props.data.description}
        //             <div style={{color: "Yellow", textAlign: "center", padding: "20px"}}>Tech List:</div>
        //             {this.props.data.techUsed.map(i => (
        //             <div className="MyProjectCardTechTag">{i}</div>
        //         ))}
        //         </div>
        //     </div>
        // </div>
        
        <div className="HomepageProjectsSectionCard" onClick={() => {
            if(this.props.data.link != ""){
                window.open(this.props.data.link)
            } 
            else if(this.props.data.gitHub != ""){
                window.open(this.props.data.gitHub)
            }
            else if(this.props.data.youtube != ""){
                window.open(this.props.data.youtube)
            }
            else if(this.props.data.notAvailable != 0){
                // window.open(this.props.data.notAvailable)
            }
        }
        }>
             
            <div className="HomepageProjectsSectionCardReadMoreWrapper" ref={this.readMoreWrapperRef}>
                {/* <p>{this.props.data.dateCreated}</p> */}
                <button className="HomepageProjectsSectionCardReadMoreExitButton" onClick={(event)=> {event.stopPropagation(); this.handleReadMoreWrapperClose()}}>
                    <img className="HomepageProjectsSectionCardReadMoreExitButtonIcon" src={exitIconSVG}></img>
                </button>
                {this.props.data.description.map(descriptionString =>
                    <div className="HomepageProjectsSectionCardReadMoreBulletPointCardWrapper">
                        <img className="HomepageProjectsSectionCardReadMoreBulletPointCardCheckMarkIcon" src={checkmarkIcon}></img>
                        <p className="HomepageProjectsSectionCardReadMoreBulletPointCardText">{descriptionString}</p>
                    </div>
                )}
            </div>
            
            <div className="HomepageProjectsSectionCardHeader">
                {this.props.data.link != "" && <div className="HomepageProjectLinkTypeCard"><i class="fa fa-solid fa-laptop HomepageProjectLinkTypeCardIcon"></i><p className="HomepageProjectLinkTypeCardText">Website</p></div>}
                {this.props.data.gitHub != "" && <div className="HomepageProjectLinkTypeCard"><i class="fa fa-brands fa-github HomepageProjectLinkTypeCardIcon"></i><p className="HomepageProjectLinkTypeCardText">Source</p></div>}
                {this.props.data.youtube != "" && <div className="HomepageProjectLinkTypeCard"><i class="fa fa-brands fa-youtube HomepageProjectLinkTypeCardIcon"></i><p className="HomepageProjectLinkTypeCardText">Youtube</p></div>}
                {this.props.data.notAvailable != 0 && <div className="HomepageProjectLinkTypeCard"><i class="fa fa-solid fa-ban HomepageProjectLinkTypeCardIcon"></i><p className="HomepageProjectLinkTypeCardText">Unavailable</p></div>}
            </div>
            <img className="HomepageProjectsSectionCardImage" src={this.props.data.image}></img>
            <p className="HomepageProjectsSectionCardTypeDescription">{this.props.data.type}</p>
            <h2 className="HomepageProjectsSectionCardTitle">{this.props.data.title}</h2>
            <div className="HomepageProjectsSectionCardTechTagsWrapper">
                {this.props.data.techUsed.map(tech => 
                <div className="HomepageProjectsSectionCardTechTag">{tech}</div>

                )}
            </div>
            <div className="HomepageProjectsSectionCardTechIconsSuperWrapper">
                <div className="HomePageProjectsSectionCardTechIconsWrapper">
                    {this.props.data.techUsed.map(tech => 
                        this.handleTechIcons(tech)
                    )}
                </div>
            </div>
            <div className="HomepageProjectsSectionCardFooter">
                <button className="HomepageProjectsSectionCardFooterReadMoreButton" onClick={(event)=> {event.stopPropagation(); this.handleReadMoreWrapperOpen()}}>Read More</button>
            </div>
        </div>
        
    )
  }
}






