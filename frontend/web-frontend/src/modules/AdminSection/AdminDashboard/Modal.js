import React, { Component } from "react";
import Axios from "axios";
export default class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TittleName: "",
            SubTittleName: "",
            city: "",
            TourPlace: "",
            TourPlaceDescription: "",
            id:""
        }
        this.OnChangeCity = this.OnChangeCity.bind(this);
        this.OnChangeTourPlace = this.OnChangeTourPlace.bind(this);
        this.OnChangeTourPlaceDescription = this.OnChangeTourPlaceDescription.bind(this);
        this.OnClickSubmitButton = this.OnClickSubmitButton.bind(this);
    }
    componentDidMount(){
        const len = this.props.match.params.id.length;
        const data = this.props.match.params.id.substring(1, len);
        console.log(data);
        Axios.get("http://localhost:8000/place/getplace/:" + data)
        .then((res) => {
            this.setState({
                TittleName: res.data.TittleName,
                SubTittleName: res.data.subtittleName,
                city: res.data.city,
                TourPlace: res.data.PlaceForTour,
                TourPlaceDescription: res.data.PlaceTourExplaination,
                id:res.data._id
            })
            console.log(res.data)
        })
        .catch(Err => alert(Err) );
    }
    OnChangeCity(e) {
        const data = e.target.value;
        this.setState({
            city: data
        })
    }
    OnChangeTourPlace(e) {
        const data = e.target.value;
        this.setState({
            TourPlace: data
        })
    }
    OnChangeTourPlaceDescription(e) {
        const data = e.target.value;
        this.setState({
            TourPlaceDescription: data
        })
    }
    OnClickSubmitButton() {
        const data = this.state.id;
        console.log("this is sid"+data);
        const DataToSend = this.state;
        console.log(DataToSend);
        Axios.post("http://localhost:8000/place/update/",DataToSend)
        .then((res)=>{alert(res.data);window.close()})
        .catch(Err=>alert(Err));
        this.setState({
            city: "",
            TourPlace: "",
            TourPlaceDescription: "",
        })
    }
    render() {
        return <>
            <nav class="navbar navbar-light bg-light" style={{ padding: "2%" }}>
                <span class="navbar-brand mb-0 h1">Web Blog</span>
            </nav>
            <div className="container-fluid col-8" style={{margin:"1% auto 20% auto"}}>
                <form method="POST">
                    <div className="form-group">
                        <label>Subject-name (like tour-travels, cooking etc.)</label>
                        <select name="TittleName" className="form-control" >
                            <option value={this.state.TittleName}>{this.state.TittleName}</option>
                        </select>
                        <label>Sub-title(like tour-travels=Haryana)</label>
                        <select name="state" className="form-control" >
                            <option value={this.state.SubTittleName}>{this.state.SubTittleName}</option>
                        </select>
                        <label>city-name</label>
                        <input onChange={(e) => this.OnChangeCity(e)} type="text" name="city" value={this.state.city} className="form-control" />
                        <label>place-name</label>
                        <input onChange={(e) => this.OnChangeTourPlace(e)} type="text" name="TourPlace" value={this.state.TourPlace} className="form-control" />
                        <label>place-description</label>
                        <textarea onChange={(e) => this.OnChangeTourPlaceDescription(e)} rows="10" name="TourPlaceDescription" value={this.state.TourPlaceDescription} className="form-control" >
                        </textarea>
                    </div>
                </form>
                <button style={{ margin: " 1% auto" }} type="button" className="btn btn-primary" onClick={() => this.OnClickSubmitButton()}>Save changes</button>
            </div>
            <div style={{
                position: "fixed",
                left: "0",
                bottom: "0",
                width: "100%",
                height:"10%",
                background: "black",
                color: "white",
                "text-align": "center",
            }} >
                <p style={{lineHeight:"250%"}}>@Web Blog</p>
            </div>
        </>
    }
}