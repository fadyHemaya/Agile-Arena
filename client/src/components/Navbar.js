import React, { Component } from 'react'
import { Form, Button ,Nav,Navbar,FormControl,Row,Col} from 'react-bootstrap'

class MainNavbar extends Component {
    state = {
        user:false
    }
    
    constructor(props) {
        super(props);
        console.log('haha'+this.getCookie('Token'))
    }
    love=()=>{
        document.cookie = 'Token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location.reload();
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

    render() {
        
        return (
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/home">Agile Arena</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="/home">View Your Projects</Nav.Link>
              <Nav.Link href="/invite">Invite to your Project</Nav.Link>
              <Nav.Link href="/backlog">View Backlog</Nav.Link>
              <Nav.Link href="/ViewRunningSprint">View Running Sprint</Nav.Link>
            </Nav>
            <Form inline>
            {!this.getCookie('Token')? (
                <Row>
                <Col>
                 <Nav.Link href="/Signup">SignUp</Nav.Link>
                 </Col>
                 <Col>
                 <Nav.Link href="/Login">Login</Nav.Link>
                 </Col>
                 </Row>
              ) : (<Nav.Link onClick={this.love}>Logout</Nav.Link>)}
           

            </Form>
          </Navbar>

            
        )
    }

}

export default MainNavbar
