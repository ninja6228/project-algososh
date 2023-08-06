import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../utils/hook/useForm";
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { timer } from "../../utils/function/timer";
import style from './fibonacci.module.css';
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: '' })
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [number, setNumber] = useState<number[]>([]);

  const fibonacci = async () => {
    setIsLoader(true)
    const number: number = +values.value;
    const arrNumber: number[] = [];
    for (let i = 0; i <= number; i++) {
      if (i === 1 || i === 0) {
        arrNumber.push(1)
      } else {
        arrNumber.push(arrNumber[i - 2] + arrNumber[i - 1])
      }
      await timer(SHORT_DELAY_IN_MS)
      setNumber([...arrNumber])

    }
    setIsLoader(false)
  }

  const handClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fibonacci();
    setValues({ value: '' });
  }

  const stateButton = () => values.value < 1 || values.value > 19 ? true : false

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.sectionForm} onSubmit={handClick}>
        <Input
          extraClass={style.input}
          min={1}
          max={19}
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
        />
      </form >
      <div className={style.sectionResult}>
        {number.map((letter, index) => (
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
