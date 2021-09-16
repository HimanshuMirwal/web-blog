import React, { Component } from "react";
import "./css/AdminLogin.css";
import Footer from "../../FooterSection/Footer"
import Axios from "axios";
import AdminCode from "../AdminCode/AdminCode";

export default class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginID: "",
            LoginPassword: "",
            count:0
        }
        this.OnChangeLoginID = this.OnChangeLoginID.bind(this);
        this.OnChangeLoginPassword = this.OnChangeLoginPassword.bind(this);
        this.OnClickSubmitButton = this.OnClickSubmitButton.bind(this);
        this.HelperFunctionForAxios = this.HelperFunctionForAxios.bind(this);
        this.getPassToMail = this.getPassToMail.bind(this);
    }
    OnChangeLoginPassword(e) {
        const data = e.target.value;
        this.setState({
            LoginID: data
        })
    }
    OnChangeLoginID(e) {
        const data = e.target.value;
        this.setState({
            LoginPassword: data
        })
    }
    OnClickSubmitButton(e) {
        e.preventDefault();
        console.log(e)
        const IDLen = this.state.LoginID.length;
        const PassLen = this.state.LoginPassword.length;
        const ID = this.state.LoginID;
        const Pass = this.state.LoginPassword;
        console.log(ID + "  " + Pass);
        const Data = {
            ID: ID,
            Pass: Pass,
            auth: true
        }
        if (IDLen < 9 && PassLen < 9) {
            alert("Error");
            const LocalCount = this.state.count+1;
            this.setState({
                count: LocalCount
            })
        } else {
            Axios.post("http://localhost:8000/admin/get/", Data)
                .then((res) => {
                    this.HelperFunctionForAxios(res);
                })
                .catch(Err => console.log(Err));
        }
    }
    HelperFunctionForAxios(res) {
        if (res.data === "0015") {
            alert("Enter the Code Send To Your Email!");
            this.setState({
                auth: true
            });
        } 
        else {
            // alert(res.data + " ID or Password incorrect.")
            document.getElementById("ttt").style="backgorund:red"

            const LocalCount = this.state.count+1;
            this.setState({
                auth: false,
                count: LocalCount
            })
        }
    }
    getPassToMail(){
        alert("Login Credentials are send to Admin mail.")
        Axios.get("http://localhost:8000/Password/sendpasswordtome")
        .then((res) => {
            console.log("Login Credentials are send to Admin mail.")
        })
        .catch(Err => console.log(Err));
    }
    render() {
        if (this.state.auth === true) {
            return <AdminCode />
        }
        if(this.state.count > 3){
            this.getPassToMail()
        }
        return (
            <>
                <div className="MainAdminLogin">
                    <div className="FormDivAdminLogin">
                        <div className="LogoDivAdmin">
                            <i className='fa fa-lock LogoIconAdmin' style={{ fontSize: "150px" }}> </i>
                        </div>
                        <h3 style={{ textAlign: "center" }}>Admin Login</h3>
                        <div className="DivFormAdminLogin">
                            <form method="post">
                                <div className="form-group">
                                    <label ><h5>Your Login ID Number 000001500000</h5></label>
                                    <input type="text" onChange={(e) => this.OnChangeLoginPassword(e)} className="form-control" />
                                </div>
                                <div className="form-group" style={{ marginTop: "5%" }}>
                                    <label><h5>Your Login Password Web-Blog-Password</h5></label>
                                    <input type="password" onChange={(e) => this.OnChangeLoginID(e)} className="form-control" />
                                </div>
                                <button type="submit" onClick={(e) => this.OnClickSubmitButton(e)} className="btn btn-primary" style={{ marginTop: "5%" }}>Login</button>
                                <div className="form-group" style={{ marginTop: "5%" }}>                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}