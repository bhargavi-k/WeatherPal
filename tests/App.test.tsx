import React from 'react';
import App from '../App';
import {render, screen, waitFor} from '@testing-library/react-native';
import * as locationPermissions from '../src/utils/locationPermissions';
import * as geolocationModule from '../src/utils/geolocation';
import * as weatherServicesModule from '../src/services/weatherServiceClient';

jest.mock('../src/services/weatherServiceClient');
const mockWeatherServiceClient = weatherServicesModule as jest.Mocked<
  typeof weatherServicesModule
>;

jest.mock('../src/utils/geolocation');
const mockGeolocation = geolocationModule as jest.Mocked<
  typeof geolocationModule
>;

jest.mock('../src/utils/locationPermissions');
const mockLocationPermissions = locationPermissions as jest.Mocked<
  typeof locationPermissions
>;

describe('App', () => {
  const mockWeatherData = {
    name: 'Little Elm',
    main: {
      temp: 100.1,
      feels_like: 103.2,
      temp_min: 78.23,
      temp_max: 105.67,
    },
    weather: [
      {
        main: 'Cloudy',
      },
    ],
  };

  beforeEach(() => {
    mockLocationPermissions.requestLocationPermissions = jest
      .fn()
      .mockResolvedValue('granted');
    mockGeolocation.getCurrentCoordinates = jest
      .fn()
      .mockResolvedValue({lat: 33.1626, lon: -96.9375});
    mockWeatherServiceClient.getWeatherByCoordinates = jest
      .fn()
      .mockResolvedValue(mockWeatherData);
  });
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
    it('prompt user for location permissions', async () => {
      render(<App />);
      await waitFor(() =>
        expect(
          locationPermissions.requestLocationPermissions,
        ).toHaveBeenCalledTimes(1),
      );
    });

    it('getCurrentPosition if location permission is granted', async () => {
      mockLocationPermissions.requestLocationPermissions = jest
        .fn()
        .mockResolvedValue('granted');
      render(<App />);
      await waitFor(() =>
        expect(mockGeolocation.getCurrentCoordinates).toHaveBeenCalledTimes(1),
      );
    });

    it('do not getCurrentPosition if location permission is NOT granted', async () => {
      mockLocationPermissions.requestLocationPermissions = jest
        .fn()
        .mockResolvedValue('denied');
      render(<App />);
      await waitFor(() =>
        expect(mockGeolocation.getCurrentCoordinates).toHaveBeenCalledTimes(0),
      );
    });

    it('getWeatherByCoordinates after geolocation returns coordinates', async () => {
      render(<App />);
      await waitFor(() => {
        expect(
          mockWeatherServiceClient.getWeatherByCoordinates,
        ).toHaveBeenCalledTimes(1);

        expect(
          mockWeatherServiceClient.getWeatherByCoordinates,
        ).toHaveBeenCalledWith(33.1626, -96.9375);
      });
    });
  });
});
