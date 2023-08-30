import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from '../ui/button/button';
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { DELAY_IN_MS } from '../../constants/delays';
import { bubbleSortFuntion, selectionSortFuntion, randomNumber, stateBubbleElement, stateSelectionElement } from './utils/function'
import style from './sorting.module.css';

export const SortingPage: React.FC = () => {
  const [arrNumbers, setArrNumbers] = useState<number[]>([]);
  const [radioValue, setRadioValue] = useState<string>('selection');
  const [currentElement, setCurrentElement] = useState<number | undefined>();
  const [nextElement, setNextElement] = useState<number | undefined>();
  const [lastElement, setLastElement] = useState<number | undefined>();
  const [deactiveButton, setDeactiveButton] = useState<boolean>(false);
  const [loading, setLoading] = useState<string>('');

  useEffect(() => {
    randomArr()
  }, []);

  const randomArr = () => {
    setCurrentElement(undefined)
    setNextElement(undefined)
    setLastElement(undefined)
    let arr: number[] = [];
    const arrLength = randomNumber(3, 17)
    for (let i = 0; i < arrLength; i++) {
      const elementHeight = randomNumber(100)
      arr.push(elementHeight)
    }
    setArrNumbers([...arr])
  };

  const bubbleSort = async (arr: number[], directionSort: string) => {
    setDeactiveButton(true)
    await bubbleSortFuntion(arr, directionSort, DELAY_IN_MS, setLastElement, setNextElement, setCurrentElement, setArrNumbers)
    setCurrentElement(undefined)
    setNextElement(undefined)
    setDeactiveButton(false)
    setLoading('')
  }

  const selectionSort = async (arr: number[], directionSort: string) => {
    setDeactiveButton(true)
    await selectionSortFuntion(arr, directionSort, DELAY_IN_MS, setNextElement, setCurrentElement, setArrNumbers)
    setDeactiveButton(false)
    setLoading('')
  };

  const sortingMethod = (arr: number[], directionSort: string) => {
    setLoading(directionSort);
    radioValue === 'selection' ? selectionSort(arr, directionSort) : bubbleSort(arr, directionSort)
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={style.sectionFrom} >
        <div className={style.blockRadioInput}>
          <RadioInput
            label={'Выбор'}
            name={'sort'}
            defaultChecked={true}
            value={radioValue}
            onClick={() => setRadioValue('selection')}
            disabled={deactiveButton}
          />
          <RadioInput
            label={'Пузырёк'}
            name={'sort'}
            value={radioValue}
            onClick={() => setRadioValue('bubble')}
            disabled={deactiveButton}
          />
        </div>
        <div className={style.blockButton}>
          <Button
            extraClass={style.buttonSort}
            type={'button'}
            sorting={Direction.Ascending}
            text={'По возрастанию'}
            onClick={() => sortingMethod(arrNumbers, 'up')}
            disabled={deactiveButton}
            isLoader={loading === 'up' ? true : false}
          />
          <Button
            extraClass={style.buttonSort}
            type={'button'}
            sorting={Direction.Descending}
            text={'По убыванию'}
            onClick={() => sortingMethod(arrNumbers, 'down')}
            disabled={deactiveButton}
            isLoader={loading === 'down' ? true : false}
          />
        </div>
        <Button
          extraClass={style.buttonReset}
          text={'Новый массив'}
          onClick={randomArr}
          disabled={deactiveButton}
        />
      </section>

      <section className={style.resultSection}>
        {arrNumbers.map((item: number, index: number) =>
          <Column
            index={item}
            key={index}
            state={radioValue === 'bubble' ? stateBubbleElement(index, nextElement, currentElement, lastElement) : stateSelectionElement(index, nextElement, currentElement)}
          />
        )}
      </section>
    </SolutionLayout>
  );
};
