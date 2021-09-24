import { render, screen } from '@testing-library/react';
import { PriceView } from './PriceView';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({t: (key: string) => key})
}));

jest.mock('websocket', () => {
  return {
    w3cwebsocket: jest.fn()
  }
})

global.matchMedia = global.matchMedia || function () {
  return {
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

describe('PriceView', () => {

    test('render nothing when no bids and asks', () => {
        const { container } = render(<PriceView bids={[]} asks={[]} />)
        expect(container).toBeEmptyDOMElement()
    })

    test('check header content for table', () => {
        render(<PriceView bids={[["1", "0.1"], ["2", "0.2"]]} asks={[["1.1", "0.11"], ["1.2", "0.12"]]} />)

        expect(screen.getAllByText("Price")).toHaveLength(2)
        expect(screen.getAllByText("Quantity")).toHaveLength(2)
    })

    test('match snapshot', () => {
        const {container} = render(<PriceView bids={[["1", "0.1"], ["2", "0.2"]]} asks={[["1.1", "0.11"], ["1.2", "0.12"]]} />)
        expect(container.firstChild).toMatchSnapshot()
    })
})