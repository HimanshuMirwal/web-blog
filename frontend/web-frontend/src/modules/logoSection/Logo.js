import React from "react";
import { Link } from "react-router-dom";
import LogoImage from "./logo/logo.png"

class Logo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav style={{ padding: " 2% 5% " }} className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
          <img src={LogoImage}  alt="Web Blog"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/"><b>Home</b></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about"><b>about us</b></Link>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#FeedbackHomePage"><b>Feedback</b></a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Logo;