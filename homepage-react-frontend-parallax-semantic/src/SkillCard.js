import React from "react"
import "./skillCard.css"



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
import googleLogoSVG from "./assets/logos/google_logo_svg.svg"
import githubLogoSVG from "./assets/logos/github_logo_svg.svg"
import dockerLogoSVG from "./assets/logos/docker_logo_svg.svg"
import apacheLogoSVG from "./assets/logos/apache_logo_svg.svg"
import postmanLogoSVG from "./assets/logos/postman_logo_svg.svg"
import linuxLogoSVG from "./assets/logos/linux_logo_svg.svg"
import gimpLogoSVG from "./assets/logos/gimp_logo_svg.svg"
import csharpLogoSVG from "./assets/logos/csharp_logo_svg.svg"
import qdrantLogoSVG from "./assets/logos/qdrant_logo_svg.svg"
import voyageaiLogoSVG from "./assets/logos/voyageai_logo_svg.svg"


export default class SkillCard extends React.Component{
    constructor(){
        super();
        this.state = {
            icon : null,
        }
    }

    componentDidMount(){
        let icon = null

        if(this.props.data.title == "Python"){
                icon = pythonLogoSVG
                
            }
            else if(this.props.data.title == "Typescript" || this.props.data.title == "TypeScript"){
                icon = typescriptLogoSVG
            }
            else if(this.props.data.title == "CSS"){
                icon = cssLogoSVG
            }
            else if(this.props.data.title == "MySQL"){
                icon = mysqlLogoSVG
            }
            else if(this.props.data.title == "React"){
                icon = reactLogoSVG
            }
            else if(this.props.data.title == "Javascript" || this.props.data.title == "JavaScript"){
                icon = javascriptLogoSVG
            }
            else if(this.props.data.title == "Java"){
                icon = javaLogoSVG
            }
            else if(this.props.data.title == "TensorFlow" || this.props.data.title == "Keras"){
               icon = tensorflowLogoSVG
            }
            else if(this.props.data.title.includes("AWS")){
                icon = awsLogoSVG
            }
            else if(this.props.data.title == "Robotics"){
                icon = robotLogoSVG
            }
            else if(this.props.data.title.includes("Django")){
                icon = djangoLogoSVG
            }
            else if(this.props.data.title.includes("AIML") || this.props.data.title.includes("Machine Learning") || this.props.data.title.includes("LLMs") || this.props.data.title.includes("Neural Networks") || this.props.data.title.includes("Decision Trees") || this.props.data.title.includes("NLPs") || this.props.data.title.includes("Computer Vision")){
                icon = aiLogoSVG
            }
            else if(this.props.data.title == "SQL"){
                icon = sqlLogoSVG
            }
            else if(this.props.data.title == "Laravel"){
                icon = laravelLogoSVG
            }
            else if(this.props.data.title == "PHP"){
                icon = phpLogoSVG
            }
            else if(this.props.data.title == "HTML5"){
                icon = htmlLogoSVG
            }
            else if(this.props.data.title == "OpenAI"){
                icon = openaiLogoSVG
            }
            else if(this.props.data.title.includes("Google")){
                icon = googleLogoSVG
            }
            else if(this.props.data.title.includes("GitHub")){
                icon = githubLogoSVG
            }
            else if(this.props.data.title.includes("Docker")){
                icon = dockerLogoSVG
            }
            else if(this.props.data.title.includes("Linux")){
                icon = linuxLogoSVG
            }
            else if(this.props.data.title.includes("GIMP")){
                icon = gimpLogoSVG
            }
            else if(this.props.data.title.includes("Postman")){
                icon = postmanLogoSVG
            }
            else if(this.props.data.title.includes("Apache")){
                icon = apacheLogoSVG
            }
            else if(this.props.data.title.includes("C#")){
                icon = csharpLogoSVG
            }
            else if(this.props.data.title.includes("Qdrant")){
                icon = qdrantLogoSVG
            }
            else if(this.props.data.title.includes("VoyageAI")){
                icon = voyageaiLogoSVG
            }
            

        this.setState({
            icon: icon
          
        })
    }

    render(){
        return(  
            <div className="HomepageAboutSectionSkillsCard">
                {this.state.icon == null ? <div></div> : <img src={this.state.icon} className="HomepageAboutSectionSkillCardIcon"/>}
                <p className="HomepageAboutSectionSkillCardTitle">{this.props.data.title}</p>
            </div>
        )
    }
}