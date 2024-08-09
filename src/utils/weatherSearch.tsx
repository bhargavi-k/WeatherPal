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
