import React, { Component } from "react";
import history from "./history";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import "./styl/main.styl";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    history.listen(location => {
      this.setState({ currentRoute: location.pathname });
    });
  }
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="*" render={() => <Home />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
