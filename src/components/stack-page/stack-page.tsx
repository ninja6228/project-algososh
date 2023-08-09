import React, { FormEvent, useEffect, useState } from "react";
import { timer } from "../../utils/function/timer";
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { useForm } from "../../utils/hook/useForm";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from '../ui/circle/circle';
import { Stack } from "./utils/class";
import { ElementStates } from '../../types/element-states';
import style from './stack.module.css';

const stack = new Stack<string>()

export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: '' });
  const [arr, setArr] = useState<string[]>([]);
  const [isLoader, setIsLoader] = useState<string>('');
  const [state, setState] = useState(ElementStates.Default)

  const lengthArr = stack.getSize()

  useEffect(() => {
    return () => {
      handClickReset()
    }
  }, []);

  const handClickPush = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoader('push')
    stack.push(values.value);
    setValues({ value: '' })
    await timer(SHORT_DELAY_IN_MS)
    setArr([...stack.getElements()])
    toggleState()
    setIsLoader('')
  }

  const handClickDelete = async () => {
    setIsLoader('delete')
    toggleState()
    await timer(SHORT_DELAY_IN_MS)
    stack.pop()
    setArr([...stack.getElements()])
    setIsLoader('')
  }

  const handClickReset = async () => {
    setIsLoader('reset')
    setValues({ value: '' })
    await timer(SHORT_DELAY_IN_MS)
    stack.reset()
    setArr([...stack.getElements()])
    setValues({ value: '' })
    setIsLoader('')
  }

  const toggleState = async () => {
    setState(ElementStates.Changing)
    await timer(SHORT_DELAY_IN_MS)
    setState(ElementStates.Default)
  }

  const stateButtons = () => lengthArr && !isLoader ? false : true;
  const stateHead = (index: number) => index === lengthArr - 1 ? 'top' : null
  const stateElement = (index: number) => index === lengthArr - 1 ? state : ElementStates.Default

  return (
    <SolutionLayout title="Стек">
      <form className={style.sectionForm} onSubmit={handClickPush} onReset={handClickReset}>
        <Input
          extraClass={style.input}
          maxLength={4}
          isLimitText={true}
          placeholder={"Введите значение"}
          value={values.value}
          onChange={handleChange}
          name="value"
        />
        <Button
          text={"Добавить"}
          type={'submit'}
          disabled={values.value ? false : true}
          isLoader={isLoader === 'push' ? true : false}
        />
        <Button
          text={"Удалить"}
          type={'button'}
          onClick={() => handClickDelete()}
          disabled={stateButtons()}
          isLoader={isLoader === 'delete' ? true : false}
        />
        <Button
          text={"Очистить"}
          extraClass={style.buttonReset}
          type={'reset'}
          disabled={stateButtons()}
          isLoader={isLoader === 'reset' ? true : false}
        />
      </form>
      <section className={style.sectionResult}>
        {
          arr.map((item, index) => (
            <Circle
              letter={item}
              key={index}
              index={index}
              head={stateHead(index)}
              state={stateElement(index)}
            />
          ))
        }
      </section>
    </SolutionLayout >
  );
};
