import React, { Component } from "react";
import Logo from "../logoSection/Logo";
import Footer from "../FooterSection/Footer";
import Axios from "axios";
import "./css/FullDescription.css";
import { Link } from "react-router-dom";

export default class FullDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: {},
        }
        this.onClickGotoTop = this.onClickGotoTop.bind(this);
    }
    componentDidMount(props) {
        const { fromNotifications } = this.props.location.state;
        // console.log(fromNotifications);
        Axios.get("http://localhost:8000/place/getplace/:" + fromNotifications)
            .then((res) => {
                this.setState({
                    Data: res.data
                })
                // console.log(res.data)
            })
            .catch(Err => alert(Err) );
    }
    onClickGotoTop() {
        document.getElementById("top").scrollIntoView(true)
    }
    render() {
        return (
            <>
                <Logo />
                <div className="FullDescriptionMain">
                    <div className="DescriptionContent">
                        <h1 className="descriptionHeading" id="top">
                            {this.state.Data.PlaceForTour}
                        </h1>
                        <hr></hr>

                        <button id="" className="btn  btn-dark myBtn" onClick={() => this.onClickGotoTop()}>
                            <i className="fa fa-arrow-up"></i>
                        </button>

                        <h3><p className="descriptionFirstPAragraph">
                            {this.state.Data.city}
                        </p></h3>
                        <p className="descriptionParagraph">
                            {this.state.Data.PlaceTourExplaination}
                        </p>
                        <Link to={"/"}>
                            <button className="btn btn-dark">back</button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}