import { AnimationArrayType } from "@/lib/types";

function partition(
  array: number[],
  left: number,
  right: number,
  animations: AnimationArrayType
) {
  let i = left;
  let j = right + 1;
  const condition = true;
  const pivot = array[left];
  while (condition) {
    while (array[++i] <= pivot) {
      if (i === right) break;
      animations.push([[i], false]);
    }
    while (array[--j] >= pivot) {
      if (j === left) break;
      animations.push([[j], false]);
    }
    if (j <= i) break;
    animations.push([[i, array[j]], true]);
    animations.push([[j, array[i]], true]);
    [array[i], array[j]] = [array[j], array[i]];
  }
  animations.push([[left, array[j]], true]);
  animations.push([[j, array[left]], true]);
  [array[left], array[j]] = [array[j], array[left]];
  return j;
}

function runQuickort(
  array: number[],
  left: number,
  right: number,
  animations: AnimationArrayType
) {
  if (left < right) {
    const part = partition(array, left, right, animations);
    runQuickort(array, left, part - 1, animations);
    runQuickort(array, part + 1, right, animations);
  }
}

export function generateQuickSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: AnimationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return array;

  const animations: AnimationArrayType = [];
  const auxiliaryArray = array.slice();
  runQuickort(auxiliaryArray, 0, array.length - 1, animations);
  runAnimation(animations);
}
