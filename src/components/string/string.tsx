import { FormEvent, useState } from "react";
import { useForm } from "../../utils/hook/useForm";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from '../../constants/delays';
import { ElementStates } from '../../types/element-states';
import { reverseString } from "./utils/function";
import style from './string.module.css';

export const StringComponent: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: '' })
  const [string, setString] = useState<string[]>([]);
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [indexLetter, setIndexLetter] = useState<number[]>([])

  const MAX_LENGTH_LINE = 11;

  const handClick = async (event: FormEvent<HTMLFormElement>) => {
    setIsLoader(true)
    event.preventDefault();
    await reverseString(values.value, DELAY_IN_MS, setString, setIndexLetter);
    setValues({ value: '' })
    setIsLoader(false)
  }

  const stateLetter = (position: number[], index: number) => {
    const [start, end] = position
    const state = index < start || index > end ? ElementStates.Modified : index === start || index === end ? ElementStates.Changing : ElementStates.Default
    return state
  }

  return (
    <SolutionLayout title="Строка">

      <form className={style.sectionForm} onSubmit={handClick}>
        <Input
          maxLength={MAX_LENGTH_LINE}
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
          extraClass={style.button}
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
