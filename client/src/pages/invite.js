import React, { Component } from "react";
import axios from "axios";
import { Table, Row, Modal, Button, Col, Form } from "react-bootstrap";
import { IoMdAddCircle } from "react-icons/io";
import { Redirect } from 'react-router-dom'

const url = require("../config/url");

export class invite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      team: [],
      show: false
    };

    let arr = [];

    axios
      .get(url + "api/project/team?projectID=" + this.getCookie("projectID"), {
        headers: {
          Authorization: this.getCookie("token")
        }
      })
      .then(res => {
          console.log(res.data.team)
        res.data.team.map(member => {
          axios
            .get(url + "api/user?userID=" + member.userID, {
              headers: {
                Authorization: this.getCookie("token")
              }
            })
            .then(result => {
              arr.push({
                userID: member.userID,
                activated: member.activated,
                name: result.data.firstName,
                email: result.data.email
              });

              this.setState({
                team: arr
              });
            })
            .catch(error => console.log(error));
        });
      })
      .catch(err => console.log(err));
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

  handleClose = () =>
    this.setState({
      show: false
    });
  handleShow = () =>
    this.setState({
      show: true
    });

  handleRemove = event => {
    event.preventDefault();
    const index = event.target.id -1
    console.log(event.target.id)
    console.log(this.state.team)
    const userID = this.state.team[index].userID;
    axios
      .put(
        url +
          "api/user/remove?projectID=" +
          this.getCookie("projectID") +
          "&userID=" +
          userID,
        {},
        {
          headers: {
            Authorization: this.getCookie("token")
          }
        }
      )
      .then(res => {
        console.log(res);
        let arr = this.state.team
        arr.splice(index, 1)
        console.log(arr)
        this.setState({
            team: JSON.parse(JSON.stringify(arr))
        })

      })
      .catch(err => console.log(err));
  };

  handleSubmit = event => {
    event.preventDefault();
    this.handleClose();

    const token = this.getCookie("token");

    axios
      .put(
        url +
          "api/user/invite?projectID=" +
          this.getCookie("projectID") +
          "&email=" +
          document.getElementById("email").value,
        {},
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
          console.log(res.data)
        let arr = this.state.team;
        arr.push({
          userID: res.data.recepient._id,
          name: res.data.recepient.firstName,
          email: res.data.recepient.email,
          activated: false
        });
        this.setState({
          team: JSON.parse(JSON.stringify(arr))
        });
        alert(res.data.message);
      })
      .catch(err => {
        console.log(err);
        alert("enter valid registered email not in team");
      });
  };

  render() {
    if (!this.getCookie('Token')) {
      return <Redirect to='/login' />
  }

    let counter = 1;
    return (
      <div>
        <h1> Invite Team Members </h1>
        <Row style={{ height: 0.1 * window.innerHeight + "px" }} />
        <Row className="justify-content-md-center">
          <Table striped bordered hover style={{ width: "15rem" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>email</th>
                <th>Active</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {this.state.team.map(member => {
                return (
                  <tr>
                    <td>{counter}</td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.activated + ''}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={this.handleRemove}
                        id={counter++}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
        <Row>
          <Col md={{ span: 4, offset: 10 }}>
            <IoMdAddCircle
              color="blue"
              size={42}
              style={{ cursor: "pointer" }}
              onClick={this.handleShow}
            />
          </Col>
        </Row>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Invite</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Enter user email to invite...
            <Form>
              <Form.Group controlId="ProjectName">
                <Form.Control
                  type="text"
                  placeholder="example@gmail.com"
                  id="email"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default invite;
