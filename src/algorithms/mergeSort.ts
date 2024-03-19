import { AnimationArrayType } from "@/lib/types";

function mergeSortRecursive(
  array: number[],
  left: number,
  right: number,
  animations: AnimationArrayType
) {
  if (right - left <= 1) return; // Base case: the array is already sorted if it has one or no elements.

  const middle = Math.floor((left + right) / 2);
  mergeSortRecursive(array, left, middle, animations); // Recursively sort the first half
  mergeSortRecursive(array, middle, right, animations); // Recursively sort the second half
  merge(array, left, middle, right, animations); // Merge the sorted halves
}

function merge(
  array: number[],
  left: number,
  middle: number,
  right: number,
  animations: AnimationArrayType
) {
  // The merge logic remains unchanged.
  const leftArray = array.slice(left, middle);
  const rightArray = array.slice(middle, right);

  let i = 0;
  let j = 0;
  let k = left;
  while (i < leftArray.length && j < rightArray.length) {
    animations.push([[left + i, middle + j], false]);
    if (leftArray[i] <= rightArray[j]) {
      animations.push([[k, leftArray[i]], true]);
      array[k++] = leftArray[i++];
    } else {
      animations.push([[k, rightArray[j]], true]);
      array[k++] = rightArray[j++];
    }
  }
  while (i < leftArray.length) {
    animations.push([[left + i], false]);
    animations.push([[k, leftArray[i]], true]);
    array[k++] = leftArray[i++];
  }
  while (j < rightArray.length) {
    animations.push([[middle + j], false]);
    animations.push([[k, rightArray[j]], true]);
    array[k++] = rightArray[j++];
  }
}

export function generateMergeSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting || array.length <= 1) return [];

  const animations: AnimationArrayType = [];
  const copy = array.slice();
  mergeSortRecursive(copy, 0, copy.length, animations);
  runAnimation(animations);
}
