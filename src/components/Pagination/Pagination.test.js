import React from 'react'

import { render, cleanup, fireEvent } from '@testing-library/react'
import Pagination from './Pagination'

afterEach(() => {
  cleanup();
});

const onChange = jest.fn();

const props = {
  totalRecords: 34,
  pageIndex: 0,
  itemsPerPage: 10,
  onPageChange: jest.fn(() => onChange),
};

test('toolbar handlers', async () => {
  const { getAllByTestId } = render(<Pagination {...props} />);
  const buttonItems = getAllByTestId('button-item');
  expect(buttonItems.length).toBe(4);
  fireEvent.click(buttonItems[0]);
  fireEvent.click(buttonItems[1]);
  expect(props.onPageChange).toHaveBeenCalledTimes(4);
  expect(onChange).toHaveBeenCalledTimes(1);
});


