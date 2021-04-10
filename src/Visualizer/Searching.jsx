import React from "react";
import { getLinearSearchAnimations } from "../Algorithms/SearchingAlgorithms/LinearSearch.js";
import { getBinarySearchAnimations } from "../Algorithms/SearchingAlgorithms/BinarySearch.js";
import { useState } from "react";
import "../styles/SearchingVisualizer.css";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

function SearchingVisualizer() {
  const initialColor = "#003DA9";
  const comparisonColor = "salmon";
  const foundColor = "turquoise";
  const speed = 500;
  const [length, setLength] = useState(15);
  const array = [];
  for (let i = 0; i < length; i++) {
    const value = randomIntFromInterval(5, 400);
    array.push(value);
    array.sort((a, b) => a - b);
    console.log(array);
  }
  const [initialArray, setInitialArray] = useState(array);

  const [sliderDisabled, setsliderDisabled] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const disableButtons = () => {
    setsliderDisabled(true);
    setButtonDisabled(true);
    document.getElementById("number").disabled = true;
  };

  const enableButtons = () => {
    setsliderDisabled(false);
    setButtonDisabled(false);
    document.getElementById("number").disabled = false;
  };

  const createNewArray = () => {
    const array = [];
    for (let i = 0; i < length; i++) {
      const value = randomIntFromInterval(5, 400);
      array.push(value);
    }
    array.sort((a, b) => a - b);
    setInitialArray(array);
    var arrayBars = document.getElementsByClassName("bars");
    for (var i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = initialColor;
    }
  };

  const linearSearch = () => {
    const number = document.getElementById("number").value;
    if (number === "") {
      alert("Please enter a number to be searched");
    } else {
      disableButtons();
      const arrayBars = document.getElementsByClassName("bars");
      for (var i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = initialColor;
      }
      const animations = getLinearSearchAnimations(
        initialArray,
        parseInt(number)
      );
      for (let i = 0; i < animations.length; i++) {
        const [idx, found] = animations[i];
        if (found) {
          setTimeout(() => {
            for (var x = 0; x < arrayBars.length; x++) {
              if (x !== idx) arrayBars[x].style.backgroundColor = initialColor;
            }
            arrayBars[idx].style.backgroundColor = foundColor;
            enableButtons();
          }, i * speed);
          break;
        } else {
          setTimeout(() => {
            arrayBars[idx].style.backgroundColor = comparisonColor;
            if (i === animations.length - 1) {
              for (var z = 0; z < arrayBars.length; z++) {
                arrayBars[z].style.backgroundColor = initialColor;
              }
              enableButtons();
            }
          }, i * speed);
        }
      }
    }
  };

  const binarySearch = () => {
    const number = document.getElementById("number").value;
    if (number === "") {
      alert("Please enter a number to be searched");
    } else {
      disableButtons();
      const arrayBars = document.getElementsByClassName("bars");
      for (var i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = initialColor;
      }
      const animations = getBinarySearchAnimations(
        initialArray,
        parseInt(number)
      );
      for (let i = 0; i < animations.length; i++) {
        const [idx, found] = animations[i];
        if (found) {
          setTimeout(() => {
            for (var x = 0; x < arrayBars.length; x++) {
              if (x !== idx) arrayBars[x].style.backgroundColor = initialColor;
            }
            arrayBars[idx].style.backgroundColor = foundColor;
            enableButtons();
          }, i * speed);
          break;
        } else {
          setTimeout(() => {
            arrayBars[idx].style.backgroundColor = comparisonColor;
            if (i === animations.length - 1) {
              for (var y = 0; y < arrayBars.length; y++) {
                arrayBars[y].style.backgroundColor = initialColor;
              }
              enableButtons();
            }
          }, i * speed);
        }
      }
    }
  };

  const changeSize = (event, value) => {
    setLength(value);
    createNewArray();
  };

  return (
    <div>
      <div
        className="header"
        style={{
          backgroundColor: "black",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={3}>
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
          <p id="size-text">Size</p>
          <Grid item xs={2}>
            <Slider
              min={10}
              max={25}
              value={length}
              onChange={changeSize}
              id="size"
              aria-labelledby="continuous-slider"
              disabled={sliderDisabled}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              id="LinearSearch"
              onClick={linearSearch}
              disabled={buttonDisabled}
            >
              Linear Search
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              id="BinarySearch"
              onClick={binarySearch}
              disabled={buttonDisabled}
            >
              Binary Search
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className="containers">
        {initialArray.map((value, idx) => (
          <div
            className="bars"
            id={value}
            key={idx}
            style={{
              backgroundColor: initialColor,
              color: "white",
              height: "50px",
              width: "50px",
              display: "inline-block",
              margin: "0 1px",
              textAlign: "center",
            }}
          >
            <p className="value" style={{ marginTop: "15px" }}>
              {value}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          id="number"
          name="number"
          placeholder="Enter the number to be searched"
        />
      </div>
    </div>
  );
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SearchingVisualizer;
