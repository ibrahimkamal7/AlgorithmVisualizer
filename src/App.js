import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SortingAlgorithmVisualizer from "./Endpoints/SortingAlgoritmVisualizer";
import SearchingAlgorithmVisualizer from "./Endpoints/SearchingAlgorithmVisualizer";
import MainPage from "./Endpoints/index.jsx";
import Error from "./Endpoints/error.jsx";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/AlgorithmVisualizer/' component={MainPage} />
          <Route
            exact
            path='/sorting-algorithm-visualizer'
            component={SortingAlgorithmVisualizer}
          />
          <Route
            exact
            path='/seaching-algorithm-visualizer'
            component={SearchingAlgorithmVisualizer}
          />
          <Route exact path='/404' component={Error} />
          {/* <Redirect to='/404' /> */}
        </Switch>
      </Router>
    );
  }
}
export default App;
