import React, { Component } from "react";
import "./css/Feedback.css"
import Axios from "axios";

export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            NameTextBox:"",
            TextBox: "",
            TextArea: "",
            Div:'<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>Error!</strong> You should check in on some of those fields below.<button type="button" style="background:none;border:none" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
            Div1:'<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Successfully send, </strong> Thanks for your valuable feedback.<button type="button" style="background:none;border:none" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
        }
        this.onClickFunction = this.onClickFunction.bind(this);
        this.ValueOfEmail = this.ValueOfEmail.bind(this);
        this.ValueOfName = this.ValueOfName.bind(this);
    }
    ValueOfEmail(E) {
        // console.log(E.target.value);
        const val = E.target.value;
        this.setState({
            TextBox: val
        })
    }
    ValueOfName(e){
        const val = e.target.value;
        this.setState({
            NameTextBox: val
        })
    }
    valueOfTextarea(E) {
        // console.log(E.target.value);
        const val = E.target.value;
        this.setState({
            TextArea: val
        })
    }
    onClickFunction() {
        const Email = this.state.TextBox;
        const Feedback = this.state.TextArea;
        const Name = this.state.NameTextBox;
        if (Email.length > 4 && Feedback.length > 4 && Name.length>0) {
            Axios.post("http://localhost:8000/feedback/postfeedback/",{Name:this.state.NameTextBox,EmailFeedback:Email,EmailDescription:Feedback})
            .then(res=>{
                document.getElementById("AlertDiv").innerHTML=this.state.Div1
            })
            .catch(Err=> {
                document.getElementById("AlertDiv").innerHTML=this.state.Div
            });
            this.setState({
                TextBox: "",
                TextArea: "",
                NameTextBox:""
            })
        }else{
            // alert("please! fill the feedback form.")
            document.getElementById("AlertDiv").innerHTML=this.state.Div
        }

    }
    render() {
        return (
            <>
                <div className="FeedbackMain" id="FeedbackHomePage">
                    <div className="FormBlock">
                        <h2>Feedback</h2>
                        <hr></hr>
                        <div className="form-group FeedbackMArgin">
                            <label className="FeedbackLabel">Your Name</label>
                            <input type="email" onChange={(e) => this.ValueOfName(e)} name="EmailFeedback" className="form-control" style={{ width: "50%" }} placeholder="name@example.com" value={this.state.NameTextBox} />
                        </div>
                        <div className="form-group FeedbackMArgin">
                            <label className="FeedbackLabel">Your E-mail</label>
                            <input type="email" onChange={(e) => this.ValueOfEmail(e)} name="EmailFeedback" className="form-control" style={{ width: "50%" }} placeholder="name@example.com" value={this.state.TextBox} />
                        </div>
                        <div className="form-group FeedbackMArgin">
                            <label className="FeedbackLabel">Your feedback</label>
                            <textarea className="form-control" name="EmailDescription" value={this.state.TextArea} onChange={(e) => this.valueOfTextarea(e)} id="exampleFormControlTextarea1" rows="5"></textarea>
                        </div>
                        <button type="submit" className="btn btn-dark mb-2" onClick={() => this.onClickFunction()} name="ButtonFeedback">Send Feedback</button>
                        <div id="AlertDiv">

                        </div>
                    </div>
                </div>
            </>
        )
    }
}