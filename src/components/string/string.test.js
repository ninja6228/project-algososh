import { reverseString } from "./utils/function"

describe('Тестирование алгоритма разворота строки', () => {
  it('с чётным количеством символов', async () => {
    const testString = 'ABCD'
    const res = await reverseString(testString, 0)
    expect(res).toBe('DCBA')
  });

  it('с нечетным количеством символов', async () => {
    const testString = 'ABC'
    const res = await reverseString(testString, 0)
    expect(res).toBe('CBA')
  });

  it('с одним символом', async () => {
    const testString = 'A'
    const res = await reverseString(testString, 0)
    expect(res).toBe('A')
  });

  it('c пустой строкой', async () => {
    const testString = ''
    const res = await reverseString(testString, 0)
    expect(res).toBe('')
  });
})