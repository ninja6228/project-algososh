export const getFibonacciNumbers = (number: number) => {
  const arrNumber: number[] = [];
  for (let i = 0; i <= number; i++) {
    if (i === 1 || i === 0) {
      arrNumber.push(1)
    } else {
      arrNumber.push(arrNumber[i - 2] + arrNumber[i - 1])
    }
  }
  return arrNumber
} 