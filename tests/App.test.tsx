import React from 'react';
import App from '../App';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import * as locationPermissions from '../src/utils/locationPermissions';
import * as geolocationModule from '../src/utils/geolocation';
import * as weatherServicesModule from '../src/services/weatherServiceClient';
import * as weatherSearchModule from '../src/utils/weatherSearch';
import {wait} from '@testing-library/react-native/build/user-event/utils';

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

jest.mock('../src/utils/weatherSearch');
const mockWeatherSearch = weatherSearchModule as jest.Mocked<
  typeof weatherSearchModule
>;

describe('App', () => {
  const currentDisplayData = {
    locationName: 'Frisco',
    currentTemp: 100,
    feels_like: 103,
    temp_min: 78,
    temp_max: 106,
    conditions: 'Cloudy',
  };

  const searchDisplayData = {
    locationName: 'Little Elm',
    currentTemp: 100,
    feels_like: 103,
    temp_min: 78,
    temp_max: 106,
    conditions: 'Cloudy',
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
      .mockResolvedValue(currentDisplayData);
    mockWeatherSearch.searchWeather = jest
      .fn()
      .mockResolvedValue(searchDisplayData);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('searchbar', () => {
    it('renders searchbar', async () => {
      render(<App />);
      const searchBar = await screen.findByTestId('searchBar');

      expect(searchBar).toBeOnTheScreen();
    });

    it('searchbar has correct placeholder text', async () => {
      render(<App />);
      const searchBar = await screen.findByTestId('searchBar');

      expect(searchBar.props.placeholder).toEqual(
        'Search by city name, zip code, or coordinates',
      );
    });

    it('clicking on the search icon searches for the weather', async () => {
      render(<App />);
      const searchBarIcon = await screen.findByTestId('searchBar-icon');
      const searchBar = await screen.findByTestId('searchBar');

      fireEvent(searchBar, 'onChangeText', 'Little Elm');
      fireEvent(searchBarIcon, 'onIconPress');

      await waitFor(() => {
        expect(mockWeatherSearch.searchWeather).toHaveBeenCalledTimes(1);
        expect(mockWeatherSearch.searchWeather).toHaveBeenCalledWith(
          'Little Elm',
        );
      });
    });

    it('clicking on the clear icon clears the search', async () => {
      render(<App />);
      const searchBarClearIcon = await screen.findByTestId(
        'searchBar-clear-icon',
      );
      const searchBar = await screen.findByTestId('searchBar');

      fireEvent(searchBar, 'onChangeText', 'Little Elm');
      await waitFor(() => {
        expect(searchBar.props.value).toEqual('Little Elm');
      });

      fireEvent(searchBarClearIcon, 'press');

      await waitFor(() => {
        expect(searchBar.props.value).toBeUndefined();
      });
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

  describe('WeatherDisplayView', () => {
    it('displays weather for current location if no search', async () => {
      render(<App />);
      const view = await screen.findByTestId('weatherDataView');
      expect(view).toHaveTextContent(currentDisplayData.locationName, {
        exact: false,
      });
    });

    it('displays weather for search location if search is initiated', async () => {
      render(<App />);
      const searchBarIcon = await screen.findByTestId('searchBar-icon');
      const searchBar = await screen.findByTestId('searchBar');

      fireEvent(searchBar, 'onChangeText', 'Little Elm');
      fireEvent(searchBarIcon, 'onIconPress');

      const view = await screen.findByTestId('weatherDataView');
      expect(view).toHaveTextContent(searchDisplayData.locationName, {
        exact: false,
      });
    });
  });
});
