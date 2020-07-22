import React from "react";
import "./Visualizer.css";
export default class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialArray: [],
      size: 50,
      sortedArray: false,
    };
  }

  componentDidMount() {
    this.createNewArray();
  }

  createNewArray() {
    const initialArray = [];
    for (let i = 0; i < this.state.size; i++) {
      initialArray.push(randomIntFromInterval(5, 500));
    }
    this.setState({ initialArray });
    var arrayBars = document.getElementsByClassName("bars");
    for (var i = 0; i < arrayBars.length; i++)
      arrayBars[i].style.backgroundColor = "teal";
  }

  Change(value) {
    this.setState({ size: value });
    document.getElementById("selectedSort").innerHTML = "";
    this.createNewArray();
  }

  disableButtons() {
    document.getElementById("generate").disabled = true;
    document.getElementById("quick").disabled = true;
    document.getElementById("merge").disabled = true;
    document.getElementById("heap").disabled = true;
    document.getElementById("bubble").disabled = true;
    document.getElementById("size").disabled = true;
  }

  enableButtons() {
    document.getElementById("generate").disabled = false;
    document.getElementById("quick").disabled = false;
    document.getElementById("merge").disabled = false;
    document.getElementById("heap").disabled = false;
    document.getElementById("bubble").disabled = false;
    document.getElementById("size").disabled = false;
  }

  sorted() {
    var arrayBars = document.getElementsByClassName("bars");
    for (var i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = "turquoise";
    }
  }
  getBubbleSortAnimations(array) {
    const animationsArray = [];
    this.doBubbleSort(array, animationsArray);
    return animationsArray;
  }

  doBubbleSort(array, animationsArray) {
    let end = array.length - 1;
    while (end >= 1) {
      for (let j = 0; j < end; j++) {
        if (array[j] > array[j + 1]) {
          animationsArray.push([j, j + 1]);
          animationsArray.push([j, j + 1]);
          animationsArray.push([j, array[j + 1]]);
          animationsArray.push([j + 1, array[j]]);
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
      end--;
    }
  }

  bubbleSort() {
    if (!this.state.sortedArray) {
      this.disableButtons();
      document.getElementById("selectedSort").innerHTML =
        "Sorting the array using Bubble Sort";
      var arrayBars = document.getElementsByClassName("bars");
      const array = this.state.initialArray;
      const animations = this.getBubbleSortAnimations(array);
      for (let i = 0; i < animations.length; i++) {
        const colorChange = i % 4 <= 1;
        if (colorChange) {
          const [barOne, barTwo] = animations[i];
          const color = i % 4 === 0 ? "salmon" : "teal";
          setTimeout(() => {
            arrayBars[barOne].style.backgroundColor = color;
            arrayBars[barTwo].style.backgroundColor = color;
          }, i * 5);
        } else {
          const [barOne, height] = animations[i];
          setTimeout(() => {
            arrayBars[barOne].style.height = `${height}px`;
            if (i === animations.length - 1) {
              this.sorted();
              this.enableButtons();
            }
          }, i * 5);
        }
      }
    }
    this.state.sortedArray = true;
  }

  render() {
    return (
      <div>
        <div className='header'>
          <button id='generate' onClick={() => this.createNewArray()}>
            Generate New Array
          </button>
          <div id='size-text'>Size:</div>
          <input
            type='range'
            min='10'
            max='100'
            id='size'
            onChange={(e) => this.Change(e.target.value)}
          ></input>
          <button id='merge'>Merge Sort</button>
          <button id='quick'>Quick Sort</button>
          <button id='heap'>Heap Sort</button>
          <button id='bubble' onClick={() => this.bubbleSort()}>
            Bubble Sort
          </button>
        </div>
        <center>
          <div className='container'>
            {this.state.initialArray.map((value, idx) => (
              <div
                className='bars'
                id={value}
                key={idx}
                style={{
                  backgroundColor: "teal",
                  height: `${value}px`,
                  width: "10px",
                  display: "inline-block",
                  margin: "0 1px",
                }}
              ></div>
            ))}
          </div>
          <div id='selectedSize' style={{ fontWeight: "bold" }}>
            Array size: {this.state.size}
          </div>
          <div id='selectedSort' style={{ fontWeight: "bold" }}></div>
        </center>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
