import {WeatherDataResponse} from '../types/weatherServiceResponses';
import {WeatherDisplayData} from '../types/weatherDisplayData';

export const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'apiKey';

export const getWeatherByCity = async (
  city: string,
): Promise<WeatherDisplayData | undefined> => {
  let queryParams = new URLSearchParams({
    q: city,
    units: 'imperial',
    appid: apiKey,
  });
  return getWeather(queryParams);
};

export const getWeatherByZip = async (
  zip: string,
): Promise<WeatherDisplayData | undefined> => {
  let queryParams = new URLSearchParams({
    zip: zip,
    units: 'imperial',
    appid: apiKey,
  });
  return getWeather(queryParams);
};

const getWeather = async (
  searchParams: URLSearchParams,
): Promise<WeatherDisplayData | undefined> => {
  try {
    const response = await fetch(`${weatherUrl}?${searchParams.toString()}`);

    const data: WeatherDataResponse = await response.json();
    if (response.status === 200) {
      return {
        locationName: data.name,
        currentTemp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        temp_min: Math.round(data.main.temp_min),
        temp_max: Math.round(data.main.temp_max),
        conditions: data.weather[0].main,
      };
    }
    return undefined;
  } catch (e) {
    console.error(`Error getting weather`, e);
    return undefined;
  }
};
