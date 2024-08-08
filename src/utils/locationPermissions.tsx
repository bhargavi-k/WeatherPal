import {PERMISSIONS, request} from 'react-native-permissions';
import {PermissionStatus, Platform} from 'react-native';

export const requestLocationPermissions =
  async (): Promise<PermissionStatus> => {
    return await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
  };
