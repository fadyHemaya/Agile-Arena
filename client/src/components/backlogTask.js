import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
 Badge
} from "reactstrap";
import {Button} from 'react-bootstrap'


import { FaBug, FaLongArrowAltUp, FaTasks, FaFileCode} from 'react-icons/fa'
import {IoIosAddCircleOutline} from 'react-icons/io'
import Axios from "axios";


const url = require('../config/url')


export class backlogTask extends Component {
  state = {
    priority: '',
    type: ''
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
  constructor(props) {
    super(props)
    this.setState({
      type: this.props.task.type
    })

  }


  componentWillMount() {

    if (this.props.task.priority === 'Low') {
      this.setState({
        priority: 'green'
      })
    }
    else if (this.props.task.priority === 'Medium') {

      this.setState({
        priority: 'orange'
      })
    }

    else if (this.props.task.priority === 'High') {
      this.setState({
        priority: 'red'
      })

    }
  }
  
  render() {

    return (
      <div class="w-70" taskID={this.props.task._id}>
        <Card className="rounded-200  w-100 shadow-lg p-3 mb-2 bg-white rounded">
          <CardHeader>
            <Row>
            {this.props.task.name}
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <span className="label label-primary"> User stories =<Badge color="badge badge-info"> {this.props.task.points}</Badge></span>
            </Row>
            <Row>
              <FaLongArrowAltUp style={{ color: this.state.priority }} />

              <Col></Col>

              {this.props.task.type === 'Task' ? (
                <FaFileCode style={{ color: "green" }} />
              ) : (<div></div>)}
              {this.props.task.type === 'Story' ? (
                <FaTasks style={{ color: "blue" }} />
              ) : (<div></div>)}
              {this.props.task.type === 'Bug' ? (
                <FaBug style={{ color: "red" }} />
              ) : (<div></div>)}

            </Row>
          </CardBody>
          <Row>
              <Col xs lg="10"></Col>
              <Col>
            <IoIosAddCircleOutline taskID ={this.props.task._id}onClick={this.props.addToSprint} style={{color:"green",cursor:"pointer"}}> </IoIosAddCircleOutline>
              </Col>
              <Col>
            <Button taskID={this.props.task._id}variant="outline-danger" onClick={this.props.deleteTask}> Delete</Button>
            </Col>
          </Row>

        </Card>
      </div>
    );
  }
}

export default backlogTask;
