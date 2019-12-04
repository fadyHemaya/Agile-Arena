import React, { Component } from 'react'
import { Form, InputGroup, Button, ButtonGroup, FormControl, Col, Row, Container } from 'react-bootstrap'
//import axios from 'axios'

class login extends Component {
    state = {

    }
    async submit (event){
        event.preventDefault();
      var semail = document.getElementById("email").value
      var spassword = document.getElementById("password").value
      console.log(semail)
      console.log(spassword)

    }
    render() {
        return (
            <React.Fragment >
                <Col md={12}>
                    <Col md={{offset:2,span:10}}>
                <Form className="shadow-lg p-3 mb-5 bg-white rounded w-75  p-3">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" id ="email"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" id ="password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.submit.bind(this)}>
                        Submit
  </Button>
                </Form>
                </Col>
                </Col>
            </React.Fragment>
        )
    }

}

export default login