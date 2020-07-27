export function getLinearSearchAnimations(array, number) {
  let animations = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] === number) {
      animations.push([i, true]);
      break;
    } else {
      animations.push([i, false]);
    }
  }
  return animations;
}
