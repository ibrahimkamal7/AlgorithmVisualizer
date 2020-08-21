import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
//import "../styles/bootstrap.min.css";
class MainPage extends Component {
  render() {
    return (
      <div>
        <div className='header-main'>
          <h1>Welcome to the Algorithm Visualizer</h1>
          <span>
            <a
              href='https://github.com/ibrahimkamal7/AlgorithmVisualizer'
              target='_blank'
            >
              <i className='fa fa-github' style={{ fontSize: "36px" }}></i>
            </a>
          </span>
        </div>

        <div className='index'>
          <table>
            <tr>
              <th>Components</th>
              <th>Algorithms Implemented</th>
              <th>How to use</th>
              <th>Links</th>
            </tr>
            <tr>
              <td>Sorting Visualizer</td>
              <td>Bubble Sort, Heap Sort, Merge Sort, Quick Sort</td>
              <td>
                <a
                  href='https://github.com/ibrahimkamal7/AlgorithmVisualizer'
                  target='_blank'
                >
                  Link to the README file
                </a>
              </td>
              <td>
                <Link to='/sorting-algorithm-visualizer'>
                  Visualize Sorting Algorithms
                </Link>
              </td>
            </tr>

            <tr>
              <td>Searching Visualizer</td>
              <td>Linear Search and Binary Search</td>
              <td>
                <a
                  href='https://github.com/ibrahimkamal7/AlgorithmVisualizer'
                  target='_blank'
                >
                  Link to the README file
                </a>
              </td>
              <td>
                <Link to='/seaching-algorithm-visualizer'>
                  Visualize Searching Algorithms
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default MainPage;
