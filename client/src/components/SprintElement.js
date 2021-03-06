import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
 Badge
} from "reactstrap";
import Axios from "axios";
import {Button} from 'react-bootstrap'
import SprintTask from "./SprintTask";

const url = require('../config/url')


export class SprintElement extends Component {
  state = {
    tasks:[]
  }
  constructor(props) {
    super(props)

    let config = {
        headers: {
            "Authorization": this.getCookie('Token'),
        }
    }

    Axios.get(url + "/api/task/getTasksOfSprint/?sprintID=" + this.props.sprint._id, config).then(Tasks => {
        this.setState({
            tasks: Tasks.data.Tasks
        });

    })

  }
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
removing=(e)=>{
    this.props.remove(e);
    let taskID = e.currentTarget.getAttribute('taskID')
    let arr = this.state.tasks.filter(function (item) {
        if (item._id != taskID) {
            return item
        }
    })
    this.setState(
        {
            tasks:arr
        }
    )

}
DeleteSprint=()=>{
    let config = {
        headers: {
            "Authorization": this.getCookie('Token'),
        }
    }
    Axios.delete(url + "/api/sprint/?sprintID=" + this.props.sprint._id, config).then(Tasks => {
       console.log('refresh')
        window.location.reload();
    })

}
startSprint=()=>{
    let config = {
        headers: {
            "Authorization": this.getCookie('Token'),
        }
    }
    Axios.put(url + "/api/sprint/StartSprint?sprintID=" + this.props.sprint._id,{active:true}, config).then(Tasks => {
        alert('Activated successfully')
     })
    .catch(error=>{
        alert('Only one Sprint can be active')

    })
 
}

  render() {

    return (
      <div class="w-70" >
          <Col>
          <Row>
              <Col>
          <h4><Badge variant="secondary">{this.props.sprint.name}</Badge></h4>
          </Col>
          <Col>
          <Button variant="outline-danger" sprintID={this.props.sprint._id} onClick={this.DeleteSprint}>Delete</Button>
          
            {this.props.sprint.active ? ( <Button variant="outline-success" disabled>Activated</Button>):( <Button sprintID={this.props.sprint._id} variant="outline-success" onClick={this.startSprint}>Activate</Button>)}

            </Col>
          </Row>
          <Row>
          {this.state.tasks.map(Task => {
                                return (<div class="p-2" style={{backgroundColor:"grey"}}>
                                    <SprintTask task={Task} remove={this.removing} />
                                </div>)

                            })}
              </Row>
             <br></br>

   
          </Col>
      </div>
    );
  }
}

export default SprintElement;
