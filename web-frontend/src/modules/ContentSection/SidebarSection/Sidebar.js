import React, { Component } from "react";
import "./css/Sidebar.css";
import Axios from "axios";
import { Link } from "react-router-dom";
export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSubTitle: []
        }        
    }
    componentDidMount(props) {
        Axios.get("http://localhost:8000/subtittle/getsubtitle/")
            .then((res) => {
                console.log(res)
                this.setState({
                    dataSubTitle: res.data
                })
            })
            .catch(Err => console.log(Err));
    }
    render() {
        return (
            <>
                <div className="mainSidebar" style={{ height: this.props.HeightValueOfInformationDiv }}>
                    <ul className="UlSidebar">
                        <li className="LiSidebar">{ }</li>
                        {
                            this.state.dataSubTitle.map((value) => {
                                if (value.TittleName === this.props.TitleValue) {
                                    return <div key={value._id + value.subtittleName}>
                                        <li  className="LiSidebar">
                                            <Link to={{
                                                    pathname:"/subtitle/"+value.TittleName+"/"+value.subtittleName,
                                                    TitleValue:value.TittleName,
                                                    SubTittleValue:value.subtittleName
                                                    }} 
                                                    className="LinkSidebar"  
                                                    >
                                                    {value.subtittleName}
                                            </Link>
                                        </li>
                                        <hr />
                                    </div>
                                }
                            })
                        }
                    </ul>
                </div>
            </>
        )
    }
}