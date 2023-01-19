import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {

  it('renders correctly', () => {
    expect(Button).toMatchSnapshot();
  });

  it('renders loading view correctly', () => {
    const { getByTestId } = render(<Button loading />);
    expect(getByTestId('button')).toHaveClass('loading');
    expect(getByTestId('button').children[0].classList.contains('animate-spin')).toBeTruthy();
  });

  it('renders disabled view correctly', () => {
    const { getByTestId } = render(<Button disabled />);
    expect(getByTestId('button')).toHaveClass('cursor-not-allowed');
    expect(getByTestId('button')).toHaveProperty('disabled', true);
  });

  it('renders secondary view correctly', () => {
    const { getByTestId } = render(<Button secondary />);
    expect(getByTestId('button')).toHaveClass('text-blue-500');
    expect(getByTestId('button')).toHaveClass('hover:text-white');
  });

  it('renders label correctly', () => {
    const { getByTestId } = render(<Button label='Label' />);
    expect(getByTestId('button').textContent).toBe('Label');
  });

  it('renders children correctly', () => {
    const { getByTestId } = render(<Button>Children</Button>);
    expect(getByTestId('button').textContent).toBe('Children');
  });

  it('calls onClick correctly', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Button onClick={onClick} />);
    getByTestId('button').click();
    expect(onClick).toHaveBeenCalled();
  });

});
