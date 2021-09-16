import Axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom'
export default class DisplayRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PlaceDataArray: [],
            SubTitleArray: [],
            TitleArray:[],
            SubtitleChangedValue:"",
        }
        this.OnClickDeleteData = this.OnClickDeleteData.bind(this);
        this.OnClickDeleteDataForSubtitle = this.OnClickDeleteDataForSubtitle.bind(this);
        this.OnClickSubtitleChangeValue = this.OnClickSubtitleChangeValue.bind(this);
        this.OnChangeSubtitleTextChangeHandler = this.OnChangeSubtitleTextChangeHandler.bind(this);
        this.OnClickDeleteDataForTitle = this.OnClickDeleteDataForTitle.bind(this);
        this.OnRefreshData = this.OnRefreshData.bind(this);
    }
    componentDidMount() {
        Axios.get("http://localhost:8000/place/getplace/")
            .then((res) => {
                console.log(res.data);
                this.setState({
                    PlaceDataArray: res.data
                })
            }).catch(err => alert(err));

        Axios.get("http://localhost:8000/subtittle/getsubtitle/")
            .then((res) => {
                // console.log(res)
                this.setState({
                    SubTitleArray: res.data
                })
            })
            .catch(Err => console.log(Err));
            Axios.get("http://localhost:8000/tittle/gettitle/")
            .then((res) => {
                // console.log(res)
                this.setState({
                   TitleArray: res.data
                })
            })
            .catch(Err => console.log(Err));
    }
    OnClickDeleteDataForTitle(id, TitleName){
        Axios.post("http://localhost:8000/tittle/deleteTitle/"+id,{TitleName:TitleName}).then((res) => {
            alert(res.data);
        })
        .catch(Err => console.log(Err));
        this.OnRefreshData();
    }
    OnRefreshData(){
        Axios.get("http://localhost:8000/place/getplace/")
            .then((res) => {
                console.log(res.data);
                this.setState({
                    PlaceDataArray: res.data
                })
            }).catch(err => alert(err));

        Axios.get("http://localhost:8000/subtittle/getsubtitle/")
            .then((res) => {
                // console.log(res)
                this.setState({
                    SubTitleArray: res.data
                })
            })
            .catch(Err => console.log(Err));
        Axios.get("http://localhost:8000/tittle/gettitle/").then((res) => {
            // console.log(res)
            this.setState({
                TitleArray: res.data
            })
        })
        .catch(Err => console.log(Err));
    }
    OnClickDeleteData(id) {
        Axios.post("http://localhost:8000/place/delete/" + id)
            .then(res => alert(res.data+" Click Refresh Button to see Results."))
            .catch(Err => alert(Err));

        Axios.get("http://localhost:8000/place/getplace/")
            .then((res) => {
                console.log(res.data);
                this.setState({
                    PlaceDataArray: res.data
                })
            }).catch(err => alert(err))
            this.OnRefreshData();
    }
    OnClickDeleteDataForSubtitle(value, NameOfSubtitle) {
        Axios.post("http://localhost:8000/subtittle/delete/" + value,{NameOfSubtitle:NameOfSubtitle})
            .then(res => alert(res.data+" Click Refresh Button to see Results."))
            .catch(Err => alert(Err));

        Axios.get("http://localhost:8000/subtittle/getsubtitle/")
            .then((res) => {
                console.log(res.data);
                this.setState({
                    SubTitleArray: res.data
                })
            }).catch(err => alert(err))
            this.OnRefreshData();

    }
    OnChangeSubtitleTextChangeHandler(e){
        const value = e.target.value;
        this.setState({
            SubtitleChangedValue:value
        })
    }
    OnClickSubtitleChangeValue(value){
        const data = document.getElementById(value).value;
        Axios.post("http://localhost:8000/subtittle/update/" + value,{SubTitleValue:this.state.SubtitleChangedValue})
            .then((res )=> {
                alert(res.data+" if not then Click Refresh Button to see Results.")
                this.OnRefreshData();
            })
            .catch(Err => alert(Err));
            this.setState({
                SubtitleChangedValue:""
            })
            document.getElementById("SubTitleClear").value="";
        Axios.post("http://localhost:8000/place/updateSubtitle/" + this.state.SubtitleChangedValue,{DataToSend:data})
        .then(res => alert(res.data))
        .catch(Err=>alert(Err));
    }
    render() {
        return (
            <>
                <div className="container-fluid" style={{ padding: "2%", border: "1px solid" }}>
                <div className="container-small" 
                    style={{width: "auto",
                            position: "fixed",
                            left: "0%",
                            bottom: "10%",}}>
                    <a href="#MainTableDetail"><button className="btn btn-info" style={{margin:"1%"}}>Got to Edit detail</button></a>
                    
                    <a href="#SubTitleTableDetail"><button className="btn btn-info" style={{margin:"1%"}}>Got to Edit Subtitle</button></a>
                    </div>
                    <table class="table table-striped table-dark" id="MainTableDetail">
                        <thead>
                        <tr>
                        <th colSpan="6" style={{textAlign:"center"}}>
                            <h2>Table Edit Full Detail of blog Information</h2>
                        </th>
                        </tr>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Sub Title</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Subject Title</th>
                                <th scope="col">
                                <label style={{float:"left"}} >Description</label>
                                <input type="button" className="btn btn-warning" value="Refresh" style={{float:"right"}} onClick={()=>this.OnRefreshData()}/>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.PlaceDataArray.map((Res) => {
                                    return <tr key={Res._id}>
                                        <th scope="row">{Res._id}</th>
                                        <td>{Res.TittleName}</td>
                                        <td>{Res.subtittleName}</td>
                                        <td>{Res.city}</td>
                                        <td>{Res.PlaceForTour}</td>
                                        <td>
                                            <Link to={"/edit:" + Res._id} target="blank">
                                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >
                                                    Edit
                                             </button>
                                            </Link>
                                            <hr style={{ marginTop: "2%", marginBottom: "2%" }} />
                                            <button className="btn btn-danger" onClick={() => this.OnClickDeleteData(Res._id,)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <hr /><hr /><hr />

                <div className="container-fluid" style={{ padding: "2%", border: "1px solid" }}>
                    <table class="table table-striped table-dark" id="SubTitleTableDetail">
                        <thead>
                        <tr>
                        <th colSpan="3" style={{textAlign:"center"}}>
                        <h2>Table Edit Subtitle</h2>
                        </th>
                        </tr>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Sub Title</th>
                                <th>
                                <label style={{width:"20%"}}>Operation</label> 
                                <button style={{float:"right"}} class="btn btn-warning" onClick={()=>this.OnRefreshData()} type="button">Refresh</button> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.SubTitleArray.map((Res, index) => {
                                    return <tr key={Res._id}>
                                        <th scope="row">{Res._id}</th>
                                        <td>{Res.subtittleName}</td>
                                        <td>    
                                                <label style={{fontSize:"20px",textDecoration:"underline",margin:"1% auto"}}>Enter the new Subtitle value</label>
                                                <input type="hidden" id={Res._id} value={Res.subtittleName}/>
                                                <input class="form-control mr-sm-2" type="text"  id={"SubTitleClear"} onChange={(e)=>this.OnChangeSubtitleTextChangeHandler(e)} placeholder="Enter subtitle value"/>
                                                <button style={{width:"100%",marginTop:"1%"}} onClick={()=>this.OnClickSubtitleChangeValue(Res._id)} class="btn btn-success" type="button">Update</button> 
                                           <br />
                                            <hr style={{ marginTop: "2%", marginBottom: "2%" }} />
                                            <button style={{width:"100%",marginTop:"1%"}} className="btn btn-danger" onClick={() => this.OnClickDeleteDataForSubtitle(Res._id,Res.subtittleName)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="container-fluid" style={{ padding: "2%", border: "1px solid" }}>
                    <table class="table table-striped table-dark" id="SubTitleTableDetail">
                        <thead>
                        <tr>
                        <th colSpan="3" style={{textAlign:"center"}}>
                        <h2>Table Edit title</h2>
                        </th>
                        </tr>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col"> Title</th>
                                <th>
                                <label style={{width:"20%"}}>Operation</label> 
                                <button style={{float:"right"}} class="btn btn-warning" onClick={()=>this.OnRefreshData()} type="button">Refresh</button> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.TitleArray.map((Res, index) => {
                                    return <tr key={Res._id}>
                                        <th scope="row">{Res._id}</th>
                                        <td>{Res.TittleName}</td>
                                        <td>    
                                                <label style={{fontSize:"20px",textDecoration:"underline",margin:"1% auto"}}>Enter the new title value</label>
                                                <input type="hidden" id={Res._id} value={Res.TittleName}/>
                                                <input class="form-control mr-sm-2" type="text"  id={"SubTitleClear"} onChange={(e)=>this.OnChangeSubtitleTextChangeHandler(e)} placeholder="Enter subtitle value"/>
                                                <button style={{width:"100%",marginTop:"1%"}} onClick={()=>this.OnClickSubtitleChangeValue(Res._id)} class="btn btn-success" type="button">Update</button> 
                                           <br />
                                            <hr style={{ marginTop: "2%", marginBottom: "2%" }} />
                                            <button style={{width:"100%",marginTop:"1%"}} className="btn btn-danger" onClick={() => this.OnClickDeleteDataForTitle(Res._id, Res.TittleName)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}