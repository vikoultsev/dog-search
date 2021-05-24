import React from 'react'

import { render, cleanup, fireEvent } from '@testing-library/react'
import Toolbar from './Toolbar'

afterEach(() => {
  cleanup();
});

const props = {
  totalRecords: 34,
  pageIndex: 0,
  itemsPerPage: 10,
  measuringKey: 'metric',
  sortingKey: 'height',
  sortingOrder: 'ASC',
  onItemsPerPageSelect: jest.fn(),
  onMeasuringSelect: jest.fn(),
  onSortingKeySelect: jest.fn(),
  onSortingOrderSelect: jest.fn(),
}

test('toolbar handlers', async () => {
  const { getByTestId } = render(<Toolbar {...props} />);
  fireEvent.change(getByTestId('items-select'), { target: { value: 20 } });
  fireEvent.change(getByTestId('measuring-select'), { target: { value: 'imperial' } });
  fireEvent.change(getByTestId('sort-select'), { target: { value: 'lifespan' } });
  fireEvent.change(getByTestId('order-select'), { target: { value: 'DESC' } });
  expect(props.onItemsPerPageSelect).toHaveBeenCalled();
  expect(props.onMeasuringSelect).toHaveBeenCalled();
  expect(props.onSortingKeySelect).toHaveBeenCalled();
  expect(props.onSortingOrderSelect).toHaveBeenCalled();
});


