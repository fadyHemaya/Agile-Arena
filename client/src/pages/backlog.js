import React, { Component } from "react";
import Axios from "axios";
import TaskElement from '../components/backlogTask'
import { Input} from 'reactstrap'
import {Button, Form, Label, Row, Col,Modal } from 'react-bootstrap'
import SprintElement from '../components/SprintElement'
import { Redirect } from 'react-router-dom'

const url = require('../config/url')

export class backlog extends Component {
    state = {
        sprints:[],
        tasks: [],
        filteredTasks: [],
        searchTerm: '',
        show:false,
        show1:false,
        taskID:''
    };
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

    constructor(props) {
        super(props);

        try {

            let projectID = this.getCookie('projectID')

            let config = {
                headers: {
                    "Authorization": this.getCookie('Token'),
                }
            }

            Axios.get(url + "/api/project/getTasksOfProject/?projectID=" + projectID, config).then(Tasks => {
                this.setState({
                    tasks: Tasks.data

                });
                this.setState({
                    filteredTasks: this.state.tasks
                })

            });
            Axios.get(url + "/api/sprint/?projectID=" + projectID, config).then(sprints => {
                this.setState({
                    sprints: sprints.data
                });
            })
        } catch (e) {
            console.log(e);
        }
    }

    searchText(event) {
        this.setState({
            searchTerm: event.target.value
        })
    }
    remove=(e)=>{
        let taskID = e.currentTarget.getAttribute('taskID')
        let config = {
            headers: {
                "Authorization": this.getCookie('Token'),
            }
        }
        Axios.put(url + "/api/task/?taskID=" + taskID, { task: { sprintID: null } }, config).then(res => {
            let projectID = this.getCookie('projectID')
            Axios.get(url + "/api/project/getTasksOfProject/?projectID=" + projectID, config).then(Tasks => {
                this.setState({
                    tasks: Tasks.data

                });
                this.setState({
                    filteredTasks: this.state.tasks
                })
            })
            })

    }

    filter(event) {
        this.setState({
            searchTerm: event.target.value
        })
        let search = event.target.value.replace(/\s/g, '').toLowerCase()
        this.setState({
            filteredTasks: this.state.tasks.filter(task => {
                let name = task.name.toLowerCase();
                if (name.includes(search)) return task;
            })
        });


    }

    remap(taskia) {
        let list = taskia.map(task => {
            return <h1> {task.name} </h1>;
        });
        return list;
    }
    addToSprint=(e)=>{
        let taskID = e.currentTarget.getAttribute('taskID')
        console.log("id"+taskID)
        this.setState({show:true,taskID:taskID})
      
    }
    closeModal=()=>{
        this.setState({show:false})

    }
    chooseSprint=(e)=>{
        let config = {
            headers: {
                "Authorization": this.getCookie('Token'),
            }
        }
        let sprintID =  e.currentTarget.getAttribute('sprintID')
        Axios.put(url + "/api/task/?taskID=" + this.state.taskID, { task: { sprintID: sprintID } }, config).then(res => {
            window.location.reload();
        })
    }
    show1=()=>{
        this.setState({show1:true})
    }
    closeModal1=()=>
    {
        this.setState({show1:false})
    }
    createSprint=()=>{
        let projectID = this.getCookie('projectID')
        let name = document.getElementById("name").value
        let sdate = document.getElementById("sdate").value
        let edate = document.getElementById("edate").value
        let  data= {
            "sprint": {
                "name": name,
                "startDate": sdate,
                "endDate":edate,
                "projectID":projectID
            }
        }
        
        let config = {
            headers: {
                "Authorization": this.getCookie('Token'),
            }
        }


        Axios.post(url + "/api/sprint/?projectID=" + projectID, data, config).then(res => {
           window.location.reload();
        })

    }
    deleteTask=(e)=>{
        let taskID = e.currentTarget.getAttribute('taskID')
        let config = {
          headers: {
              "Authorization": this.getCookie('Token'),
          }
      }
        Axios.delete(url + "/api/task/?taskID=" + taskID, config).then(sprints => {
            let arr = this.state.filteredTasks.filter(function (item) {
                if (item._id != taskID) {
                    console.log('na if '+item._id+ ' '+taskID)
                  return item
                }
            })
    
        this.setState({tasks:arr,
            filteredTasks:arr
        })
      
        })
    }



    render() {
        if (!this.getCookie('Token')) {
            return <Redirect to='/login' />
        }
        let projectID = this.getCookie('projectID')
        if (!projectID) {

            return (<h1> Choose your project first</h1>)
        }
        return (
            <React.Fragment>
                <Col>
                    <Form>

                        <h3>Search</h3>
                        <Row>
                        <Col xs lg="8">
                        <Input type="text" placeholder="Find Task in Backlog..." onChange={this.filter.bind(this)}> Search... </Input>
                        </Col>
                        <Col >
                        <Button variant="outline-secondary" onClick={event => window.location.href='/createTask'}> Create new Task</Button>
                        </Col>
                        <Col >
                        <Button variant="outline-info" onClick={this.show1} > Create new Sprint </Button>
                        </Col>
                        <Col >
                        <Button variant="outline-success" onClick={event => window.location.href='/ViewRunningSprint'} > View Runing Sprint </Button>
                        </Col>
                        <br></br>
                        </Row>

                    </Form>
                    <Row>
                        <Col sm>
                        <h3>Backlog</h3>

                                {this.state.filteredTasks.map(Task => {
                                    return (<div>
                                        <TaskElement task={Task} addToSprint={this.addToSprint} deleteTask={this.deleteTask} />
                                    </div>)

                                })}
                        </Col>

                                <Col sm>
                                    <Row>
                                    <h3>Sprints</h3>
                                        </Row>
                                <Row>
                                    <Col>
                                {this.state.sprints.map(sprint => {
                                    return (<div>
                                        <Row>
                                        <SprintElement sprint={sprint} remove ={this.remove} />
                                        </Row>
                                    </div>)

                                })}
                                </Col>
                                 </Row>
                        </Col>
                        </Row>
                </Col>
                      <Modal show={this.state.show} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Choose Sprint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
        {this.state.sprints.map(sprint => {
                                    return (<div class="p-2">
                                        <Col>
                                        <Button sprintID={sprint._id}  onClick={this.chooseSprint}> {sprint.name}</Button>
                                        </Col>
                                    </div>)

                                })}
                                </Row>
                                </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={this.state.show1} onHide={this.closeModal1}>
        <Modal.Header >
          <Modal.Title>Create Sprint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group >
    <Form.Label>Sprint name</Form.Label>
    <Form.Control  required placeholder="Enter sprint name" id ="name"/>
    <Form.Label>Sprint Start Date</Form.Label>
    <Form.Control type="date" required id ="sdate"/>
    <Form.Label>Sprint End Date</Form.Label>
    <Form.Control type="date" required id ="edate" />
    <br></br>
    <Button onClick={this.createSprint}> Submit</Button>
    </Form.Group>
                </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
            </React.Fragment>

        );
    }
}

export default backlog;