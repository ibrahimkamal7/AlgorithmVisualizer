export function getHeapSortAnimations(array) {
  const animations = [];
  doHeapSort(array, animations);
  return animations;
}

function doHeapSort(array, animations) {
  var length = array.length;
  for (var i = Math.floor(length / 2); i >= 0; i--) {
    heap(array, i, length, animations);
  }

  for (i = length - 1; i > 0; i--) {
    swap(array, 0, i, animations);
    length--;
    heap(array, 0, length, animations);
  }
}

function heap(array, index, length, animations) {
  var left = 2 * index + 1;
  var right = 2 * index + 2;
  var max = index;
  if (left < length && array[left] > array[max]) {
    animations.push([left, max]);
    animations.push([left, max]);
    animations.push([0, array[0]]);
    animations.push([0, array[0]]);
    max = left;
  }
  if (right < length && array[right] > array[max]) {
    animations.push([right, max]);
    animations.push([right, max]);
    animations.push([0, array[0]]);
    animations.push([0, array[0]]);
    max = right;
  }
  if (max !== index) {
    swap(array, index, max, animations);
    heap(array, max, length, animations);
  }
}

function swap(array, first, last, animations) {
  animations.push([first, last]);
  animations.push([first, last]);
  animations.push([first, array[last]]);
  animations.push([last, array[first]]);
  var temp = array[first];
  array[first] = array[last];
  array[last] = temp;
}
