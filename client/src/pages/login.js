import React, { Component } from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
const url = require('../config/url')

class login extends Component {
    state = {

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

    async submit(event) {
        event.preventDefault();
        var semail = document.getElementById("email").value
        var spassword = document.getElementById("password").value
        try {
            const user = await axios({
                method: "post",
                url: url + "/api/user/login",
                data: {
                    "user": {
                        email: semail,
                        password: spassword
                    }
                }
            })
            if (user) {
                let data = "Token " + user.data.user
                document.cookie = "Token=" + data;
                window.location.reload();
            }
        }

        catch{
            alert("Username or password are not valid")
        }
    }
    render() {
        if (this.getCookie('Token')) {
            return <Redirect to='/home' />
        }
        return (
            <React.Fragment   >
                <Row style={{ height: .09 * window.innerHeight + 'px' }} />
                <Row className='justify-content-md-center'>
                    <Form className="shadow-lg p-3 mb-5 bg-white rounded w-75  p-3">
                        <h1>Login</h1>

                        <Form.Group >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" id="email" required />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" id="password" required />
                        </Form.Group>
                        <Button style={{ textAlign: 'right' }} variant="primary" type="submit" onClick={this.submit.bind(this)}>
                            Submit
</Button>
                    </Form>
                </Row>
            </React.Fragment>
        )
    }

}

export default login