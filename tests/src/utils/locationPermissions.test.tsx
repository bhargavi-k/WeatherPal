import {requestLocationPermissions} from '../../../src/utils/locationPermissions';
import {PERMISSIONS, request} from 'react-native-permissions';

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

    it('return permission status for iOS', async () => {
      request.mockResolvedValue('granted');

      const permissionStatus = await requestLocationPermissions();
      expect(permissionStatus).toEqual('granted');
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

    it('return permission status for Android', async () => {
      jest.mock('react-native/Libraries/Utilities/Platform', () => ({
        OS: 'android',
      }));
      request.mockResolvedValue('denied');

      const permissionStatus = await requestLocationPermissions();
      expect(permissionStatus).toEqual('denied');
    });
  });
});
