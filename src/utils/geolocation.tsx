import Geolocation from 'react-native-geolocation-service';
import {Coordinates} from '../types/weatherServiceResponses';

export const getCurrentCoordinates = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      error => {
        reject(error);
        console.log(error);
      },
    );
  });
};
