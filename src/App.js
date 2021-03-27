import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SortingAlgorithmVisualizer from "./Endpoints/SortingAlgoritmVisualizer";
import SearchingAlgorithmVisualizer from "./Endpoints/SearchingAlgorithmVisualizer";
import MainPage from "./Endpoints/index.jsx";
import Error from "./Endpoints/error.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route
          exact
          path="/sorting-algorithm-visualizer"
          component={SortingAlgorithmVisualizer}
        />
        <Route
          exact
          path="/seaching-algorithm-visualizer"
          component={SearchingAlgorithmVisualizer}
        />
        <Route exact path="/404" component={Error} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}
export default App;
