import React, { Component } from "react";
import Axios from "axios";
import TaskElement from '../components/backlogTask'
import { Input} from 'reactstrap'
import {Button, Form, Label, Row, Col } from 'react-bootstrap'
const url = require('../config/url')

export class backlog extends Component {
    state = {
        tasks: [],
        filteredTasks: [],
        searchTerm: ''
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
            if (!projectID) {
                document.cookie = "projectID=" + "5ddbf50340c94847a43c49f1"
                return;
            }

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
        } catch (e) {
            console.log(e);
        }
    }

    searchText(event) {
        this.setState({
            searchTerm: event.target.value
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


    render() {
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
                        <Col xs lg="9">
                        <Input type="text" placeholder="Find Task..." onChange={this.filter.bind(this)}> Search... </Input>
                        </Col>
                        <Col >
                        <Button variant="outline-secondary" > Create new Task</Button>
                        </Col>
                        <Col >
                        <Button variant="outline-success"  > View Runing Task</Button>
                        </Col>
                        <br></br>
                        </Row>

                    </Form>
                    <Row>
                        <Col sm>

                                {this.state.filteredTasks.map(Task => {
                                    return (<div>
                                        <TaskElement task={Task}  />
                                    </div>)

                                })}
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>

        );
    }
}

export default backlog;