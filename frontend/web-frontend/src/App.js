import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Main from "./Main";
import FullDescription from "../src/modules/FullDescriptioSection/FullDescription";
import AdminLogin from "./modules/AdminSection/AdminLogin/AdminLogin";
import Modal from "../src/modules/AdminSection/AdminDashboard/Modal";

export default class App extends React.Component {
    render() {
        return (
            <div>
                {}
                <Router>
                    <Route path="/" exact component={Main} />
                    {/*<Route path="home" component={Home} />*/}
                    <Route path="/description" component={FullDescription} />
                    <Route path="/description:Value" component={FullDescription} />
                    <Route path="/login" component={AdminLogin} />
                    <Route path="/edit:id" component={Modal} />
                </Router>
            </div>
        )
    }
}
