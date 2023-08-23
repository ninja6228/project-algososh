import { getFibonacciNumbers } from './utils/function';

describe('Тестирование алгоритма фибоначчи', () => {
  it('без числа', () => {
    const res = getFibonacciNumbers()
    expect(res).toStrictEqual([])
  })

  it('с отрицательным числом', () => {
    const testNumber = -5
    const res = getFibonacciNumbers(testNumber)
    expect(res).toStrictEqual([])
  })

  it('с положительным числом', () => {
    const testNumber = 2
    const res = getFibonacciNumbers(testNumber)
    expect(res).toStrictEqual([1, 1, 2])
  })
})