import React from 'react';
import { ElementStates } from '../../../types/element-states';
import { timer } from '../../../utils/function/timer';

export const randomNumber = (min: number = 0, max: number = 0) => Math.floor(Math.random() * (max - min + 1) + min);


export const bubbleSortFuntion = async (
  arr: number[],
  directionSort: string,
  waitingTime: number,
  setLastElement?: React.Dispatch<React.SetStateAction<number | undefined>>,
  setNextElement?: React.Dispatch<React.SetStateAction<number | undefined>>,
  setCurrentElement?: React.Dispatch<React.SetStateAction<number | undefined>>,
  setArrNumbers?: React.Dispatch<React.SetStateAction<number[]>>) => {

  for (let i = 0; i < arr.length; i++) {
    if (setLastElement) {
      setLastElement(arr.length - i - 1)
    }
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (setCurrentElement) {
        setCurrentElement(j)
      }
      if (setNextElement) {
        setNextElement(j + 1)
      }
      await timer(waitingTime)
      bubbleSwap(arr, directionSort, j)
      if (setArrNumbers) {
        setArrNumbers([...arr])
      }
    }
  }
  return arr;
};

const bubbleSwap = (arr: number[], directionSort: string, j: number) => {
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


export const selectionSortFuntion = async (
  arr: number[],
  directionSort: string,
  waitingTime: number,
  setNextElement?: React.Dispatch<React.SetStateAction<number | undefined>>,
  setCurrentElement?: React.Dispatch<React.SetStateAction<number | undefined>>,
  setArrNumbers?: React.Dispatch<React.SetStateAction<number[]>>,
) => {
  for (let i = 0; i < arr.length; i++) {
    if (setNextElement) {
      setNextElement(i)
    }
    let maxInd = i;
    for (let j = i + 1; j < arr.length + 1; j++) {
      await timer(waitingTime)
      if (setCurrentElement) {
        setCurrentElement(j)
      }
      if (directionSort === 'up') {
        if (arr[j] < arr[maxInd]) {
          maxInd = j
        }
      } else {
        if (arr[j] > arr[maxInd]) {
          maxInd = j
        }
      }
    }
    selectionSwap(arr, i, maxInd)
    if (setArrNumbers) {
      setArrNumbers([...arr])
    }
    if (setNextElement) {
      setNextElement(i + 1)
    }
  }
  return arr;
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