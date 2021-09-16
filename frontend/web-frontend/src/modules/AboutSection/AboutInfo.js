import axios from "axios";
import React from "react";
import "./AboutInfo.css"
import Parse from "html-react-parser";
import Logo from "../logoSection/Logo";
import Footer from "../FooterSection/Footer";

export default class AboutInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            About: '',
            image: ''
        }
    }
    componentDidMount() {
        axios.get("http://localhost:8000/About/getabout")
            .then(res => {
                this.setState({
                    About: Parse(res.data.about),
                    image: res.data.image
                })
            })
    }

    render() {
        return (
            <div className="container-fluide">
                <Logo />
                <div className="row" style={{ padding: "2% 5%" }}>
                <h2>About us</h2>
                        <hr className="HrLine" />
                    <div className="ImageusDiv">
                        <img className="Image" src={this.state.image} />
                    </div>
                    <div className="AboutusDiv">
                        
                        <p>{this.state.About}</p>
                    </div>

                </div>
                <Footer />
            </div>
        )
    }
}