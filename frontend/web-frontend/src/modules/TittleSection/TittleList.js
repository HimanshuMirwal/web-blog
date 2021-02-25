import React from 'react';
import ReactDOM from 'react-dom';
import "./Css/TittleList.css";
import Axios from "axios";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataList: [],
            TitleValue:null,
            dataSubTitle:null

        };
        this.GetTitleValue = this.GetTitleValue.bind(this);
    }
    componentDidMount() {
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
    GetTitleValue(value) {
        const Subtitle=[]
        this.state.dataSubTitle.map((data)=>{
            if(data.TittleName === value){
                Subtitle.push(data.subtittleName);
            }
        })
        this.props.TitleValueFunction(value,Subtitle[0]);
    }
    render() {
        return (
            <div className="main" style={{ padding: "0" }}>
                <nav className="navbar navbar-dark bg-dark " style={{ padding: "1% 3%" }}>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa fa-sort" aria-hidden="true"></i>
                    </button>
                </nav>
                <div className="pos-f-t listDiv">
                    <div className="collapse" id="navbarToggleExternalContent">
                        <div className="bg-light p-4">
                            <ul className="uList" style={{ padding: "0" }}>
                                {
                                    this.state.DataList.map((data) => {
                                        return <li key={data.TittleName} className="lList nav-item" onClick={() => this.GetTitleValue(data.TittleName)}>{data.TittleName}</li>
                                    })
                                }
                                <li className="lList nav-item">jwnkenkjnwelknl</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
