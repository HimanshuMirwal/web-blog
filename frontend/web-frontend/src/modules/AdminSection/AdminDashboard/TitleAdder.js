import React, { Component } from "react";
import "./css/AdminDashboard.css";
import Axios from "axios";
export default class TitleAdder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MainTitleData: "",
        }
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.OnClickToAddTitleData = this.OnClickToAddTitleData.bind(this);
    }
    onChangeTitle(e) {
        const data = e.target.value;
        this.setState({
            MainTitleData:data
        })
    }
    OnClickToAddTitleData() {
        const Data = this.state.MainTitleData;
        const DataLen = Data.length;
        if(DataLen > 0){
            Axios.post("http://localhost:8000/tittle/send",{TittleName:Data})
            .then(res=>alert(res.data)).catch(Err => alert(Err));
        }else{
            alert("Please Enter the Data Properly!")
        }
        this.setState({
            MainTitleData:""
        })
    }
    render() {
        return (
                <div style={{ width: "90%",  backgroundColor:"#212529", color:"#fff", margin: "5% auto", border: "1px solid", padding: "2%" }}>
                    <h3>Add Title</h3>
                    <form action="" method="POST">
                        <div className="form-group">
                            <label>Subject-name (like tour-travels, cooking etc.)</label>
                            <input type="text" onChange={(e)=>this.onChangeTitle(e)} value={this.state.MainTitleData} className="form-control" />
                        </div>
                        <button type="button" onClick={()=>this.OnClickToAddTitleData()} className="btn btn-primary" style={{ margin: "2%" }}>Submit</button>
                    </form>
                </div>

        )

    }
}