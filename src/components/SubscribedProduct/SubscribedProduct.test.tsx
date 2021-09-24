import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubscribedProduct } from './SubscribedProduct';
import { AVAILABLE_PRODUCTS } from '../../constants';

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

const mockFn = jest.fn()

describe('SubscribedProduct', () => {

    test('select product from dropdown', async () => {
        render(<SubscribedProduct availableProducts={AVAILABLE_PRODUCTS} isDisabled={false} selectedProduct={undefined} onSelectProduct={mockFn} />);
        
        const selectBox = screen.getByRole('combobox');
        userEvent.click(selectBox);

        await waitFor(() => screen.getAllByTestId("select-option"))

        const optionBox = screen.getAllByTestId("select-option")[1]
        userEvent.click(optionBox)

        expect(mockFn).toHaveBeenCalledWith(AVAILABLE_PRODUCTS[1], {
            children: AVAILABLE_PRODUCTS[1],
            "data-testid": "select-option",
            key: AVAILABLE_PRODUCTS[1],
            value: AVAILABLE_PRODUCTS[1]
        })
    });

    test('clear product from dropdown', async () => {
        render(<SubscribedProduct availableProducts={AVAILABLE_PRODUCTS} isDisabled={false} selectedProduct={AVAILABLE_PRODUCTS[1]} onSelectProduct={mockFn} />);
    
        const button = screen.getByTestId("clear")
        userEvent.click(button)

        expect(mockFn).toHaveBeenCalledWith(undefined)
    })
})