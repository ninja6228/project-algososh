import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../utils/hook/useForm";
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { timer } from "../../utils/function/timer";
import style from './fibonacci.module.css';
import { getFibonacciNumbers } from './utils/function';
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: '' })
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [number, setNumber] = useState<number[]>([]);

  const MIN_NUMBER_FiBONACCI = 1;
  const MAX_NUMBER_FiBONACCI = 19;

  const fibonacci = async (num: number) => {
    setIsLoader(true);
    const arrFibonacci: number[] = getFibonacciNumbers(num)
    const newArr: number[] = []
    for (let i = 0; i < arrFibonacci.length; i++) {
      await timer(SHORT_DELAY_IN_MS)
      newArr.push(arrFibonacci[i])
      setNumber([...newArr])
    }
    setIsLoader(false)
  }

  const handClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fibonacci(+values.value);
    setValues({ value: '' });
  }

  const stateButton = () => values.value < MIN_NUMBER_FiBONACCI || values.value > MAX_NUMBER_FiBONACCI ? true : false

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.sectionForm} onSubmit={handClick}>
        <Input
          extraClass={style.input}
          min={MIN_NUMBER_FiBONACCI}
          max={MAX_NUMBER_FiBONACCI}
          type={'number'}
          isLimitText={true}
          placeholder={'Введите число'}
          value={values.value}
          name="value"
          onChange={handleChange} />
        <Button
          text={'Рассчитать'}
          disabled={stateButton()}
          type={'submit'}
          isLoader={isLoader}
          extraClass={style.button}
        />
      </form >
      <div className={style.sectionResult}>
        {number.map((letter: number, index: number) => (
          <Circle
            letter={letter}
            key={index}
            index={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
