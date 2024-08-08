import {PERMISSIONS, request} from 'react-native-permissions';
import {PermissionStatus, Platform} from 'react-native';

export const requestLocationPermissions = (): PermissionStatus => {
  return request(
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  );
};
