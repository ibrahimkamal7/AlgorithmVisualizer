import React from "react";
import "../styles/SortingVisualizer.css";
import { getBubbleSortAnimations } from "../Algorithms/SortingAlgorithms/BubbleSort.js";
import { getQuickSortAnimations } from "../Algorithms/SortingAlgorithms/QuickSort.js";
import { getMergeSortAnimations } from "../Algorithms/SortingAlgorithms/MergeSort.js";
import { getHeapSortAnimations } from "../Algorithms/SortingAlgorithms/HeapSort.js";
import { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";

const initialColor = "#003DA9";
const compareColor = "salmon";
const sortedColor = "turquoise";
const speed = 5;

function SortingVisualizer(props) {
  const [length, setLength] = useState(38);
  let array = [];
  for (let i = 0; i < length; i++) {
    const value = randomIntFromInterval(5, 400);
    array.push(value);
  }
  const [initialArray, setInitialArray] = useState(array);

  const [sliderDisabled, setsliderDisabled] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [mergeChecked, setmergeChecked] = useState(false);
  const [quickChecked, setquickChecked] = useState(false);
  const [heapChecked, setheapChecked] = useState(false);
  const [bubbleChecked, setbubbleChecked] = useState(false);

  const [mergeDisabled, setmergeDisabled] = useState(false);
  const [quickDisabled, setquickDisabled] = useState(false);
  const [heapDisabled, setheapDisabled] = useState(false);
  const [bubbleDisabled, setbubbleDisabled] = useState(false);
  const [color, setColor] = useState(initialColor);

  const [isSorted, setIsSorted] = useState(false);
  const createNewArray = () => {
    let array = [];
    for (let i = 0; i < length; i++) {
      const value = randomIntFromInterval(5, 400);
      array.push(value);
    }
    setInitialArray(array);
    setColor(initialColor);
    const arrayBars = document.getElementsByClassName("bars");
    for (var i = 0; i < arrayBars.length; i++)
      arrayBars[i].style.backgroundColor = initialColor;
    setIsSorted(false);
  };

  const disableButtons = () => {
    setButtonDisabled(true);
    setsliderDisabled(true);
    setmergeDisabled(true);
    setquickDisabled(true);
    setheapDisabled(true);
    setbubbleDisabled(true);
  };

  const enableButtons = () => {
    setButtonDisabled(false);
    setsliderDisabled(false);
    setmergeChecked(false);
    setbubbleChecked(false);
    setquickChecked(false);
    setheapChecked(false);
    setmergeDisabled(false);
    setquickDisabled(false);
    setheapDisabled(false);
    setbubbleDisabled(false);
  };

  const change = (event) => {
    if (event.target.id === "merge") {
      let checkedM = false;
      if (mergeChecked) {
        checkedM = false;
      } else {
        checkedM = true;
      }
      setmergeChecked(checkedM);
      setquickDisabled(checkedM);
      setheapDisabled(checkedM);
      setbubbleDisabled(checkedM);
    } else if (event.target.id === "bubble") {
      let checkedB = false;
      if (bubbleChecked) {
        checkedB = false;
      } else {
        checkedB = true;
      }
      setbubbleChecked(checkedB);
      setmergeDisabled(checkedB);
      setquickDisabled(checkedB);
      setheapDisabled(checkedB);
    } else if (event.target.id === "heap") {
      let checkedH = false;
      if (heapChecked) {
        checkedH = false;
      } else {
        checkedH = true;
      }
      setheapChecked(checkedH);
      setmergeDisabled(checkedH);
      setquickDisabled(checkedH);
      setbubbleDisabled(checkedH);
    } else {
      let checkedM = false;
      if (quickChecked) {
        checkedM = false;
      } else {
        checkedM = true;
      }
      setquickChecked(checkedM);
      setmergeDisabled(checkedM);
      setheapDisabled(checkedM);
      setbubbleDisabled(checkedM);
    }
  };

  const changeSize = (event, value) => {
    setLength(value);
    createNewArray();
  };

  const areSorted = () => {
    var arrayBars = document.getElementsByClassName("bars");
    for (var i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = sortedColor;
    }
    enableButtons();
    setIsSorted(true);
  };

  const bubbleSort = () => {
    disableButtons();
    const array = initialArray.slice();
    const arrayBars = document.getElementsByClassName("bars");
    const animations = getBubbleSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const colorChange = i % 4 <= 1;
      if (colorChange) {
        const [barOne, barTwo] = animations[i];
        const color = i % 4 === 0 ? compareColor : initialColor;
        setTimeout(() => {
          arrayBars[barOne].style.backgroundColor = color;
          arrayBars[barTwo].style.backgroundColor = color;
        }, i * speed);
      } else {
        const [barOne, height] = animations[i];
        setTimeout(() => {
          arrayBars[barOne].style.height = `${height}px`;
          if (i === animations.length - 1) {
            areSorted();
          }
        }, i * speed);
      }
    }
  };

  const heapSort = () => {
    disableButtons();
    const array = initialArray.slice();
    const arrayBars = document.getElementsByClassName("bars");
    const animations = getHeapSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const colorChange = i % 4 <= 1;
      if (colorChange) {
        const [barOne, barTwo] = animations[i];
        const color = i % 4 === 0 ? compareColor : initialColor;
        setTimeout(() => {
          arrayBars[barOne].style.backgroundColor = color;
          arrayBars[barTwo].style.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOne, height] = animations[i];
          arrayBars[barOne].style.height = `${height}px`;
          if (i === animations.length - 1) {
            areSorted();
          }
        }, i * speed);
      }
    }
  };

  const mergeSort = () => {
    disableButtons();
    const array = initialArray.slice();
    const arrayBars = document.getElementsByClassName("bars");
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const colorChange = i % 3 !== 2;
      if (colorChange) {
        const [barOne, barTwo] = animations[i];
        const color = i % 3 === 0 ? compareColor : initialColor;
        setTimeout(() => {
          arrayBars[barOne].style.backgroundColor = color;
          arrayBars[barTwo].style.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOne, height] = animations[i];
          arrayBars[barOne].style.height = `${height}px`;
          if (i === animations.length - 1) {
            areSorted();
          }
        }, i * speed);
      }
    }
  };

  const quickSort = () => {
    disableButtons();
    const array = initialArray.slice();
    var arrayBars = document.getElementsByClassName("bars");
    const animations = getQuickSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const colorChange = i % 4 <= 1;
      if (colorChange) {
        const [barOne, barTwo] = animations[i];
        const color = i % 4 === 0 ? compareColor : initialColor;
        setTimeout(() => {
          arrayBars[barOne].style.backgroundColor = color;
          arrayBars[barTwo].style.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [barOne, height] = animations[i];
          arrayBars[barOne].style.height = `${height}px`;
          if (i === animations.length - 1) {
            areSorted();
          }
        }, i * speed);
      }
    }
  };

  const go = () => {
    var checked = "";
    if (mergeChecked) checked = "merge";
    else if (quickChecked) checked = "quick";
    else if (heapChecked) checked = "heap";
    else if (bubbleChecked) checked = "bubble";

    if (checked === "") {
      alert("Please select atleast sorting algorithms");
    } else {
      if (isSorted) {
        alert("Array is sorted. Generate a new and try again.");
      } else {
        if (checked === "bubble") {
          bubbleSort();
        } else if (checked === "merge") {
          mergeSort();
        } else if (checked === "quick") {
          quickSort();
        } else {
          heapSort();
        }
      }
    }
  };

  return (
    <div>
      <div
        className="header"
        style={{
          backgroundColor: "black",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              id="generate"
              onClick={createNewArray}
              disabled={buttonDisabled}
            >
              Generate New Array
            </Button>
          </Grid>
          <p id="continuous-slider">Size</p>
          <Grid item xs={2}>
            <Slider
              min={10}
              max={95}
              value={length}
              onChange={changeSize}
              id="length"
              aria-labelledby="continuous-slider"
              disabled={sliderDisabled}
            />
          </Grid>
          <div
            style={{
              marginTop: "15px",
            }}
          >
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={change}
                    color="secondary"
                    id="merge"
                    disabled={mergeDisabled}
                    checked={mergeChecked}
                  />
                }
                label="Merge Sort"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    onChange={change}
                    color="secondary"
                    id="quick"
                    disabled={quickDisabled}
                    checked={quickChecked}
                  />
                }
                label="Quick Sort"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={change}
                    color="secondary"
                    id="heap"
                    disabled={heapDisabled}
                    checked={heapChecked}
                  />
                }
                label="Heap Sort"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={change}
                    color="secondary"
                    id="bubble"
                    disabled={bubbleDisabled}
                    checked={bubbleChecked}
                  />
                }
                label="Bubble Sort"
              />
            </FormGroup>
          </div>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              id="go"
              onClick={go}
              disabled={buttonDisabled}
            >
              Visualize Algorithms
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className="container">
        {initialArray.map((value, idx) => (
          <div
            className="bars"
            id={value}
            key={idx}
            style={{
              backgroundColor: color,
              height: `${value}px`,
              width: "5px",
              display: "inline-block",
              border: "0.1px solid white",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
