import React from "react"
import "./normalize.css"
import "./App.css"
import logo from "./assets/HomePageLogoFixed.png"

export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      sliderOpen: false,
    }
    this.handleSliderAnim = this.handleSliderAnim.bind(this)
    this.buttonRef = React.createRef()
    this.sliderRef = React.createRef()
  }
  handleSliderAnim(){
    if(!this.state.sliderOpen){
        this.buttonRef.current.style.left = "0px"
        this.sliderRef.current.style.left = "0px"
        this.setState({
            sliderOpen: true,
        })
    }else{
        // this.buttonRef.current.style.left = "330px"
        // this.sliderRef.current.style.left = "330px"
        this.buttonRef.current.style.left = "calc(100% - 29px)"
        this.sliderRef.current.style.left = "calc(100% - 29px)"
        this.setState({
            sliderOpen: false,
        })
    }
  }

  render(){
    return(
        <div className="HomepageProjectsSectionCard">
            <div className="HomepageProjectsSectionCardHeader">
                {this.props.data.link != "" && <i class="fa fa-solid fa-laptop"></i>}
                {this.props.data.gitHub != "" && <i class="fa fa-brands fa-github"></i>}
                {this.props.data.youtube != "" && <i class="fa fa-brands fa-youtube"></i>}
                {this.props.data.notAvailable != 0 && <i class="fa fa-solid fa-ban"></i>}
                <h2 className="HomepageProjectsSectionCardTitle">{this.props.data.title}</h2>
            </div>
            {this.props.data.link != "" && <a href={this.props.data.link} target="_blank"><img className="HomepageProjectsSectionCardImage" src={this.props.data.image}></img></a>}
            {this.props.data.gitHub != "" && <a href={this.props.data.gitHub} target="_blank"><img className="HomepageProjectsSectionCardImage" src={this.props.data.image}></img></a>}
            {this.props.data.youtube != "" && <a href={this.props.data.youtube} target="_blank"><img className="HomepageProjectsSectionCardImage" src={this.props.data.image}></img></a>}
            {this.props.data.notAvailable != 0 && <a><img className="HomepageProjectsSectionCardImage" src={this.props.data.image}></img></a>}
            {/* <a><img className="HomepageProjectsSectionCardImage" src={this.props.data.image}></img></a> */}
            <div className="HomepageProjectsSectionCardCardFooter">
                <button className="HomepageProjectsSectionCardDescButton" ref={this.buttonRef} onClick={()=>this.handleSliderAnim()}><i class=" fa fa-solid fa-bars"></i></button>
                <div className="HomepageProjectsSectionCardDescSlider" ref={this.sliderRef}>
                    {this.props.data.description}
                    <div style={{color: "Yellow", textAlign: "center", padding: "20px"}}>Tech List:</div>
                    {this.props.data.techUsed.map(i => (
                    <div className="MyProjectCardTechTag">{i}</div>
                ))}
                </div>
            </div>
        </div>
    )
  }
}






