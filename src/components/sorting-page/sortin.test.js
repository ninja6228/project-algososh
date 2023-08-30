import { selectionSortFuntion, bubbleSortFuntion } from './utils/function'

describe('Тестирование алгоритмов сортировки выбором', () => {
  describe('по убыванию', () => {
    it('пустой массив', async () => {
      const testArr = [];
      const res = await selectionSortFuntion(testArr, 'down', 0)
      expect(res).toStrictEqual([])
    })
    it('массив из одного элемента', async () => {
      const testArr = [1];
      const res = await selectionSortFuntion(testArr, 'down', 0)
      expect(res).toStrictEqual([1])
    })
    it('массив из нескольких элементов', async () => {
      const testArr = [1, 1, 6, 23, 539, -2];
      const res = await selectionSortFuntion(testArr, 'down', 0)
      expect(res).toStrictEqual([539, 23, 6, 1, 1, -2])
    })
  })

  describe('по возрастанию', () => {
    it('пустой массив', async () => {
      const testArr = [];
      const res = await selectionSortFuntion(testArr, 'up', 0)
      expect(res).toStrictEqual([])
    })
    it('массив из одного элемента', async () => {
      const testArr = [1];
      const res = await selectionSortFuntion(testArr, 'up', 0)
      expect(res).toStrictEqual([1])
    })
    it('массив из нескольких элементов', async () => {
      const testArr = [2, 3, 2, 29, 123, -3];
      const res = await selectionSortFuntion(testArr, 'up', 0)
      expect(res).toStrictEqual([-3, 2, 2, 3, 29, 123])
    })
  })

})

describe('Тестирование алгоритмов сортировки пузырьком', () => {
  describe('по убыванию', () => {
    it('пустой массив', async () => {
      const testArr = [];
      const res = await bubbleSortFuntion(testArr, 'down', 0)
      expect(res).toStrictEqual([])
    })
    it('массив из одного элемента', async () => {
      const testArr = [1];
      const res = await bubbleSortFuntion(testArr, 'down', 0)
      expect(res).toStrictEqual([1])
    })
    it('массив из нескольких элементов', async () => {
      const testArr = [1, 1, 5, 32, 124, -2];
      const res = await bubbleSortFuntion(testArr, 'down', 0)
      expect(res).toStrictEqual([124, 32, 5, 1, 1, -2])
    })
  })

  describe('по возрастанию', () => {
    it('пустой массив', async () => {
      const testArr = [];
      const res = await bubbleSortFuntion(testArr, 'up', 0)
      expect(res).toStrictEqual([])
    })
    it('массив из одного элемента', async () => {
      const testArr = [1];
      const res = await bubbleSortFuntion(testArr, 'up', 0)
      expect(res).toStrictEqual([1])
    })
    it('массив из нескольких элементов', async () => {
      const testArr = [1, 1, 5, 32, 124, -2];
      const res = await bubbleSortFuntion(testArr, 'up', 0)
      expect(res).toStrictEqual([-2, 1, 1, 5, 32, 124])
    })
  })
})