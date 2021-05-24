import React from 'react'
import { fetchSearchResults, fetchImageData } from '../../api'
import { searchResponse, imageResponse } from '../../../__mocks__/apiResponses'
import { render, cleanup, waitForElement, fireEvent } from '@testing-library/react'
import App from './App'

jest.mock('../../api', () =>({
  fetchSearchResults: jest.fn(),
  fetchImageData: jest.fn(),
}));

afterEach(() => {
  cleanup();
});

test('renders no records without crashing', async () => {
  const { getByTestId } = render(<App />);
  fetchSearchResults.mockResolvedValue([])
  fireEvent.change(getByTestId('search-input'), { target: { value: 'dog breed' } });
  await waitForElement(() => getByTestId('no-records'));
  expect(fetchSearchResults).toHaveBeenCalled();
});

test('renders table without crashing', async () => {
  const { getByTestId, getAllByTestId } = render(<App />);
  fetchSearchResults.mockResolvedValue(searchResponse)
  fetchImageData.mockResolvedValue(imageResponse)
  fireEvent.change(getByTestId('search-input'), { target: { value: 'nor' } });
  await waitForElement(() => getByTestId('result-table'));
  expect(fetchSearchResults).toHaveBeenCalled();
  const breedItems = getAllByTestId('breed-item');
  expect(breedItems.length).toBe(5);
  expect(fetchImageData).toHaveBeenCalledTimes(2);
});

test('switch toolbar controllers', async () => {
  const { getByTestId } = render(<App />);
  fetchSearchResults.mockResolvedValue(searchResponse)
  fetchImageData.mockResolvedValue(imageResponse)
  fireEvent.change(getByTestId('search-input'), { target: { value: 'nor' } });
  await waitForElement(() => getByTestId('result-table'));
  fireEvent.change(getByTestId('items-select'), { target: { value: 20 } });
  fireEvent.change(getByTestId('measuring-select'), { target: { value: 'metric' } });
  fireEvent.change(getByTestId('sort-select'), { target: { value: 'height' } });
  fireEvent.change(getByTestId('order-select'), { target: { value: 'DESC' } });
});

