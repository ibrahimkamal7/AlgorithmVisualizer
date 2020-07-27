import React from "react";
import { getLinearSearchAnimations } from "../Algorithms/SearchingAlgorithms/LinearSearch.js";
import "../styles/SearchingVisualizer.css";
export default class SearchingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialArray: [],
      length: 15,
    };
    this.change = this.change.bind(this);
  }

  componentDidMount() {
    document.getElementById("size").value = "15";
    this.createNewArray();
  }

  disableButtons() {
    document.getElementById("generate").disabled = true;
    document.getElementById("LinearSearch").disabled = true;
    document.getElementById("BinarySearch").disabled = true;
    document.getElementById("number").disabled = true;
    document.getElementById("size").disabled = true;
  }

  enableButtons() {
    document.getElementById("generate").disabled = false;
    document.getElementById("LinearSearch").disabled = false;
    document.getElementById("BinarySearch").disabled = false;
    document.getElementById("number").disabled = false;
    document.getElementById("size").disabled = false;
  }

  createNewArray() {
    const initialArray = [];
    for (let i = 0; i < this.state.length; i++) {
      const value = randomIntFromInterval(5, 400);
      initialArray.push(value);
    }
    this.setState({ initialArray });
    var arrayBars = document.getElementsByClassName("bars");
    for (var i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = "black";
    }
    document.getElementById("info").innerHTML = "";
  }

  linearSearch() {
    const number = document.getElementById("number").value;
    if (number === "") {
      alert("Please enter a number to be searched");
    } else {
      this.disableButtons();
      document.getElementById("info").innerHTML = "";
      const arrayBars = document.getElementsByClassName("bars");
      for (var i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = "black";
      }
      const animations = getLinearSearchAnimations(
        this.state.initialArray,
        parseInt(number)
      );
      for (let i = 0; i < animations.length; i++) {
        const [idx, found] = animations[i];
        if (found) {
          setTimeout(() => {
            arrayBars[idx].style.backgroundColor = "green";
            document.getElementById("info").innerHTML =
              "Entered number found at index " + i;
            this.enableButtons();
          }, i * 1000);
          break;
        } else {
          setTimeout(() => {
            if (i === animations.length - 1) {
              document.getElementById("info").innerHTML =
                "Entered number not found in the array";
              this.enableButtons();
            }
            arrayBars[idx].style.backgroundColor = "blue";
          }, i * 1000);
        }
      }
    }
  }
  change(e) {
    this.state.length = e.target.value;
    this.createNewArray();
  }
  render() {
    return (
      <div>
        <div className='header'>
          <button id='generate' onClick={() => this.createNewArray()}>
            Generate New Array
          </button>
          <label htmlFor='size'>Size: </label>
          <input
            type='range'
            min='10'
            max='25'
            id='size'
            onChange={this.change}
          ></input>
          <button id='LinearSearch' onClick={() => this.linearSearch()}>
            Linear Search
          </button>
          <button id='BinarySearch'>Binary Search</button>
        </div>
        <div className='containers'>
          {this.state.initialArray.map((value, idx) => (
            <div
              className='bars'
              id={value}
              key={idx}
              style={{
                backgroundColor: "black",
                color: "white",
                height: "50px",
                width: "50px",
                display: "inline-block",
                margin: "0 1px",
                textAlign: "center",
              }}
            >
              <p style={{ marginTop: "15px" }}>{value}</p>
            </div>
          ))}
        </div>
        <input
          type='text'
          id='number'
          name='number'
          placeholder='Enter the number to be searched'
        />
        <p id='info'></p>
      </div>
    );
  }
}
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
