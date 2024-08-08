import {getWeatherByCity} from '../../../src/services/weatherServiceClient';

describe('weatherServiceClient', () => {
  let fetchMock = jest.fn();
  const mockWeatherData = {
    name: 'City',
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
  });
});
