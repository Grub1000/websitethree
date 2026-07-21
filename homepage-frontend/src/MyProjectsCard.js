import React from "react"
import "./App.css"
import CIcon from '@coreui/icons-react';
import {cilLinkAlt, cilMonitor } from '@coreui/icons';
import gitImage from "../src/assets/github-mark-white.svg"

export default class MyProjectsCard extends React.Component {
    constructor() {
        super();
        this.state = {
        }
        // this.clickAnimation = this.clickAnimation.bind(this)
    }

    render() {
        return (
            <div className="MyProjectsCardWrapper">
                <div className="MyProjectCardHeader" style={{ backgroundImage: "url(" + this.props.data.image + ")" }}>
                <div className="MyProjectCardHeaderButtonsWrapper">
                    <div className="MyProjectCardHeaderButtonWrapperTop">{this.props.data.title}</div>
                    <div className="MyProjectCardHeaderButtonWrapperBottom"> {this.props.data.dateCreated}</div>
                </div>
                </div>
                <div className="MyProjectCardMiddle">
                {this.props.data.techUsed.map(i => (
                    <div className="MyProjectCardTechTag">{i}</div>
                ))}
                </div>
                <div className="MyProjectCardFooter">
                <div className="MyProjectCardFooterText">
                    {this.props.data.description}
                </div>
                <div className="MyProjectCardFooterLinksWrapper">
                    {this.props.data.link != "" && <div className="MyProjectCardFooterLinkWrapper" onClick={() => window.open(this.props.data.link, "_blank")}><CIcon icon={cilMonitor} size="xl" /></div>}
                    {this.props.data.gitHub != "" && <div className="MyProjectCardFooterLinkWrapper" onClick={() => window.open(this.props.data.gitHub, "_blank")}><i class=" fa fa-brands fa-github"></i></div>}
                    {this.props.data.youtube != "" && <div className="MyProjectCardFooterLinkWrapper" onClick={() => window.open(this.props.data.youtube, "_blank")} ><i class="fa fa-brands fa-youtube"></i></div>}
                    {this.props.data.notAvailable != 0 && <div style={{marginTop: "8px", marginBottom: "14px"}}>Not Available for View</div>}
                </div>
                </div>
            </div>
        )
    }
}