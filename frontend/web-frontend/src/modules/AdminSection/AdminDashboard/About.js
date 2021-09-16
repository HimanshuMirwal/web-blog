import React from "react";
import Axios from "axios";
class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            About: '',
            ID:'',
            image:''
        }
        this.changeAbout=this.changeAbout.bind(this);
        this.OnSubmit=this.OnSubmit.bind(this);
        this.changeAboutImage=this.changeAboutImage.bind(this);
    }
    componentDidMount(){
        Axios.get("http://localhost:8000/About/getabout")
        .then(res=>this.setState({About:res.data.about,
            ID:res.data._id,
            image:res.data.image    
        }))
        .catch(err=>alert("Error "+err))
    }

    changeAbout(e){
        const data = e.target.value;
        this.setState({
            About:data
        })
    }
    OnSubmit(){
        Axios.post("http://localhost:8000/About/postabout",{ID:this.state.ID,About:this.state.About,image:this.state.image})
        .then(res=>alert(res.data))
        .catch(err=>alert("Error "+err))
    }
    changeAboutImage(e){
        const data = e.target.value;
        this.setState({
            image:data
        })
    }
    render() {
        return (
            <div className="container-fluid" style={{ padding: "2% 5%" }}>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="2">
                                <h1>About</h1>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="col" colSpan="2">
                                <textarea value={this.state.About} onChange={(e)=>this.changeAbout(e)} rows="10"  style={{ marginBottom: "2%" }} className="form-control">

                                </textarea>
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">
                                <textarea value={this.state.image} cols="60" rows="8" onChange={(e)=>this.changeAboutImage(e)}  style={{ marginBottom: "2%" }} className="form-control" >
                                </textarea>
                            </th>
                            <th scope="col">
                                <img style={{height: "200px",width: "350px",float: "right"}} src={this.state.image}   className="form-control" />
                            </th>
                        </tr>
                        <tr>
                            <th scope="col" colSpan="2">
                                <button  onClick={()=>this.OnSubmit()} class="form-control btn btn-info" >
                                    Update
                                </button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default About;