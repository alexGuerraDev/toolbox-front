import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import FilesTable from './filesTable';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe('<FilesTable />', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  test('renders without errors', () => {
    useSelector.mockReturnValueOnce([]);
    useState
      .mockReturnValueOnce(["", jest.fn()])
      .mockReturnValueOnce([false, jest.fn()]);
    render(<FilesTable />);
  });

  test('displays no file found message when no files are in the state', () => {
    useSelector.mockReturnValueOnce([]);
    useState
      .mockReturnValueOnce(["", jest.fn()])
      .mockReturnValueOnce([false, jest.fn()]);

    const { getByText } = render(<FilesTable />);
    expect(getByText(/No se encontró ningún archivo con el nombre/i)).toBeInTheDocument();
  });

});
