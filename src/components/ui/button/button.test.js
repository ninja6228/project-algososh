import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button'

describe('Тестирование компонента Button', () => {
  it('с текстом', () => {
    const button = renderer.create(<Button text='Текст проверки' />)
    expect(button).toMatchSnapshot();
  });

  it('без текста', () => {
    const button = renderer.create(<Button />)
    expect(button).toMatchSnapshot();
  });

  it('в заблокированном состояние', () => {
    const button = renderer.create(<Button disabled={true} />)
    expect(button).toMatchSnapshot();
  });

  it('с индикацией загрузки', () => {
    const button = renderer.create(<Button isLoader={true} />)
    expect(button).toMatchSnapshot();
  });

  it('на вызов колбека при клике', () => {
    window.alert = jest.fn()
    const click = alert('Нажали кнопку');
    render(<Button text={'Кнопка для колбека'} onClick={click} />)
    const button = screen.getByText('Кнопка для колбека')
    fireEvent.click(button)
    expect(window.alert).toHaveBeenLastCalledWith('Нажали кнопку')
  })
})
