export function getBinarySearchAnimations(array, number) {
  let animations1 = [];
  let min = 0;
  let max = array.length - 1;

  while (min <= max) {
    let mid = parseInt(min + (max - min) / 2);
    if (array[mid] === number) {
      animations1.push([mid, true]);
      break;
    } else if (array[mid] < number) {
      min = mid + 1;
      animations1.push([mid, false]);
    } else {
      max = mid - 1;
      animations1.push([mid, false]);
    }
  }
  return animations1;
}
