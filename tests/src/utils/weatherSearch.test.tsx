import {getLatLon} from '../../../src/utils/weatherSearch';

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
});
