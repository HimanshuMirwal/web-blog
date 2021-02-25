import Axios from "axios";
import React, { Component } from "react";
import { Link } from 'react-router-dom'
export default class DisplayRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PlaceDataArray: [],
        }
        this.OnClickDeleteData = this.OnClickDeleteData.bind(this);
    }
    componentDidMount() {
        Axios.get("http://localhost:8000/place/getplace/")
            .then((res) => {
                console.log(res.data);
                this.setState({
                    PlaceDataArray: res.data
                })
            }).catch(err => alert(err))
    }
    OnClickDeleteData(id){
        Axios.post("http://localhost:8000/place/delete/"+id)
        .then(res=>alert(res.data))
        .catch(Err=> alert(Err));
        
        Axios.get("http://localhost:8000/place/getplace/")
        .then((res) => {
            console.log(res.data);
            this.setState({
                PlaceDataArray: res.data
            })
        }).catch(err => alert(err))
    }
    render() {
        return (
            <>
                <div className="container-fluid" style={{ padding: "2%", border: "1px solid" }}>
                    <table class="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Title</th>
                                <th scope="col">Sub Title</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Subject Title</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.PlaceDataArray.map((Res) => {
                                    return <tr key={Res._id}>
                                        <th scope="row">{Res._id}</th>
                                        <td>{Res.TittleName}</td>
                                        <td>{Res.subtittleName}</td>
                                        <td>{Res.city}</td>
                                        <td>{Res.PlaceForTour}</td>
                                        <td>
                                            <Link to={"/edit:"+Res._id} target="blank">
                                             <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >
                                                Edit
                                             </button>
                                            </Link>
                                            <hr style={{ marginTop: "2%", marginBottom: "2%" }} />
                                            <button className="btn btn-danger" onClick={()=>this.OnClickDeleteData(Res._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}