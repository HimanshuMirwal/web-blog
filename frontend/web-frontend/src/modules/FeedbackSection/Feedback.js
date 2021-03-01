import React, { Component } from "react";
import queryString from 'query-string'
import "./css/Feedback.css"
import Axios from "axios";

export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TextBox: "",
            TextArea: ""
        }
        this.onClickFunction = this.onClickFunction.bind(this);
        this.ValueOfEmail = this.ValueOfEmail.bind(this);
    }
    ValueOfEmail(E) {
        // console.log(E.target.value);
        const val = E.target.value;
        this.setState({
            TextBox: val
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
        if (Email.length > 4 && Feedback.length > 4) {
            Axios.post("http://localhost:8000/feedback/postfeedback/",{EmailFeedback:Email,EmailDescription:Feedback}).then(res=>alert(res.data)).catch(Err=> alert(Err));
            this.setState({
                TextBox: "",
                TextArea: ""
            })
        }else{
            alert("please! fill the feedback form.")
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
                            <label className="FeedbackLabel">Your E-mail</label>
                            <input type="email" onChange={(e) => this.ValueOfEmail(e)} name="EmailFeedback" className="form-control" style={{ width: "50%" }} placeholder="name@example.com" value={this.state.TextBox} />
                        </div>
                        <div className="form-group FeedbackMArgin">
                            <label className="FeedbackLabel">Your feedback description</label>
                            <textarea className="form-control" name="EmailDescription" value={this.state.TextArea} onChange={(e) => this.valueOfTextarea(e)} id="exampleFormControlTextarea1" rows="5"></textarea>
                        </div>
                        <button type="submit" className="btn btn-dark mb-2" onClick={() => this.onClickFunction()} name="ButtonFeedback">Send Feedback</button>
                    </div>
                </div>
            </>
        )
    }
}