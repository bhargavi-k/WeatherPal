import Geolocation from 'react-native-geolocation-service';
import React from 'react';
import {getCurrentCoordinates} from '../../../src/utils/geolocation';

jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn(),
}));
describe('geolocation', () => {
  it('resolved with coordinates from geolocation', async () => {
    Geolocation.getCurrentPosition = jest.fn().mockImplementation(callback => {
      callback({coords: {latitude: 33.1626, longitude: -96.9375}});
    });
    const coordinates = await getCurrentCoordinates();
    expect(coordinates).toEqual({lat: 33.1626, lon: -96.9375});
  });
});
