import React, { Component } from "react";
import { Card, Col, Button } from "react-bootstrap";
import { IoIosClipboard } from "react-icons/io";
import axios from 'axios'

const url = require('../config/url')

export class projectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      color: "#b3d4ff"
    };
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

  hoverOn = () => {
    this.setState({
      hover: true,
      color: "#440ee6"
    });
  };

  hoverOff = () => {
    this.setState({
      hover: false,
      color: "#b3d4ff"
    });
  };

  handleClick = event => {
    event.preventDefault();
    document.cookie = "projectID=" + this.props.projectID;
    console.log(this.props.projectID);

    //redirect to backlog page...
  };

  delete = () => {
    if (this.props.owner == this.props.userID)
      return <Button variant="danger" onClick={this.handleDelete}> Delete </Button>;
  };

  handleDelete = (event) => {
      event.preventDefault()
      axios.delete(url+'api/project?projectID='+this.props.projectID, {
           headers:{
        'Authorization': this.getCookie('token')
      }
    }).then(this.props.remove(this.props.projectID)).catch(err => console.log(err))  

  }

  render() {
    return (
      <div>
        <Card onMouseEnter={this.hoverOn}
          onMouseLeave={this.hoverOff}
          border="primary"
          style={{ width: "12rem", height: "12rem" }}
          
        >
          <Card.Body style={{ cursor: "pointer"}}
          onClick={this.handleClick}>
            <Card.Title>
              {this.props.name}
              <IoIosClipboard color="blue" />
            </Card.Title>
          </Card.Body>

          <Card.Body
            className="justify-content-md-center"
            style={{ backgroundColor: this.state.color, height: "3rem" }}
          >
            {this.delete()}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default projectCard;
