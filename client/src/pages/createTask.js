import React, { Component } from "react";
import {
  Form,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";
const url = require("../config/url");

export class createTask extends Component {
  getCookie = cname => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  constructor(props) {
    super(props);
    document.cookie = "projectID="+'5de26b85c06a9b2d602225a4'; //get dynamically
    document.cookie = "token=Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhZHkuaGVtYXlhIiwiaWQiOiI1ZGQ4MTJjMTZhYzgxZTMzOGMyMmFiNTkiLCJleHAiOjE1ODA4NDg2MjQsImlhdCI6MTU3NTY2NDYyNH0.S8de9qN_M5M9bJRkAHcVZZ_CqNPjXB7VdfkVY0siySU"

    // console.log('test')
    // axios.get(url + 'api/project/team?projectID=' + this.getCookie('projectID'),
    // {
    //     headers:{
    //     'Authorization': this.getCookie('token')
    //     }
    // }).then(res => console.log(res)).catch(err=>console.log())

  }

  submit = event => {
    event.preventDefault();

    const projectID = this.getCookie("projectID")

    const body = {
        task:{
            type: document.getElementById("type").value,
            priority: document.getElementById("priority").value,
            name: document.getElementById("name").value,
            points: document.getElementById("points").value,
            description: document.getElementById("description").value,
            status:"ToDo"
        }
    }
    axios.post(url + "api/task?projectID=" + projectID, body, {
        headers : {
        'Authorization': this.getCookie('token')
    }
    }).then(res => {
        console.log(res)         
      }).catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <Col md={12}>
            <Col md={{ offset: 2, span: 10 }}>
              <Row style={{ height: 0.2 * window.innerHeight + "px" }} />
              <Row>
                <Col>
                  <h1> Create Task </h1>
                </Col>
              </Row>
              <Form className="shadow-lg p-3 mb-5 bg-white rounded w-75  p-3">
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label> Name </Form.Label>
                    <Form.Control
                      required
                      id="name"
                      placeholder="Enter Task Name"
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Points</Form.Label>
                    <Form.Control
                      required
                      id="points"
                      placeholder="points"
                      type="Number"
                    />
                  </Form.Group>

                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control as="select" id="priority">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </Form.Control>
                  </Form.Group>
                    <Form.Row/>
                  <Form.Row>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Type</Form.Label>
                      <Form.Control as="select" id="type">
                        <option>Story</option>
                        <option>Bug</option>
                        <option>Task</option>
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
                </Form.Row>

                <Form.Row>
                  <Form.Group controlId="desc">
                    <Form.Label>description</Form.Label>
                    <Form.Control
                      as="textarea"
                      required
                      id="description"
                      placeholder="description..."
                    />
                  </Form.Group>
                </Form.Row>

                <Button onClick={this.submit} variant="primary" type="submit">
                  Create Task
                </Button>
              </Form>
            </Col>
          </Col>
        </React.Fragment>
      </div>
    );
  }
}

export default createTask;
