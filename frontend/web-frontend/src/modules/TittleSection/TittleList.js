import React from 'react';
import ReactDOM from 'react-dom';
import "./Css/TittleList.css";
import Axios from "axios";
import { Link } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataList: [],
            TitleValue: null,
            dataSubTitle: null,
            toggle : false
        };
        this.myFunction = this.myFunction.bind(this);
    }
    componentDidMount(props) {
        Axios.get("http://localhost:8000/tittle/gettitle/")
            .then(
                (result) => {
                    this.setState({
                        DataList: result.data
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
        Axios.get("http://localhost:8000/subtittle/getsubtitle/")
            .then((res) => {
                // console.log(res)
                this.setState({
                    dataSubTitle: res.data
                })
            }).catch(Err => console.log(Err));
    };

    myFunction() {
        (this.state.toggle)?this.setState({toggle:false}):this.setState({toggle:true});
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
      }
    render() {
        return (
            <div className="mainTittleCss" >
                <div class="topnav" id="myTopnav">
                    <div className="ButtonDiv">
                    <abbr title="Click here for more subjects.">
                    <button className="icon" onClick={()=>this.myFunction()}>
                        {(this.state.toggle)?<i className="fa 2x fa-caret-up "  aria-hidden="true"></i>:<i className="fa fa-caret-down" aria-hidden="true"></i>}
                    </button>
                    </abbr>
                    </div>

                    <div className="ListDiv">

                    {/* <a href="#home" className="">Home</a> */}
                    {
                        this.state.DataList.map((data) => {
                            return <Link  
                                        to={{pathname:"/title/"+data.TittleName,TitleValue:data.TittleName}} 
                                        className="ALinks">
                                        {data.TittleName}
                                    </Link>
                        })
                    }
                    <a href="#news" className="ALinks">News</a>
                    <a href="#contact" className="ALinks">Contact</a>
                    <a href="#about" className="ALinks">About</a>
                    </div>
                </div>
            </div>
        );
    }
}

{/* <li key={data.TittleName} style={{width:"30%"}} className="nav-item nav-link" onClick={() => this.GetTitleValue(data.TittleName)}>
                                            <b>{data.TittleName}</b>
                                        </li> */}

export default App;
