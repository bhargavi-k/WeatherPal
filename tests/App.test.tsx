import React from 'react';
import App from '../App';
import {render, screen} from '@testing-library/react-native';
import * as locationPermissions from '../src/utils/locationPermissions';
import Geolocation from 'react-native-geolocation-service';

jest.mock('react-native-geolocation-service');
describe('App', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
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

  describe('get current location', () => {
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

    it('getCurrentPosition if location permission is granted', () => {
      jest
        .spyOn(locationPermissions, 'requestLocationPermissions')
        .mockResolvedValue('denied');
      render(<App />);
      expect(Geolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    });

    it('do not getCurrentPosition if location permission is NOT granted', async () => {
      jest
        .spyOn(locationPermissions, 'requestLocationPermissions')
        .mockResolvedValue('denied');
      render(<App />);
      expect(Geolocation.getCurrentPosition).toHaveBeenCalledTimes(0);
    });
  });
});
