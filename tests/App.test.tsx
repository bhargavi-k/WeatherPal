import React from 'react';
import App from '../App';
import {render, screen} from '@testing-library/react-native';

describe('App', () => {
  it('renders searchbar', async () => {
    render(<App />);
    const searchBar = await screen.findByTestId('search-bar');

    expect(searchBar).toBeOnTheScreen();
  });

  it('searchbar has correct placeholder text', async () => {
    render(<App />);
    const searchBar = await screen.findByTestId('search-bar');

    expect(searchBar.props.placeholder).toEqual(
      'Search by city name, zip code, or coordinates',
    );
  });
});
