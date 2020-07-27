import React, { Component } from "react";
import { Link } from "react-router-dom";

class MainPage extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to algorithm visualizer</h1>
        <Link to='/sorting-algorithm-visualizer'>
          Visualize Sorting Algorithms
        </Link>
        <br />
        <Link to='/seaching-algorithm-visualizer'>
          Visualize Searching Algorithms
        </Link>
      </div>
    );
  }
}

export default MainPage;
