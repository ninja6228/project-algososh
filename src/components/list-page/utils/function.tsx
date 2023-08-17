import { ElementStates } from "../../../types/element-states";
import { Circle } from "../../ui/circle/circle";

type nodeT = {
  value: string,
  index: null | number,
  head: boolean
}

export const stateHead = (index: number, node: nodeT) => {
  return node.head && node.value && index === node.index ?
    (
      <Circle
        letter={node.value}
        isSmall={true}
        state={ElementStates.Changing} />
    ) : index === 0 ? 'head' : null
}

export const stateTail = (index: number, node: nodeT, item: string, arrLength: number) => {
  return !node.head && !node.value && index === node.index ?
    (
      <Circle
        letter={item}
        isSmall={true}
        state={ElementStates.Changing} />
    ) : index === arrLength - 1 ? 'tail' : null
} 