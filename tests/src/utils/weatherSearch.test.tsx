import {getLatLon, searchWeather} from '../../../src/utils/weatherSearch';
import * as weatherServicesModule from '../../../src/services/weatherServiceClient';

jest.mock('../../../src/services/weatherServiceClient');
const mockWeatherServiceClient = weatherServicesModule as jest.Mocked<
  typeof weatherServicesModule
>;
describe('weatherSearch', () => {
  describe('getLatLon', () => {
    it('returns coordinates if search texts matches pattern for lat lon', () => {
      const searchString = '-68.23,123.6786';
      const latLon = getLatLon(searchString);
      expect(latLon).toEqual({lat: -68.23, lon: 123.6786});
    });

    it('returns undefined if lat out of range', () => {
      const searchString = '-123.23,-168.23';
      const latLon = getLatLon(searchString);
      expect(latLon).toBeUndefined();
    });

    it('returns undefined if lon out of range', () => {
      const searchString = '63.765,-198.23';
      const latLon = getLatLon(searchString);
      expect(latLon).toBeUndefined();
    });

    it('returns undefined if search string is text', () => {
      const searchString = 'hello';
      const latLon = getLatLon(searchString);
      expect(latLon).toBeUndefined();
    });

    it('returns undefined if search string has string and numbers', () => {
      const searchString = 'hello,98';
      const latLon = getLatLon(searchString);
      expect(latLon).toBeUndefined();
    });

    it('returns undefined if search string doesnt match lat lon', () => {
      const searchString = '123,198';
      const latLon = getLatLon(searchString);
      expect(latLon).toBeUndefined();
    });

    it('returns undefined if search string contains special characters', () => {
      const searchString = '63,1@9';
      const latLon = getLatLon(searchString);
      expect(latLon).toBeUndefined();
    });

    it('return undefined if search string contains more the two numbers', () => {
      const searchString = '63,63,23';
      const latLon = getLatLon(searchString);
      expect(latLon).toBeUndefined();
    });
  });

  describe('searchWeather', () => {
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

    const mockWeatherData2 = {
      name: 'Little Elm',
      main: {
        temp: 91.1,
        feels_like: 94.2,
        temp_min: 43.23,
        temp_max: 95.67,
      },
      weather: [
        {
          main: 'Cloudy',
        },
      ],
    };

    beforeEach(() => {
      // mockWeatherServiceClient.getWeatherByCoordinates = jest
      //   .fn()
      //   .mockResolvedValue(mockWeatherData);
    });
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('if search text contains coordinates, then search weather by lat lon', () => {
      const searchString = '-68.23,123.6786';
      searchWeather(searchString);

      expect(
        mockWeatherServiceClient.getWeatherByCoordinates,
      ).toHaveBeenCalledTimes(1);
    });

    it('return undefined if search by coordinates returns no results', async () => {
      mockWeatherServiceClient.getWeatherByCoordinates = jest
        .fn()
        .mockResolvedValue(undefined);
      const searchString = '-68.23,123.6786';
      const searchResult = await searchWeather(searchString);

      expect(searchResult).toBeUndefined();
    });

    it('return weather data if search by coordinates returns results', async () => {
      mockWeatherServiceClient.getWeatherByCoordinates = jest
        .fn()
        .mockResolvedValue(mockWeatherData);
      const searchString = '-68.23,123.6786';
      const searchResult = await searchWeather(searchString);

      expect(searchResult).toEqual(mockWeatherData);
    });

    it('if search text contains coordinates, then do not search by city or zip', () => {
      const searchString = '-68.23,123.6786';
      searchWeather(searchString);

      expect(
        mockWeatherServiceClient.getWeatherByCoordinates,
      ).toHaveBeenCalledTimes(1);
      expect(mockWeatherServiceClient.getWeatherByCity).toHaveBeenCalledTimes(
        0,
      );
      expect(mockWeatherServiceClient.getWeatherByZip).toHaveBeenCalledTimes(0);
    });

    it('if search text does not contain coordinates, then search by city and zip', () => {
      const searchString = 'Frisco';
      searchWeather(searchString);

      expect(
        mockWeatherServiceClient.getWeatherByCoordinates,
      ).toHaveBeenCalledTimes(0);
      expect(mockWeatherServiceClient.getWeatherByCity).toHaveBeenCalledTimes(
        1,
      );
      expect(mockWeatherServiceClient.getWeatherByZip).toHaveBeenCalledTimes(1);
    });

    it('return undefined if search by city and zip return no results', async () => {
      mockWeatherServiceClient.getWeatherByCity = jest
        .fn()
        .mockResolvedValue(undefined);
      mockWeatherServiceClient.getWeatherByZip = jest
        .fn()
        .mockResolvedValue(undefined);
      const searchString = 'Frisco';
      const searchResult = await searchWeather(searchString);

      expect(searchResult).toBeUndefined();
    });

    it('if search by city returns weather data and search by zip returns weather data, return first in list', async () => {
      mockWeatherServiceClient.getWeatherByCity = jest
        .fn()
        .mockResolvedValue(mockWeatherData);
      mockWeatherServiceClient.getWeatherByZip = jest
        .fn()
        .mockResolvedValue(mockWeatherData2);
      const searchString = 'Frisco';
      const searchResult = await searchWeather(searchString);

      expect(searchResult).toEqual(mockWeatherData);
    });
  });
});
