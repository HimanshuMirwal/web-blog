import React, { Component } from "react";
import "./css/Information.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import $ from 'jquery';
let lastHeight = $("#abc").height(); 
let lastWidth = $("#abc").width(); 

function checkHeightChange() { 
    const newHeight = $("#abc").height(); 
    const newWidth = $("#abc").width(); 

    if (lastHeight != newHeight || lastWidth != newWidth) { 

        // assign the new dimensions 
        lastHeight = newHeight; 
        // console.log(newHeight);
        window.CallFunction.ChangeHeightFunction(newHeight+60);
        lastWidth = newWidth; 
    } 
} 
setInterval(checkHeightChange, 500);
export default class Information extends Component {
    constructor(props) {
        super(props);
        window.CallFunction = this;
        this.state = {
            Data: [],
        }
        this.ChangeHeightFunction = this.ChangeHeightFunction.bind(this);
    }
    componentDidMount() {
        Axios.get("http://localhost:8000/place/getplace/")
            .then((res) => {
                console.log(res.data)
                this.setState({
                    Data: res.data
                })
                var clientHeight = document.getElementById('abc').offsetHeight;
                this.props.heigthFunction(clientHeight);
            })
            .catch(Err => console.log(Err));
        }
    ChangeHeightFunction(value){
        this.props.heigthFunction(value);
    }
    render() {
        return (
            <>

                <div className="mainInformation" id="abc">
                    {/* {
                        this.props.SendSubTitleValue + " " +
                        this.props.TitleValue

                    } */
                    }
                    {
                        this.state.Data.map((value) => {
                            if (value.TittleName === this.props.TitleValue && value.subtittleName === this.props.SendSubTitleValue) {
                                return (<div className="card" style={{ "width": "100%", "margin": "1% auto" }} key={value._id + "kqlwnklqnwl"}>
                                    <div className="card-body">
                                        <h3 className="card-title InformationHeading" >{value.PlaceForTour}</h3>
                                        <hr></hr>
                                        
                                        <img  style={{height:"100%"}} className="col-12" src={"http://localhost:8000/place/getplaceImage/"+value.filename[0].filename} height="100px" width="100px"/>
                                        <hr></hr>
                                        <div  className="col-lg-12">
                                        <h6 className="card-subtitle mb-2 text-muted">{value.city}</h6>
                                        <p className="card-text paragraphInformation" >{value.PlaceTourExplaination.substring(0, 300)}</p>
                                        <Link to={{
                                            pathname: "/description:"+value._id,
                                            state: {
                                                fromNotifications: value._id
                                            }
                                        }} className="card-link" style={{ textDecoration: "none", "color": "white" }}>
                                            <button className="btn  btn-outline-dark ">Read more</button>
                                        </Link>
                                        </div>
                                    </div>
                                </div>);
                            }
                        })
                    }
                </div>
            </>
        )
    }
} 