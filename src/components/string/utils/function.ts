import React from 'react';
import { timer } from '../../../utils/function/timer'

export const reverseString = async (
  str: string,
  waitingTime: number,
  setString?: React.Dispatch<React.SetStateAction<string[]>>,
  setIndexLetter?: React.Dispatch<React.SetStateAction<number[]>>) => {

  const arrString = str.split('');
  let startString = 0
  let endString = arrString.length - 1
  await timer(waitingTime)

  if (setString) {
    setString([...arrString])
  }

  while (startString <= endString) {
    if (setIndexLetter) {
      setIndexLetter([startString, endString])
    }
    await timer(waitingTime);
    [arrString[startString], arrString[endString]] = [arrString[endString], arrString[startString]]
    startString++;
    endString--;
    if (setIndexLetter) {
      setIndexLetter([startString, endString])
    }
    if (setString) {
      setString([...arrString])
    }
  }

  return arrString.join('')
}