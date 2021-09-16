import React, { Component } from "react";
import "./css/Footer.css";
export default class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="FooterMainDiv">
                <div className="LineHeightFeedbackText">
                    <b>&copy; All right reserved</b>
                    <hr></hr>
                    <br></br>
                    <p>This website is developed by Himanshu</p>
                </div>
            </div>
        )
    }
}