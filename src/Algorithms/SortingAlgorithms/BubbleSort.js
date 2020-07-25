export function getBubbleSortAnimations(array) {
  const animationsArray = [];
  doBubbleSort(array, animationsArray);
  return animationsArray;
}

function doBubbleSort(array, animationsArray) {
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
