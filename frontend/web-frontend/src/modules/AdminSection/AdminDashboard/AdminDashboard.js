import React, { Component } from "react";
import "./css/AdminDashboard.css";
import Axios from "axios";
import {Link, Redirect }from "react-router-dom";
import TitleAdder from "./TitleAdder";
import SubTitleAdder from "./SubTitleAdder";
import PlaceAdder from './PlaceAdder';
import DisplayRecords from "./DisplayRecords";
export default class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        let Auth= false; 
       let AuthSes=localStorage.getItem('AdminAuth');
        if(AuthSes){
            Auth=true
        }
        this.state = {
            MainTitleArray: [],
            SubTitleArray: [],
            selectArraySubTitle: [],
            AdminDashboardAuth:Auth,
            displayRecord:true,
            AddRecord:false
        }
        this.onChangeSubTitle = this.onChangeSubTitle.bind(this);
        this.OnClickLogout = this.OnClickLogout.bind(this);
        this.OnClickToAddTitleData = this.OnClickToAddTitleData.bind(this);
        this.displayEditDisplayRecord = this.displayEditDisplayRecord.bind(this);
        this.displayAddRecord = this.displayAddRecord.bind(this);
    }
    componentDidMount() {
        window.addEventListener('beforeunload', this.handleUnload);
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
    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleUnload);
      }
    
      handleUnload(e) {
        alert("closing!!!!!");
        localStorage.removeItem("AdminLoginFeedback");
        localStorage.removeItem("AdminAuth");
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
    OnClickLogout(){
        localStorage.removeItem("AdminLoginFeedback");
        localStorage.removeItem("AdminAuth");
    }
    
      
      OnClickToAddTitleData(){
        
      }
      displayAddRecord(){
        this.setState({
            displayRecord:false,
            AddRecord:true
        })
      }
      displayEditDisplayRecord(){
        this.setState({
            displayRecord:true,
            AddRecord:false
        })
      }
    render() {
        if(this.state.AdminDashboardAuth === false){
            return <Redirect to="/login"/>
        }
        if(this.state.AddRecord){
            return (
                <div>
                    <nav className="navbar navbar-light bg-light" style={{padding:"2%"}}>
                        <a className="navbar-brand" href="#">Navbar</a>
                        <Link to="/"> <button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>this.OnClickLogout()}  type="submit">Log Out</button></Link>
                    </nav>
                    <div className="container-small">
                    <button className="btn btn-primary" onClick={()=>this.displayAddRecord()} style={{margin:"2% 4%"}}>Add Records</button>
                    <button className="btn btn-primary" onClick={()=>this.displayEditDisplayRecord()} style={{margin:"2% 4%"}}>Edit and Display Records</button>
                    </div>
                    <TitleAdder />
                    <SubTitleAdder />
                    <PlaceAdder />
                </div>
    
            )
        }
        if(this.state.displayRecord){
            return (
                <div>
                   <nav className="navbar navbar-light bg-light" style={{padding:"2%"}}>
                        <a className="navbar-brand" href="#">Navbar</a>
                        <Link to="/"> <button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>this.OnClickLogout()}  type="submit">Log Out</button></Link>
                    </nav>
                    <div className="container-small">
                    <button className="btn btn-primary" onClick={()=>this.displayAddRecord()} style={{margin:"2% 4%"}}>Add Records </button>
                    <button className="btn btn-primary" onClick={()=>this.displayEditDisplayRecord()} style={{margin:"2% 4%"}}>Edit and Display Records</button>
                    </div>
                    <DisplayRecords />
                </div>
    
            )
        }
    }
}