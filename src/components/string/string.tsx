import { FormEvent, useState } from "react";
import { useForm } from "../../utils/hook/useForm";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../constants/delays';
import { timer } from "../../utils/function/timer";
import { ElementStates } from '../../types/element-states';
import style from './string.module.css';

export const StringComponent = () => {
  const { values, handleChange, setValues } = useForm({ value: '' })
  const [string, setString] = useState<string[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [indexLetter, setIndexLetter] = useState<number[]>([])

  const reverseString = async () => {
    setIsLoader(true)
    await timer(SHORT_DELAY_IN_MS)

    const arrString = values.value.split('');
    setString([...arrString])

    let startString = 0
    let endString = arrString.length - 1

    while (startString <= endString) {
      setIndexLetter([startString, endString])
      await timer(DELAY_IN_MS);

      [arrString[startString], arrString[endString]] = [arrString[endString], arrString[startString]]

      startString++;
      endString--;

      setIndexLetter([startString, endString])
      setString([...arrString])
    }
    setIsLoader(false)
  }

  const stateLetter = (position: number[], index: number) => {
    const [start, end] = position
    const state = index < start || index > end ? ElementStates.Modified : index === start || index === end ? ElementStates.Changing : ElementStates.Default
    return state
  }


  const handClick = (value: FormEvent<HTMLFormElement>) => {
    value.preventDefault();
    reverseString();
    setValues({ value: '' })
  }

  return (
    <SolutionLayout title="Строка">

      <form className={style.sectionForm} onSubmit={handClick}>
        <Input
          maxLength={11}
          isLimitText={true}
          extraClass={style.input}
          value={values.value}
          name="value"
          onChange={handleChange} />
        <Button
          text={'Развернуть'}
          disabled={values.value ? false : true}
          type={'submit'}
          isLoader={isLoader}
        />
      </form >
      <div className={style.sectionResult}>
        {string.map((letter, index) => (
          <Circle
            letter={letter}
            key={index}
            state={stateLetter(indexLetter, index)}
          />
        ))}
      </div>

    </SolutionLayout>
  );
};
