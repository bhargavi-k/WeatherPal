import React from 'react';
import App from '../App';
import {render, screen} from '@testing-library/react-native';
import * as locationPermissions from '../src/utils/locationPermissions';

describe('App', () => {
  describe('searchbar', () => {
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
  describe('user permissions for location', () => {
    beforeEach(() => {
      jest
        .spyOn(locationPermissions, 'requestLocationPermissions')
        .mockResolvedValue('granted');
    });

    it('prompt user for location permissions', () => {
      render(<App />);
      expect(
        locationPermissions.requestLocationPermissions,
      ).toHaveBeenCalledTimes(1);
    });
  });
});
