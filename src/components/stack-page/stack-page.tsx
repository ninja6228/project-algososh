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
import { ButtonState } from '../../types/buttonState';
import style from './stack.module.css';

const stack = new Stack<string>()

export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: '' });
  const [arr, setArr] = useState<string[]>([]);
  const [state, setState] = useState(ElementStates.Default)
  const [isLoader, setIsLoader] = useState<ButtonState>({
    buttonPush: false,
    buttonDelete: false,
    buttonReset: false
  });

  const MAX_LENGTH_LINE = 4;
  const MAX_LENGTH_ARR = 19;

  const lengthArr = stack.getSize()

  useEffect(() => {
    return () => {
      handClickReset()
    }
  }, []);

  const handClickPush = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoader({ ...isLoader, buttonPush: true })
    stack.push(values.value);
    setValues({ value: '' })
    setArr([...stack.getElements()])
    toggleState()
    await timer(SHORT_DELAY_IN_MS)
    setIsLoader({ ...isLoader, buttonPush: false })
  }

  const handClickDelete = async () => {
    setIsLoader({ ...isLoader, buttonDelete: true })
    toggleState()
    await timer(SHORT_DELAY_IN_MS)
    stack.pop()
    setArr([...stack.getElements()])
    setIsLoader({ ...isLoader, buttonDelete: false })
  }

  const handClickReset = async () => {
    setIsLoader({ ...isLoader, buttonReset: true })
    setValues({ value: '' })
    await timer(SHORT_DELAY_IN_MS)
    stack.reset()
    setArr([...stack.getElements()])
    setValues({ value: '' })
    setIsLoader({ ...isLoader, buttonReset: false })
  }

  const toggleState = async () => {
    setState(ElementStates.Changing)
    await timer(SHORT_DELAY_IN_MS)
    setState(ElementStates.Default)
  }

  const stateLoadersButtons = isLoader.buttonPush || isLoader.buttonReset || isLoader.buttonDelete ? true : false
  const stateButtonsDelete = !lengthArr || stateLoadersButtons ? true : false;
  const stateButtonAdd = values.value ? (arr.length > MAX_LENGTH_ARR ? true : false) || stateLoadersButtons : true;
  const stateHead = (index: number) => index === lengthArr - 1 ? 'top' : null
  const stateElement = (index: number) => index === lengthArr - 1 ? state : ElementStates.Default

  return (
    <SolutionLayout title="Стек">
      <form className={style.sectionForm} onSubmit={handClickPush} onReset={handClickReset}>
        <Input
          extraClass={style.input}
          maxLength={MAX_LENGTH_LINE}
          isLimitText={true}
          placeholder={"Введите значение"}
          value={values.value}
          onChange={handleChange}
          name="value"
        />
        <Button
          text={"Добавить"}
          type={'submit'}
          disabled={stateButtonAdd}
          isLoader={isLoader.buttonPush}
        />
        <Button
          text={"Удалить"}
          type={'button'}
          onClick={() => handClickDelete()}
          disabled={stateButtonsDelete}
          isLoader={isLoader.buttonDelete}
        />
        <Button
          text={"Очистить"}
          extraClass={style.buttonReset}
          type={'reset'}
          disabled={stateButtonsDelete}
          isLoader={isLoader.buttonReset}
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
