import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import login from "./pages/login";
import signup from './pages/signup'
import home from './pages/home'
import invite from './pages/invite'
import createTask from './pages/createTask'
import runningSprint from "./pages/RunningSprint"
import backlog from './pages/backlog'
import Navbar from'./components/Navbar'
import './App.css';




function App() {
  return (
    <Router>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <Navbar></Navbar>
      <Switch>
      <Route exact path="/home" component={home} />
      <Route exact path="/login" component={login} />
      <Route exact path="/signup" component={signup} />
      <Route exact path="/invite" component={invite} />

      <Route exact path="/createTask" component={createTask} />
      <Route exact path="/ViewRunningSprint" component={runningSprint} />
      <Route exact path="/backlog" component={backlog} />
      <Route  path="*" render={props => (<React.Fragment >
        <h1>Error 404!</h1>
        <h2>Page not found </h2>
      </React.Fragment>
      )} />
      </Switch>
    </Router>
  );
}

export default App;
