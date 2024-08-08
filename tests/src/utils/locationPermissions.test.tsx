import {requestLocationPermissions} from '../../../src/utils/locationPermissions';
import {PERMISSIONS, request} from 'react-native-permissions';
import {Platform} from 'react-native';

describe('location permissions', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('requestLocationPermissions', () => {
    it('requests LOCATION_WHEN_IN_USE for iOS', () => {
      requestLocationPermissions();
      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );
    });

    it('requests ACCESS_FINE_LOCATION for Android', () => {
      jest.mock('react-native/Libraries/Utilities/Platform', () => ({
        OS: 'android',
      }));
      requestLocationPermissions();
      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    });
  });
});
