import React from 'react';
import App from '../App';
import {render, screen} from '@testing-library/react-native';

describe('App', () => {
  it('renders searchbar', () => {
    render(<App />);
    const searchBar = screen.getByRole('search');
    expect(searchBar).toBeOnTheScreen();
  });
});
