import React from "react";
import "../styles/SortingVisualizer.css";
import { getBubbleSortAnimations } from "../Algorithms/SortingAlgorithms/BubbleSort.js";
import { getQuickSortAnimations } from "../Algorithms/SortingAlgorithms/QuickSort.js";
import { getMergeSortAnimations } from "../Algorithms/SortingAlgorithms/MergeSort.js";
import { getHeapSortAnimations } from "../Algorithms/SortingAlgorithms/HeapSort.js";

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialArray: [],
      initialArray1: [],
      initialArray2: [],
      count: 0,
      initialColor: "teal",
      compareColor: "salmon",
      sortedColor: "turquoise",
      speed: 5,
      length: 38,
    };
    this.changeSize = this.changeSize.bind(this);
  }

  componentDidMount() {
    document.getElementById("length").value = 38;
    this.createNewArray();
  }

  createNewArray() {
    const initialArray = [];
    const initialArray1 = [];
    const initialArray2 = [];
    for (let i = 0; i < this.state.length; i++) {
      const value = randomIntFromInterval(5, 400);
      initialArray.push(value);
      initialArray1.push(value);
      initialArray2.push(value);
    }
    this.setState({ initialArray, initialArray1, initialArray2 });
    var arrayBars = document.getElementsByClassName("bars");
    var arrayBars1 = document.getElementsByClassName("bars1");
    var arrayBars2 = document.getElementsByClassName("bars2");
    for (var i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = this.state.initialColor;
      arrayBars1[i].style.backgroundColor = this.state.initialColor;
      arrayBars2[i].style.backgroundColor = this.state.initialColor;
    }
    this.state.count = 0;

    document.getElementById("infoContainer0").innerHTML = "";
    document.getElementById("infoContainer1").innerHTML = "";
    document.getElementById("infoContainer2").innerHTML = "";
  }

  disableButtons() {
    document.getElementById("generate").disabled = true;
    document.getElementById("go").disabled = true;
    document.getElementById("quick").disabled = true;
    document.getElementById("heap").disabled = true;
    document.getElementById("merge").disabled = true;
    document.getElementById("bubble").disabled = true;
    document.getElementById("length").disabled = true;
  }

  enableButtons() {
    document.getElementById("generate").disabled = false;
    document.getElementById("go").disabled = false;
    document.getElementById("length").disabled = false;
    if (document.getElementById("quick").checked)
      document.getElementById("quick").disabled = false;
    if (document.getElementById("heap").checked)
      document.getElementById("heap").disabled = false;
    if (document.getElementById("merge").checked)
      document.getElementById("merge").disabled = false;
    if (document.getElementById("bubble").checked)
      document.getElementById("bubble").disabled = false;
  }

  change() {
    const inputElements = document.getElementsByClassName("checkboxes");
    var checked = [];
    var notChecked = [];
    var disabled = [];
    if (inputElements !== null) {
      for (var i = 0; i < inputElements.length; i++) {
        var inputElement = inputElements[i];
        if (inputElement.checked) checked.push(inputElement);
        else notChecked.push(inputElement);
        if (inputElement.disabled) disabled.push(inputElement);
      }
      if (checked.length === 3) {
        for (var j = 0; j < notChecked.length; j++) {
          notChecked[j].disabled = true;
        }
      }
      if (checked.length <= 3) {
        for (var k = 0; k < disabled.length; k++) {
          disabled[k].disabled = false;
        }
      }
    }
  }

  changeSize(e) {
    this.state.length = e.target.value;
    this.createNewArray();
  }

  areSorted(arrayPosition) {
    const value = arrayPosition === 0 ? "" : arrayPosition;
    var arrayBars = document.getElementsByClassName("bars" + value);
    for (var i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = this.state.sortedColor;
    }
    this.state.count = this.state.count + 1;
    if (this.state.count === 3) {
      this.enableButtons();
    }
  }

  bubbleSort(arrayPosition) {
    this.disableButtons();
    const allArrays = [
      this.state.initialArray,
      this.state.initialArray1,
      this.state.initialArray2,
    ];
    const allArrayBars = ["bars", "bars1", "bars2"];
    var array = allArrays[arrayPosition];
    var arrayBars = document.getElementsByClassName(
      allArrayBars[arrayPosition]
    );
    const animations = getBubbleSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const colorChange = i % 4 <= 1;
      if (colorChange) {
        const [barOne, barTwo] = animations[i];
        const color =
          i % 4 === 0 ? this.state.compareColor : this.state.initialColor;
        setTimeout(() => {
          arrayBars[barOne].style.backgroundColor = color;
          arrayBars[barTwo].style.backgroundColor = color;
        }, i * this.state.speed);
      } else {
        const [barOne, height] = animations[i];
        setTimeout(() => {
          arrayBars[barOne].style.height = `${height}px`;
          if (i === animations.length - 1) {
            this.areSorted(arrayPosition);
          }
        }, i * this.state.speed);
      }
    }
  }

  heapSort(arrayPosition) {
    const allArrays = [
      this.state.initialArray,
      this.state.initialArray1,
      this.state.initialArray2,
    ];
    const allArrayBars = ["bars", "bars1", "bars2"];
    var array = allArrays[arrayPosition];
    var arrayBars = document.getElementsByClassName(
      allArrayBars[arrayPosition]
    );
    const animations = getHeapSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const colorChange = i % 4 <= 1;
      if (colorChange) {
        const [barOne, barTwo] = animations[i];
        const color =
          i % 4 === 0 ? this.state.compareColor : this.state.initialColor;
        setTimeout(() => {
          arrayBars[barOne].style.backgroundColor = color;
          arrayBars[barTwo].style.backgroundColor = color;
        }, i * this.state.speed);
      } else {
        setTimeout(() => {
          const [barOne, height] = animations[i];
          arrayBars[barOne].style.height = `${height}px`;
          if (i === animations.length - 1) {
            this.areSorted(arrayPosition);
          }
        }, i * this.state.speed);
      }
    }
  }

  mergeSort(arrayPosition) {
    this.disableButtons();
    const allArrays = [
      this.state.initialArray,
      this.state.initialArray1,
      this.state.initialArray2,
    ];
    const allArrayBars = ["bars", "bars1", "bars2"];
    var array = allArrays[arrayPosition];
    var arrayBars = document.getElementsByClassName(
      allArrayBars[arrayPosition]
    );
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const colorChange = i % 3 !== 2;
      if (colorChange) {
        const [barOne, barTwo] = animations[i];
        const color =
          i % 3 === 0 ? this.state.compareColor : this.state.initialColor;
        setTimeout(() => {
          arrayBars[barOne].style.backgroundColor = color;
          arrayBars[barTwo].style.backgroundColor = color;
        }, i * this.state.speed);
      } else {
        setTimeout(() => {
          const [barOne, height] = animations[i];
          arrayBars[barOne].style.height = `${height}px`;
          if (i === animations.length - 1) {
            this.areSorted(arrayPosition);
          }
        }, i * this.state.speed);
      }
    }
  }

  quickSort(arrayPosition) {
    const allArrays = [
      this.state.initialArray,
      this.state.initialArray1,
      this.state.initialArray2,
    ];
    const allArrayBars = ["bars", "bars1", "bars2"];
    var array = allArrays[arrayPosition];
    var arrayBars = document.getElementsByClassName(
      allArrayBars[arrayPosition]
    );
    const animations = getQuickSortAnimations(array);

    for (let i = 0; i < animations.length; i++) {
      const colorChange = i % 4 <= 1;
      if (colorChange) {
        const [barOne, barTwo] = animations[i];
        const color =
          i % 4 === 0 ? this.state.compareColor : this.state.initialColor;
        setTimeout(() => {
          arrayBars[barOne].style.backgroundColor = color;
          arrayBars[barTwo].style.backgroundColor = color;
        }, i * this.state.speed);
      } else {
        setTimeout(() => {
          const [barOne, height] = animations[i];
          arrayBars[barOne].style.height = `${height}px`;
          if (i === animations.length - 1) {
            this.areSorted(arrayPosition);
          }
        }, i * this.state.speed);
      }
    }
  }

  isSorted(array1, array2) {
    if (array1.length !== array2.length) {
      return false;
    }
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
    return true;
  }

  go() {
    const inputElements = document.getElementsByClassName("checkboxes");
    const array1 = this.state.initialArray;
    const array2 = this.state.initialArray1;
    const array3 = this.state.initialArray2;
    const sortedArray1 = array1.slice().sort((a, b) => a - b);
    const sortedArray2 = array2.slice().sort((a, b) => a - b);
    const sortedArray3 = array3.slice().sort((a, b) => a - b);
    var checked = [];
    if (inputElements !== null) {
      for (var i = 0; i < inputElements.length; i++) {
        var inputElement = inputElements[i];
        if (inputElement.checked) {
          checked.push(inputElement.id);
        }
      }
    }
    if (checked.length < 3) {
      alert("Please select 3 sorting algorithms");
    } else {
      if (
        this.isSorted(this.state.initialArray, sortedArray1) ||
        this.isSorted(this.state.initialArray1, sortedArray2) ||
        this.isSorted(this.state.initialArray2, sortedArray3)
      ) {
        alert("Arrays are sorted. Generate a new and try again.");
      } else {
        if (checked.indexOf("bubble") >= 0) {
          this.bubbleSort(checked.indexOf("bubble"));
          document.getElementById(
            "infoContainer" + checked.indexOf("bubble")
          ).innerHTML = "Sorting using Bubble Sort";
        }

        if (checked.indexOf("merge") >= 0) {
          this.mergeSort(checked.indexOf("merge"));
          document.getElementById(
            "infoContainer" + checked.indexOf("merge")
          ).innerHTML = "Sorting using Merge Sort";
        }

        if (checked.indexOf("quick") >= 0) {
          this.quickSort(checked.indexOf("quick"));
          document.getElementById(
            "infoContainer" + checked.indexOf("quick")
          ).innerHTML = "Sorting using Quick Sort";
        }

        if (checked.indexOf("heap") >= 0) {
          this.heapSort(checked.indexOf("heap"));
          document.getElementById(
            "infoContainer" + checked.indexOf("heap")
          ).innerHTML = "Sorting using Heap Sort";
        }
      }
    }
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
            max='38'
            id='length'
            onChange={this.changeSize}
          ></input>
          <input
            className='checkboxes'
            id='merge'
            type='checkbox'
            onChange={this.change}
          ></input>
          <label htmlFor='merge' className='label'>
            Merge Sort
          </label>
          <input
            className='checkboxes'
            id='quick'
            type='checkbox'
            onChange={this.change}
          ></input>
          <label htmlFor='quick' className='label'>
            Quick Sort
          </label>
          <input
            className='checkboxes'
            id='heap'
            type='checkbox'
            onChange={this.change}
          ></input>
          <label htmlFor='heap' className='label'>
            Heap Sort
          </label>
          <input
            className='checkboxes'
            id='bubble'
            type='checkbox'
            onChange={this.change}
          ></input>
          <label htmlFor='bubble' className='label'>
            Bubble Sort
          </label>
          <button id='go' onClick={() => this.go()}>
            Visualize Algorithms
          </button>
        </div>
        <div className='info'>
          <p id='infoContainer0'></p>
          <p id='infoContainer1'></p>
          <p id='infoContainer2'></p>
        </div>
        <div id='bigcontainer'>
          <div className='container'>
            {this.state.initialArray.map((value, idx) => (
              <div
                className='bars'
                id={value}
                key={idx}
                style={{
                  backgroundColor: this.state.initialColor,
                  height: `${value}px`,
                  width: "10px",
                  display: "inline-block",
                  margin: "0 1px",
                }}
              ></div>
            ))}
          </div>

          <div className='container1'>
            {this.state.initialArray1.map((value, idx) => (
              <div
                className='bars1'
                id={value}
                key={idx}
                style={{
                  backgroundColor: this.state.initialColor,
                  height: `${value}px`,
                  width: "10px",
                  display: "inline-block",
                  margin: "0 1px",
                }}
              ></div>
            ))}
          </div>

          <div className='container2'>
            {this.state.initialArray2.map((value, idx) => (
              <div
                className='bars2'
                id={value}
                key={idx}
                style={{
                  backgroundColor: this.state.initialColor,
                  height: `${value}px`,
                  width: "10px",
                  display: "inline-block",
                  margin: "0 1px",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
