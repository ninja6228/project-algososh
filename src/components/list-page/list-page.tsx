import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../utils/hook/useForm";
import { LinkedList } from './utils/class';
import chevronRight from '../../images/icons/chevron-right.svg';
import { Circle } from "../ui/circle/circle";
import { timer } from "../../utils/function/timer";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { stateHead, stateTail } from './utils/function'
import { ElementStates } from "../../types/element-states";
import style from './list.module.css'

const list = new LinkedList<string>(['0', '34', '8', '1'])

export const ListPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: '', index: '' });
  const [strArr, setStrArr] = useState<string[]>([])
  const [state, setState] = useState(ElementStates.Default)
  const [node, setNode] = useState<{ value: string, index: null | number, head: boolean }>({ value: '', index: null, head: true })
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [textContentCircle, setTextContentCircle] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState({
    buttonAddHead: false,
    buttonAddTail: false,
    buttonDeleteHead: false,
    buttonDeleteTail: false,
    bottonAddByIndex: false,
    bottonDeleteByIndex: false,
  })
  const MAX_INDEX = strArr.length - 1;
  const MIN_INDEX = 1;
  const MAX_LENGTH_LINE = 4;
  const MAX_LENGTH_STR_ARR = 12;

  useEffect(() => {
    setStrArr([...list.getArrayValues()])
    return () => {
      list.reset()
    }
  }, [])

  const handleClickPrepend = async () => {
    setIsLoaded({ ...isLoaded, buttonAddHead: true })
    list.prepend(values.value)
    setNode({ value: values.value, index: 0, head: true })
    await timer(SHORT_DELAY_IN_MS)
    setStrArr([...list.getArrayValues()])
    setNode({ value: '', index: 0, head: true })
    setValues({ value: '', index: '' })
    await toggleState()
    setIsLoaded({ ...isLoaded, buttonAddHead: false })
  }

  const handleClickAppend = async () => {
    setIsLoaded({ ...isLoaded, buttonAddTail: true })
    list.append(values.value)
    setNode({ value: values.value, index: strArr.length - 1, head: true })
    await timer(SHORT_DELAY_IN_MS)
    setStrArr([...list.getArrayValues()])
    setNode({ value: '', index: strArr.length, head: true })
    setValues({ value: '', index: '' })
    await toggleState()
    setIsLoaded({ ...isLoaded, buttonAddTail: false })
  }

  const handeleClickDeleteHead = async () => {
    setIsLoaded({ ...isLoaded, buttonDeleteHead: true })
    setTextContentCircle(true)
    list.deleteHead()
    setNode({ value: '', index: 0, head: false })
    await timer(SHORT_DELAY_IN_MS)
    setStrArr([...list.getArrayValues()])
    setNode({ value: '', index: null, head: false })
    setIsLoaded({ ...isLoaded, buttonDeleteHead: false })
    setTextContentCircle(false)
  }

  const handleClickDeleteTail = async () => {
    setIsLoaded({ ...isLoaded, buttonDeleteTail: true })
    setTextContentCircle(true)
    list.deleteTail()
    setNode({ value: '', index: strArr.length - 1, head: false })
    await timer(SHORT_DELAY_IN_MS)
    setStrArr([...list.getArrayValues()])
    setNode({ value: '', index: null, head: false })
    setIsLoaded({ ...isLoaded, buttonDeleteTail: false })
    setTextContentCircle(false)
  }

  const handClickInsertAt = async () => {
    const index = +values.index
    setIsLoaded({ ...isLoaded, bottonAddByIndex: true })
    list.insertAt(values.value, index)
    for (let i = 0; i <= index; i++) {
      await timer(SHORT_DELAY_IN_MS)
      setCurrentIndex(i)
      setNode({ value: values.value, index: i, head: true })
      setState(ElementStates.Changing)
    }
    await timer(SHORT_DELAY_IN_MS)
    setCurrentIndex(-1)
    setNode({ value: '', index: index, head: true })
    setState(ElementStates.Modified)
    setStrArr([...list.getArrayValues()])
    await timer(SHORT_DELAY_IN_MS)
    setNode({ value: '', index: null, head: true })
    setValues({ value: '', index: '' })
    setState(ElementStates.Default)
    setIsLoaded({ ...isLoaded, bottonAddByIndex: false })
  }

  const handClickDeleteAt = async () => {
    const index = +values.index
    setIsLoaded({ ...isLoaded, bottonDeleteByIndex: true })
    list.deleteAt(index)
    for (let i = 0; i <= index; i++) {
      await timer(SHORT_DELAY_IN_MS)
      setCurrentIndex(i)
      setNode({ value: values.index, index: i, head: false })
      setState(ElementStates.Changing)
    }
    await timer(SHORT_DELAY_IN_MS)
    setCurrentIndex(-1)
    setNode({ value: '', index: index, head: false })
    setTextContentCircle(true)
    setState(ElementStates.Default)
    await timer(SHORT_DELAY_IN_MS)
    setStrArr([...list.getArrayValues()])
    setNode({ value: '', index: null, head: true })
    setValues({ value: '', index: '' })
    setTextContentCircle(false)
    setIsLoaded({ ...isLoaded, bottonDeleteByIndex: false })
  }

  const toggleState = async () => {
    setState(ElementStates.Modified)
    await timer(SHORT_DELAY_IN_MS)
    setState(ElementStates.Default)
  }

  const loadedButtons =
    isLoaded.buttonAddHead ||
      isLoaded.buttonAddTail ||
      isLoaded.buttonDeleteHead ||
      isLoaded.buttonDeleteTail ||
      isLoaded.bottonAddByIndex ||
      isLoaded.bottonDeleteByIndex ? true : false

  const stateAddButtons = !values.value || loadedButtons || strArr.length >= MAX_LENGTH_STR_ARR ? true : false;
  const stateDeleteButtons = !strArr.length || loadedButtons ? true : false;
  const stateButtonInsertAt = !values.value || !values.index || loadedButtons || +values.index < 0 || +values.index > strArr.length - 1 || strArr.length >= MAX_LENGTH_STR_ARR ? true : false;
  const stateButtonDeleteAt = !strArr.length || !values.index || loadedButtons || +values.index < 0 || +values.index > strArr.length - 1 ? true : false;

  return (
    <SolutionLayout title="Связный список">
      <section className={style.sectionForm}>
        <div className={style.sectionInput}>
          <Input
            placeholder={"Введите значение"}
            extraClass={style.input}
            maxLength={MAX_LENGTH_LINE}
            isLimitText={true}
            value={values.value}
            name={'value'}
            onChange={handleChange}
            disabled={loadedButtons}
          />
          <Button
            text={'Добавить в head'}
            extraClass={style.buttonValue}
            onClick={handleClickPrepend}
            disabled={stateAddButtons}
            isLoader={isLoaded.buttonAddHead} />
          <Button
            text={'Добавить в tail'}
            extraClass={style.buttonValue}
            onClick={handleClickAppend}
            disabled={stateAddButtons}
            isLoader={isLoaded.buttonAddTail} />
          <Button
            text={'Удалить из head'}
            extraClass={style.buttonValue}
            onClick={handeleClickDeleteHead}
            disabled={stateDeleteButtons}
            isLoader={isLoaded.buttonDeleteHead} />
          <Button
            text={'Удалить из tail'}
            extraClass={style.buttonValue}
            onClick={handleClickDeleteTail}
            disabled={stateDeleteButtons}
            isLoader={isLoaded.buttonDeleteTail} />
        </div>

        <div className={style.sectionInput}>
          <Input
            placeholder={"Введите индекс"}
            extraClass={style.input}
            min={MIN_INDEX}
            max={MAX_INDEX}
            value={values.index}
            name={'index'}
            type={'number'}
            onChange={handleChange}
            disabled={loadedButtons}
          />
          <Button
            text={'Добавить по индексу'}
            onClick={handClickInsertAt}
            extraClass={style.buttonIndex}
            disabled={stateButtonInsertAt}
            isLoader={isLoaded.bottonAddByIndex} />
          <Button
            text={'Удалить по индексу'}
            onClick={handClickDeleteAt}
            extraClass={style.buttonIndex}
            disabled={stateButtonDeleteAt}
            isLoader={isLoaded.bottonDeleteByIndex} />
        </div>
      </section>

      <section className={style.sectionResult}>
        {strArr.map((item, index) => (
          <div className={style.circle} key={index}>
            <Circle
              letter={(index === node.index && textContentCircle) ? '' : item}
              index={index}
              head={stateHead(index, node)}
              tail={stateTail(index, node, item, strArr.length)}
              state={currentIndex > index || index === node.index ? state : ElementStates.Default}
            />
            <img src={chevronRight} alt="Знак большое" />
          </div>
        ))}
      </section>
    </SolutionLayout>
  );
};
