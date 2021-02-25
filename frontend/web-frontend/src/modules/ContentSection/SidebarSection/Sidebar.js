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
        this.SendValueOfSubTitle = this.SendValueOfSubTitle.bind(this);
    }
    componentDidMount() {
        Axios.get("http://localhost:8000/subtittle/getsubtitle/")
            .then((res) => {
                console.log(res)
                this.setState({
                    dataSubTitle: res.data
                })
            })
            .catch(Err => console.log(Err));
    }

    SendValueOfSubTitle(value) {
        // console.log(value);
        this.props.GetSubTitleValue(value);
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
                                            <Link to="" className="LinkSidebar"  onClick={() => this.SendValueOfSubTitle(value.subtittleName)}>
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