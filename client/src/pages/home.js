import React, { Component } from "react";
import axios from "axios";
import ProjectCard from "../components/projectCard";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom'

const url = require("../config/url");

export class home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      show:false,
      userID: '',
    };



    axios
      .get(url + "/api/project", {
        headers: {
          Authorization: this.getCookie("Token")
        }
      })
      .then(res => {
        this.setState({
          projects: res.data.projects
        });
      });


      axios.get(url + "/api/user/current", {
        headers: {
          'Authorization': this.getCookie('Token')
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          userID: res.data.userID,
        });
      });
  }

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

  handleClose = ()=>{
    this.setState({
      show:false
    })
  }

  handleShow = (event)=>{
    event.preventDefault()
    this.setState({
      show:true
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const body = {
      name: document.getElementById("projectName").value,
      description: document.getElementById("description").value
    }

    axios.post(url + '/api/project/', body , {
      headers:{
        'Authorization': this.getCookie('Token')
      }
    }).then(res => {
      console.log(res)
      let arr = this.state.projects
      arr.push(res.data.item)
      this.setState({
        projects:JSON.parse(JSON.stringify(arr))
      })
    }).catch(err => console.log(err));

    this.handleClose()

  }

  remove = (projectID) => {
    console.log(projectID)
    let arr = []
    this.state.projects.map(element =>{
      if(element._id !== projectID){
        arr.push(element)
      }
    })

    this.setState({
      projects: arr
    })
    console.log(arr)
  }

  render() {
    if (!this.getCookie('Token')) {
      return <Redirect to='/login' />
  }

    return (
      <div>
        <Col>
          <h1>Projects</h1>
          <Row style={{ height: 0.1 * window.innerHeight + "px" }} />
          <Row className="justify-content-md-center">
            {this.state.projects.map(element => {
              return (
                <div className="p-2">
                <ProjectCard
                  name={element.name}
                  description={element.description}
                  projectID={element._id}
                  owner = {element.owner}
                  userID = {this.state.userID}
                  remove = {this.remove}
                />
                </div>
              );
            })}
          </Row>
          <br />
          <br />
          <Row className="justify-content-md-center">
            <h1> Create New Project </h1>
          </Row>
          <Row className="justify-content-md-center">
            <Button variant="primary" onClick={this.handleShow}>
              Create Project
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Create Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
              <Form.Group controlId="ProjectName">
                <Form.Label>Project Name</Form.Label>
                <Form.Control type="text" placeholder="Choose a name.." id="projectName"/>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  placeholder="Describe Your Project"
                  id = "description"
                />
              </Form.Group>
            </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </Row>
        </Col>

        {/* <Chart /> */}

        
      </div>
    );
  }
}

export default home;
