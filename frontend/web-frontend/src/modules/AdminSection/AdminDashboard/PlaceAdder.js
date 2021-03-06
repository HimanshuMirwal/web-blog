import React, { Component } from "react";
import "./css/AdminDashboard.css";
import Axios from "axios";

export default class PlaceAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MainTitleArray: [],
            SubTitleArray: [],
            selectArraySubTitle: [],
            SelectedSubTitle: "",
            SelectedTitle: "",
            city: "",
            TourPlace: "",
            TourPlaceDescription: "",
            selectedFile: null

        }
        this.onChangeSubTitle = this.onChangeSubTitle.bind(this);
        this.OnClickToAddTitleData = this.OnClickToAddTitleData.bind(this);
        this.OnChangeSelectedTitle = this.OnChangeSelectedTitle.bind(this);
        this.OnChangeSelectedSubTitle = this.onChangeSelectedSubTitle.bind(this);
        this.OnChangeCity = this.OnChangeCity.bind(this);
        this.OnChangeTourPlace = this.OnChangeTourPlace.bind(this);
        this.OnChangeTourPlaceDescription = this.OnChangeTourPlaceDescription.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    componentDidMount() {
        Axios.get("http://localhost:8000/tittle/gettitle/")
            .then(
                (result) => {
                    this.setState({
                        MainTitleArray: result.data
                    });
                    // console.log(result.data);
                },
                (error) => {
                    console.log(error);
                }
            )
        Axios.get("http://localhost:8000/subtittle/getsubtitle/")
            .then((res) => {
                // console.log(res)
                this.setState({
                    SubTitleArray: res.data
                })
            })
            .catch(Err => console.log(Err));
    }
    onChangeSubTitle(e) {
        const data = e.target.value;
        const arrayData = [];
        this.state.SubTitleArray.map((res) => {
            if (res.TittleName === data) {
                arrayData.push(res.subtittleName);
            }
        })
        this.setState({
            selectArraySubTitle: arrayData
        })
        console.log(arrayData);
    }

    OnClickToAddTitleData(e) {
        const TitleName = this.state.SelectedTitle;
        const SubTitleName = this.state.SelectedSubTitle;
        const city = this.state.city;
        const PlaceToTour = this.state.TourPlace;
        const TourPlaceDescription = this.state.TourPlaceDescription;
        let count = 0;
        for (var x = 0; x < this.state.selectedFile.length; x++) {
            const Type = this.state.selectedFile[x].type.substring(0,5);
            if(Type !== "image"){
                count = 1
            }
        }

        const data = new FormData()
        for (var x = 0; x < this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }
        data.append("TittleName", TitleName);
        data.append("state", SubTitleName);
        data.append("city", city);
        data.append("TourPlace", PlaceToTour);
        data.append("TourPlaceDescription", TourPlaceDescription);
        if (count !== 1) {
            if (city.length > 0 && PlaceToTour.length > 0 && TourPlaceDescription.length > 0) {
                Axios.post("http://localhost:8000/place/add/",data)
                .then(res => alert(res.data))
                .catch(Err=>alert(Err));
                this.setState({
                    city:"",
                    TourPlace:"",
                    TourPlaceDescription:""
                });
                document.getElementById("FileToUpload").value=null;
            } else {
                alert("please Fill the data Correctely.");
            }
        }else{
            alert("Please Select The Images Only.")
        }
    }
    OnChangeCity(e) {
        const data = e.target.value;
        this.setState({
            city: data
        })
    }
    onChangeSelectedSubTitle(e) {
        const data = e.target.value;
        this.setState({
            SelectedSubTitle: data
        })
    }
    OnChangeSelectedTitle(e) {
        const data = e.target.value;
        this.setState({
            SelectedTitle: data
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
    onChangeHandler(event) {
        this.setState({
            selectedFile: event.target.files,
        })
    }
    render() {
        return (
            <div>
                <div style={{ width: "80%", margin: "5% auto", border: "1px solid", padding: "2%" }}>
                    <form method="POST">
                        <div className="form-group">
                            <label>Subject-name (like tour-travels, cooking etc.)</label>
                            <select className="form-control" name="TittleName" onChange={(e) => { this.onChangeSubTitle(e); this.OnChangeSelectedTitle(e) }}>
                                <option key="lklkm  qlkml">.......Click here to Choose......</option>
                                {
                                    this.state.MainTitleArray.map((res) => {
                                        return <option key={res.TittleName} value={res.TittleName}>{res.TittleName}</option>
                                    })
                                }
                            </select>
                            <label>Sub-title(like tour-travels=Haryana)</label>
                            <select className="form-control" name="state" onChange={(e) => this.OnChangeSelectedSubTitle(e)} >
                                <option key="lklkm  qlkml">.......Click here to Choose......</option>
                                {
                                    this.state.selectArraySubTitle.map((res) => {
                                        return <option key={res} value={res}>{res}</option>
                                    })
                                }
                            </select>
                            <label>city-name</label>
                            <input type="text" name="city" value={this.state.city} onChange={(e) => this.OnChangeCity(e)} className="form-control" />
                            <label>place-name</label>
                            <input type="text" name="TourPlace" value={this.state.TourPlace} onChange={(e) => this.OnChangeTourPlace(e)} className="form-control" />
                            <label>place-description</label>
                            <textarea name="TourPlaceDescription" value={this.state.TourPlaceDescription} onChange={(e) => this.OnChangeTourPlaceDescription(e)} className="form-control" >
                            </textarea>
                            <label>Images</label>
                            <input type="file" id="FileToUpload" class="form-control" multiple onChange={this.onChangeHandler} />
                        </div>
                        <button type="button" onClick={() => this.OnClickToAddTitleData()} className="btn btn-primary" style={{ margin: "2%" }}>Submit</button>
                    </form>
                </div>
            </div>

        )

    }
}