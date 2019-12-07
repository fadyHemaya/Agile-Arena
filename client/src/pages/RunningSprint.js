import React, { Component } from "react";
import Axios from "axios";
import TaskElement from '../components/taskElement'
import { Input, Form, Label, Button, Row, Col } from 'reactstrap'
const url = require('../config/url')

export class tasks extends Component {
    state = {
        tasks: [],
        Ttasks: [],
        CTasks: [],
        Ptasks: [],
        TfilteredTasks: [],
        CfilteredTasks: [],
        PfilteredTasks: [],

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
    right = (e) => {
        let status = e.currentTarget.getAttribute('status')
        let taskID = e.currentTarget.getAttribute('taskID');
        let config = {
            headers: {
                "Authorization": this.getCookie('Token'),
            }
        }
        if (status == 'ToDo') {
            let x = null
            Axios.put(url + "/api/task/?taskID=" + taskID, { task: { status: "InProcess" } }, config).then(res => {
                let arr = this.state.TfilteredTasks.filter(function (item) {
                    if (item._id == taskID) {
                        x = item
                        x.status = "InProcess"
                    }
                    else return item
                })

                let arr1 = this.state.PfilteredTasks.concat(x)

                this.setState({
                    TfilteredTasks: arr,
                    Ttasks: arr,
                    PfilteredTasks: arr1,
                    Ptasks: arr1
                })
            })
        }
        else if (status == 'InProcess') {
            let x = null
            Axios.put(url + "/api/task/?taskID=" + taskID, { task: { status: "Completed" } }, config).then(res => {
                let arr = this.state.PfilteredTasks.filter(function (item) {
                    if (item._id == taskID) {
                        x = item
                        x.status = "Completed"
                    }
                    else return item
                })
                let arr1 = this.state.CfilteredTasks.concat(x)

                this.setState({
                    PfilteredTasks: arr,
                    Ptasks: arr,
                    CfilteredTasks: arr1,
                    Ctasks: arr1
                })
            })
        }
    }
    left = (e) => {
        let status = e.currentTarget.getAttribute('status')
        let taskID = e.currentTarget.getAttribute('taskID');
        let config = {
            headers: {
                "Authorization": this.getCookie('Token'),
            }
        }
        if (status == 'InProcess') {
            let x = null
            Axios.put(url + "/api/task/?taskID=" + taskID, { task: { status: "ToDo" } }, config).then(res => {
                let arr = this.state.PfilteredTasks.filter(function (item) {
                    if (item._id == taskID)
                    {
                        x = item
                        x.status = "ToDo"
                    }
                    else return item
                })
                let arr1 = this.state.TfilteredTasks.concat(x)

                this.setState({
                    PfilteredTasks: arr,
                    Ptasks: arr,
                    TfilteredTasks: arr1,
                    Ttasks: arr1
                })
            })
        }
        else if (status == 'Completed') {
            let x = null
            Axios.put(url + "/api/task/?taskID=" + taskID, { task: { status: "InProcess" } }, config).then(res => {
                let arr = this.state.CfilteredTasks.filter(function (item) {
                    if (item._id == taskID)
                    {
                        x = item
                        x.status = "InProcess"
                    }
                    else return item
                })
                let arr1 = this.state.PfilteredTasks.concat(x)

                this.setState({
                    CfilteredTasks: arr,
                    Ctasks: arr,
                    PfilteredTasks: arr1,
                    Ptasks: arr1
                })
            })
        }



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
                let T = this.state.tasks.filter(task => task.status == 'ToDo')
                let P = this.state.tasks.filter(task => task.status == 'InProcess')
                let C = this.state.tasks.filter(task => task.status == 'Completed')
                this.setState({
                    Ttasks: T,
                    Ptasks: P,
                    Ctasks: C
                });
                this.setState({
                    TfilteredTasks: this.state.Ttasks,
                    PfilteredTasks: this.state.Ptasks,
                    CfilteredTasks: this.state.Ctasks
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
            TfilteredTasks: this.state.Ttasks.filter(task => {
                let name = task.name.toLowerCase();
                if (name.includes(search)) return task;
            })
        });
        this.setState({
            PfilteredTasks: this.state.Ptasks.filter(task => {
                let name = task.name.toLowerCase();
                if (name.includes(search)) return task;
            })
        });
        this.setState({
            CfilteredTasks: this.state.Ctasks.filter(task => {
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

                        <Label>Search</Label>
                        <Input type="text" placeholder="Find Task..." onChange={this.filter.bind(this)}> Search... </Input>
                        <br></br>


                    </Form>
                    <Row>
                        <Col sm>
                            <h4>ToDo</h4>
                            {this.state.TfilteredTasks.map(Task => {
                                return (<div>
                                    <TaskElement task={Task} right={this.right} left={this.left} />
                                </div>)

                            })}
                        </Col>
                        <Col sm >
                            <h4>InProcess</h4>
                            {this.state.PfilteredTasks.map(Task => {
                                return (<div>
                                    <TaskElement task={Task} right={this.right} left={this.left} />
                                </div>)
                            })}
                        </Col>
                        <Col sm>
                            <h4>Completed</h4>
                            {this.state.CfilteredTasks.map(Task => {
                                return (<div>
                                    <TaskElement task={Task} right={this.right} left={this.left} />
                                </div>)

                            })}
                        </Col>
                    </Row>
                </Col>
            </React.Fragment>

        );
    }
}

export default tasks;