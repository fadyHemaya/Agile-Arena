import React, { Component } from 'react'
import { Form, InputGroup, Button, ButtonGroup, FormControl, Col, Row, Container } from 'react-bootstrap'
//import axios from 'axios'

class login extends Component {
    state = {

    }
    render() {
        return (
            <React.Fragment>
                <Form class = "shadow-lg p-3 mb-5 bg-white rounded">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
  </Button>
                </Form>
            </React.Fragment>
        )
    }

}

export default login