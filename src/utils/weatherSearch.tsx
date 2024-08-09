import {WeatherDisplayData} from '../types/weatherDisplayData';
import {chain, isNumber, result} from 'lodash';
import {
  getWeatherByCity,
  getWeatherByCoordinates,
  getWeatherByZip,
} from '../services/weatherServiceClient';
import {Coordinates} from '../types/weatherServiceResponses';

export const getLatLon = (searchText: string): Coordinates | undefined => {
  const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
  const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

  const possibleCoordinates = searchText.split(',');
  if (possibleCoordinates.length === 2) {
    let validLat = regexLat.test(possibleCoordinates[0]);
    let validLon = regexLon.test(possibleCoordinates[1]);
    if (validLat && validLon) {
      return {
        lat: parseFloat(possibleCoordinates[0]),
        lon: parseFloat(possibleCoordinates[1]),
      };
    }
  }
  return undefined;
};

export const searchWeather = async (
  searchText: string,
): Promise<WeatherDisplayData | undefined> => {
  const coordinates = getLatLon(searchText);
  if (coordinates) {
    const weather = await getWeatherByCoordinates(
      coordinates.lat,
      coordinates.lon,
    );
    if (weather) {
      return weather;
    }
  }

  const results = await Promise.all([
    getWeatherByCity(searchText),
    getWeatherByZip(searchText),
  ]);

  if (results.length > 0) {
    return results[0];
  }
  return undefined;
};
