import React, { Component } from "react";
import Logo from "../logoSection/Logo";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Footer from "../FooterSection/Footer";
import Axios from "axios";
import "./css/FullDescription.css";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

export default class FullDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: {
                LinksName: []
            },
        }
        this.onClickGotoTop = this.onClickGotoTop.bind(this);
    }
    componentDidMount(props) {
        const len = this.props.match.params.Value.length;
        const fromNotifications = this.props.match.params.Value.substring(1, len);
        console.log(fromNotifications);
        Axios.get("http://localhost:8000/place/getplace/:" + fromNotifications)
            .then((res) => {
                this.setState({
                    Data: {...res.data ,
                            PlaceTourExplaination:parse(res.data.PlaceTourExplaination),
                            LinksName:res.data.imageLinksArray.map(data=> { return data})   
                        },

                    
                })
            })
            .catch(Err => alert(Err));
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

                        <h2><p className="descriptionFirstPAragraph">
                            {this.state.Data.city}
                        </p></h2>
                        
                        <Carousel autoPlay infiniteLoop interval="3000">
                            {
                                 this.state.Data.LinksName.map((user) => {
                                    return  <div key={user}><img height="600px" width="100%" src={user} /> </div>
                            })
                            }
                        </Carousel>
                        
                        <hr></hr>
                        <p className="descriptionParagraph" id="viewinfo">
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