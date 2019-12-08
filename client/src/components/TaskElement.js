import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
 Badge, 
} from "reactstrap";
import {Button} from 'react-bootstrap'
import { FaBug, FaLongArrowAltUp, FaTasks, FaFileCode,FaArrowLeft,FaArrowRight } from 'react-icons/fa'

export class taskElement extends Component {
  state = {
    priority: '',
    type: ''
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
      <div class="w-70" taskID={this.props.task._id} >
        <Card className="rounded-200  w-100 shadow-lg p-3 mb-2 bg-white rounded">
          <CardHeader>
            {this.props.task.name}
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
            <Col>
            {this.props.task.status != 'ToDo' ?  (<Button taskID = {this.props.task._id} status = {this.props.task.status} onClick={this.props.left} > <FaArrowLeft></FaArrowLeft> </Button>):(<Button disabled> <FaArrowLeft></FaArrowLeft> </Button>)}
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>

            <Col>
            {this.props.task.status != 'Completed' ?  (<Button  taskID = {this.props.task._id} status = {this.props.task.status} onClick={this.props.right}> <FaArrowRight></FaArrowRight> </Button>):(<Button disabled> <FaArrowRight></FaArrowRight> </Button>)}
            </Col>
          </Row>

        </Card>
      </div>
    );
  }
}

export default taskElement;
