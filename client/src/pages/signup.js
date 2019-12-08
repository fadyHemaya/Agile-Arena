import React, { Component } from "react";

import axios from "axios";
import {
  Form,
  Button,
  Col,
  Row,
  Alert
} from "react-bootstrap";
import { Redirect } from 'react-router-dom'

const url = require("../config/url");

export class signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirm: "",
      firstName: "",
      lastName: ""
    };

    console.log(url);
  }

   
getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
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

  handleSubmit = event => {
    event.preventDefault();
    if (document.getElementById("password").value === document.getElementById("confirm").value) {
      const body = {
        user: {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value
        }
      };

      axios.post(url + "/api/user/signup/", body).then(res => {
      let data = "Token "+ res.data.user.token
      document.cookie = "Token="+data;
      window.location.reload();
          
      });


    } else alert('Password does not match')
  };


  alertFunc = ()=> {
    if(this.state.confirm !== this.state.password)
      return <Alert variant="danger"> Passwords do not match </Alert>
  }

  render() {

    if(this.getCookie('Token'))
        {
            return <Redirect to='/home'  />
        }

    return (
      <React.Fragment>
        <Col md={12}>
          <Col md={{ offset: 2, span: 10 }}>
            <Row style={{ height: 0.2 * window.innerHeight + "px" }} />
            <Row>
              <Col>
                <h1> Sign Up </h1>
              </Col>
            </Row>
            <Form className="shadow-lg p-3 mb-5 bg-white rounded w-75  p-3">
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                  required id="email"
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    required
                      type="password" id="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group as={Col} controlId="formGridConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                  required
                    type="password" id="confirm"
                    placeholder="Password"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                  required id="firstName"
                    placeholder="John"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                  required id="lastName"
                    placeholder="Hancock"
                  />
                </Form.Group>
              </Form.Row>

              <Button
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Create an Account
              </Button>
            </Form>
          </Col>
        </Col>
      </React.Fragment>
    );
  }
}

export default signup;
