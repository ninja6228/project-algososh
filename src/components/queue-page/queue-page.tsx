import React, { FormEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from './utils/class';
import { useForm } from "../../utils/hook/useForm";
import { ButtonState } from '../../types/buttonState';
import { timer } from "../../utils/function/timer";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import style from './queue.module.css';

const queue = new Queue<string>(7);

export const QueuePage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: '' });
  const [arr, setArr] = useState<(string | null)[]>([]);
  const [state, setState] = useState(ElementStates.Default)
  const [isLoader, setIsLoader] = useState<ButtonState>({
    buttonPush: false,
    buttonDelete: false,
    buttonReset: false
  });

  useEffect(() => {
    setArr([...queue.getElements()])
    return (() => {
      queue.reset()
    })
  }, []);

  const handClickPush = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoader({ ...isLoader, buttonPush: true })
    queue.enqueue(values.value)
    setArr([...queue.getElements()])
    toggleState()
    await timer(SHORT_DELAY_IN_MS)
    setIsLoader({ ...isLoader, buttonPush: false })
    setValues({ value: '' })
  }

  const handClickDelete = async () => {
    setIsLoader({ ...isLoader, buttonDelete: true })
    toggleState()
    await timer(SHORT_DELAY_IN_MS)
    queue.dequeue()
    setArr([...queue.getElements()])
    setIsLoader({ ...isLoader, buttonDelete: false })
  }

  const handClickReset = async () => {
    setIsLoader({ ...isLoader, buttonReset: true })
    await timer(SHORT_DELAY_IN_MS)
    queue.reset()
    setArr([...queue.getElements()])
    setIsLoader({ ...isLoader, buttonReset: false })
  }

  const toggleState = async () => {
    setState(ElementStates.Changing)
    await timer(SHORT_DELAY_IN_MS)
    setState(ElementStates.Default)
  }

  const AddStateElement = (index: number) => index === queue.tail - 1 ? state : ElementStates.Default
  const DeleteStateElement = (index: number) => index === queue.head ? state : ElementStates.Default

  const stateLoaderButtons = isLoader.buttonPush || isLoader.buttonDelete || isLoader.buttonReset ? false : true;

  const buttonAddState = values.value && queue.tail < queue.size && stateLoaderButtons ? false : true;
  const buttonDeleteState = arr.find(item => item !== undefined) && queue.length && stateLoaderButtons ? false : true;
  const buttonResetState = queue.length && stateLoaderButtons ? false : true;

  return (
    <SolutionLayout title="Очередь">
      <form className={style.sectionForm} onSubmit={handClickPush} onReset={handClickReset}>
        <Input
          extraClass={style.input}
          maxLength={4}
          isLimitText={true}
          placeholder={"Введите значение"}
          value={values.value}
          name={'value'}
          onChange={handleChange}
        />
        <Button
          text={"Добавить"}
          type={'submit'}
          disabled={buttonAddState}
          isLoader={isLoader.buttonPush}
        />
        <Button
          text={"Удалить"}
          type={'button'}
          disabled={buttonDeleteState}
          onClick={() => handClickDelete()}
          isLoader={isLoader.buttonDelete}
        />
        <Button
          text={"Очистить"}
          extraClass={style.buttonReset}
          type={'reset'}
          disabled={buttonResetState}
          isLoader={isLoader.buttonReset}
        />
      </form>
      <section className={style.sectionResult}>
        {
          arr.map((item: any, index: number) => (
            <Circle
              letter={item}
              key={index}
              index={index}
              head={index === queue.head && queue.length ? 'head' : null}
              tail={index === queue.tail - 1 && item ? 'tail' : null}
              state={isLoader.buttonPush ? AddStateElement(index) : isLoader.buttonDelete ? DeleteStateElement(index) : ElementStates.Default}
            />
          ))
        }
      </section>
    </SolutionLayout>
  );
};