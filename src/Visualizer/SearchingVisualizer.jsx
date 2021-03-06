import React from "react";
import { getLinearSearchAnimations } from "../Algorithms/SearchingAlgorithms/LinearSearch.js";
import { getBinarySearchAnimations } from "../Algorithms/SearchingAlgorithms/BinarySearch.js";
import "../styles/SearchingVisualizer.css";
export default class SearchingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialArray: [],
      length: 15,
      initialColor: "teal",
      comparisonColor: "salmon",
      foundColor: "turquoise",
      speed: 500,
    };
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
      arrayBars[i].style.backgroundColor = this.state.initialColor;
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
        arrayBars[i].style.backgroundColor = this.state.initialColor;
      }
      const animations = getLinearSearchAnimations(
        this.state.initialArray,
        parseInt(number)
      );
      for (let i = 0; i < animations.length; i++) {
        const [idx, found] = animations[i];
        if (found) {
          setTimeout(() => {
            for (var x = 0; x < arrayBars.length; x++) {
              if (x !== idx)
                arrayBars[x].style.backgroundColor = this.state.initialColor;
            }
            arrayBars[idx].style.backgroundColor = this.state.foundColor;
            document.getElementById("info").innerHTML =
              "Entered number found at index " + i;
            this.enableButtons();
          }, i * this.state.speed);
          break;
        } else {
          setTimeout(() => {
            arrayBars[idx].style.backgroundColor = this.state.comparisonColor;
            if (i === animations.length - 1) {
              for (var z = 0; z < arrayBars.length; z++) {
                arrayBars[z].style.backgroundColor = this.state.initialColor;
              }
              document.getElementById("info").innerHTML =
                "Entered number not found in the array";
              this.enableButtons();
            }
          }, i * this.state.speed);
        }
      }
    }
  }

  binarySearch() {
    const number = document.getElementById("number").value;
    if (number === "") {
      alert("Please enter a number to be searched");
    } else {
      this.sort();
      this.disableButtons();
      document.getElementById("info").innerHTML = "";
      const arrayBars = document.getElementsByClassName("bars");
      for (var i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = this.state.initialColor;
      }
      const animations = getBinarySearchAnimations(
        this.state.initialArray,
        parseInt(number)
      );
      for (let i = 0; i < animations.length; i++) {
        const [idx, found] = animations[i];
        if (found) {
          setTimeout(() => {
            for (var x = 0; x < arrayBars.length; x++) {
              if (x !== idx)
                arrayBars[x].style.backgroundColor = this.state.initialColor;
            }
            arrayBars[idx].style.backgroundColor = this.state.foundColor;
            document.getElementById("info").innerHTML =
              "Entered number found at index " + idx;
            this.enableButtons();
          }, i * this.state.speed);
          break;
        } else {
          setTimeout(() => {
            arrayBars[idx].style.backgroundColor = this.state.comparisonColor;
            if (i === animations.length - 1) {
              for (var y = 0; y < arrayBars.length; y++) {
                arrayBars[y].style.backgroundColor = this.state.initialColor;
              }
              document.getElementById("info").innerHTML =
                "Entered number not found in the array";
              this.enableButtons();
            }
          }, i * this.state.speed);
        }
      }
    }
  }

  sort() {
    const arrayBarsValue = document.getElementsByClassName("value");
    for (var i = 0; i < this.state.initialArray.length; i++) {
      for (var j = 0; j < this.state.initialArray.length - i - 1; j++) {
        if (this.state.initialArray[j] > this.state.initialArray[j + 1]) {
          var temp = this.state.initialArray[j];
          this.state.initialArray[j] = this.state.initialArray[j + 1];
          this.state.initialArray[j + 1] = temp;
        }
      }
    }

    for (var k = 0; k < this.state.initialArray.length; k++) {
      arrayBarsValue[k].innerHTML = this.state.initialArray[k];
    }
  }

  change = (e) => {
    this.state.length = e.target.value;
    this.createNewArray();
  };

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
          <button id='BinarySearch' onClick={() => this.binarySearch()}>
            Binary Search
          </button>
        </div>
        <div className='containers'>
          {this.state.initialArray.map((value, idx) => (
            <div
              className='bars'
              id={value}
              key={idx}
              style={{
                backgroundColor: "teal",
                color: "white",
                height: "50px",
                width: "50px",
                display: "inline-block",
                margin: "0 1px",
                textAlign: "center",
              }}
            >
              <p className='value' style={{ marginTop: "15px" }}>
                {value}
              </p>
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
