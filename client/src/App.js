import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import login from "./pages/login";
import runningSprint from "./pages/RunningSprint"
import backlog from './pages/backlog'





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
      <Switch>
      <Route exact path="/login" component={login} />
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
