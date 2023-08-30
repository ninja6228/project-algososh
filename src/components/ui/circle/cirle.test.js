import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';

describe('Тестирование компонента Cirle', () => {
  it('без буквы', () => {
    const cirle = renderer.create(<Circle />)
    expect(cirle).toMatchSnapshot();
  });

  it('c буквой', () => {
    const cirle = renderer.create(<Circle letter={'ABC'} />)
    expect(cirle).toMatchSnapshot();
  });

  it('с head', () => {
    const cirle = renderer.create(<Circle head={'head'} />)
    expect(cirle).toMatchSnapshot();
  });

  it('с react-элементом в head', () => {
    const cirle = renderer.create(<Circle head={<Circle />} />)
    expect(cirle).toMatchSnapshot();
  });

  it('с tail', () => {
    const cirle = renderer.create(<Circle tail={'tail'} />)
    expect(cirle).toMatchSnapshot();
  });

  it('с react-элементом в tail', () => {
    const cirle = renderer.create(<Circle tail={<Circle />} />)
    expect(cirle).toMatchSnapshot();
  });

  it('с index', () => {
    const cirle = renderer.create(<Circle index={1} />)
    expect(cirle).toMatchSnapshot();
  });

  it('с пропом isSmall ===  true', () => {
    const cirle = renderer.create(<Circle isSmall={true} />)
    expect(cirle).toMatchSnapshot();
  });

  it('в состоянии default', () => {
    const cirle = renderer.create(<Circle state={ElementStates.Default} />)
    expect(cirle).toMatchSnapshot();
  });

  it('в состоянии changing', () => {
    const cirle = renderer.create(<Circle state={ElementStates.Changing} />)
    expect(cirle).toMatchSnapshot();
  });

  it('в состоянии modified', () => {
    const cirle = renderer.create(<Circle state={ElementStates.Modified} />)
    expect(cirle).toMatchSnapshot();
  });
})