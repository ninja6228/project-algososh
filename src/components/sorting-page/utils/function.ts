import { ElementStates } from '../../../types/element-states';

export const randomNumber = (min: number = 0, max: number = 0) => Math.floor(Math.random() * (max - min + 1) + min);

export const bubbleSwap = (arr: number[], directionSort: string, j: number) => {
  if (directionSort === 'up') {
    if (arr[j] > arr[j + 1]) {
      let temp = arr[j]
      arr[j] = arr[j + 1]
      arr[j + 1] = temp
    }
  } else {
    if (arr[j] < arr[j + 1]) {
      let temp = arr[j]
      arr[j] = arr[j + 1]
      arr[j + 1] = temp
    }
  }
} 

export const selectionSwap = (arr: number[], firstIndex: number, secondIndex: number) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const stateBubbleElement = (index: number, nextElement: number | undefined, currentElement: number | undefined, lastElement: number | undefined) => {
  if (lastElement !== undefined) {
    if (index === nextElement || index === currentElement) {
      return ElementStates.Changing
    } else if (index > lastElement || lastElement === 0) {
      return ElementStates.Modified
    }
    return ElementStates.Default
  }
};

export const stateSelectionElement = (index: number, nextElement: number | undefined, currentElement: number | undefined) => {
  if (nextElement !== undefined) {
    if (index === nextElement || index === currentElement) {
      return ElementStates.Changing
    } else if (index < nextElement) {
      return ElementStates.Modified
    }
    return ElementStates.Default
  }
};