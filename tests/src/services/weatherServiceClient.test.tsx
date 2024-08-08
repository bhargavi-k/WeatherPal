import {
  getWeatherByCity,
  getWeatherByZip,
} from '../../../src/services/weatherServiceClient';
import {WeatherDisplayData} from '../../../src/types/weatherDisplayData';

describe('weatherServiceClient', () => {
  let fetchMock = jest.fn();
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
    global.fetch = fetchMock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  describe('getWeatherByCity', () => {
    it('calls fetch with correct url and query params', () => {
      fetchMock.mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockWeatherData),
        } as Response),
      );
      const cityName = 'Little Elm';
      getWeatherByCity(cityName);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/weather?q=Little+Elm&units=imperial&appid=apiKey',
      );
    });
    it('returns weather data if service returns with success', async () => {
      fetchMock.mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockWeatherData),
        } as Response),
      );
      const cityName = 'Little Elm';
      const weatherData = await getWeatherByCity(cityName);

      const expectedWeatherData: WeatherDisplayData = {
        locationName: mockWeatherData.name,
        currentTemp: 100,
        feels_like: 103,
        temp_min: 78,
        temp_max: 106,
        conditions: 'Cloudy',
      };
      expect(weatherData).toEqual(expectedWeatherData);
    });
    it('returns undefined if service returns with unsuccessful status', async () => {
      fetchMock.mockImplementation(() =>
        Promise.resolve({
          ok: false,
          status: 429,
          json: () => Promise.resolve(mockWeatherData),
        } as Response),
      );
      const cityName = 'Little Elm';
      const weatherData = await getWeatherByCity(cityName);

      expect(weatherData).toBeUndefined();
    });
    it('returns undefined if service does not resolve', async () => {
      fetchMock.mockImplementation(() => Promise.reject('service is down'));
      const cityName = 'Little Elm';
      const weatherData = await getWeatherByCity(cityName);

      expect(weatherData).toBeUndefined();
    });
  });

  describe('getWeatherByZip', () => {
    it('calls fetch with correct url and query params', () => {
      fetchMock.mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockWeatherData),
        } as Response),
      );
      const zip = '75068';
      getWeatherByZip(zip);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(
        'https://api.openweathermap.org/data/2.5/weather?zip=75068&units=imperial&appid=apiKey',
      );
    });
    it('returns weather data if service returns with success', async () => {
      fetchMock.mockImplementation(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockWeatherData),
        } as Response),
      );
      const zip = '75068';
      const weatherData = await getWeatherByZip(zip);

      const expectedWeatherData: WeatherDisplayData = {
        locationName: mockWeatherData.name,
        currentTemp: 100,
        feels_like: 103,
        temp_min: 78,
        temp_max: 106,
        conditions: 'Cloudy',
      };
      expect(weatherData).toEqual(expectedWeatherData);
    });
    it('returns undefined if service returns with unsuccessful status', async () => {
      fetchMock.mockImplementation(() =>
        Promise.resolve({
          ok: false,
          status: 429,
          json: () => Promise.resolve(mockWeatherData),
        } as Response),
      );
      const zip = '75068';
      const weatherData = await getWeatherByZip(zip);

      expect(weatherData).toBeUndefined();
    });
    it('returns undefined if service does not resolve', async () => {
      fetchMock.mockImplementation(() => Promise.reject('service is down'));
      const zip = '75068';
      const weatherData = await getWeatherByZip(zip);

      expect(weatherData).toBeUndefined();
    });
  });
});
