import React, { Component } from "react";
import "./css/Content.css";
import Sidebar from "./SidebarSection/Sidebar";
import Information from './InformationSection/Information';
export default class Content extends Component {
    constructor(props){
        super(props);
        this.state={
            HeightInformationDiv:"100%"
        }

        this.GetSubTitleValue = this.GetSubTitleValue.bind(this)
        this.SetHeightInformationDiv = this.SetHeightInformationDiv.bind(this);
    }
    
    GetSubTitleValue(value){
        // console.log("i am from Content "+ value);
        this.props.GetSubTitleValue(value);
    }
    SetHeightInformationDiv(value){
        this.setState({
            HeightInformationDiv:value
        })
        console.log(value);
    }
    render(){
        return (
            <>
                <div className="mainDiv">
                   <Sidebar GetSubTitleValue={this.GetSubTitleValue} TitleValue={this.props.SendTitleValueFunction} HeightValueOfInformationDiv={this.state.HeightInformationDiv} />     
                   <Information TitleValue={this.props.SendTitleValueFunction} SendSubTitleValue={this.props.SendSubTitleValue} heigthFunction={this.SetHeightInformationDiv}/>
                </div>
            </>
        )
    }
}