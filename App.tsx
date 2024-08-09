import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Searchbar} from 'react-native-paper';
import {requestLocationPermissions} from './src/utils/locationPermissions';
import {PermissionStatus, RESULTS} from 'react-native-permissions';
import {Coordinates} from './src/types/weatherServiceResponses';
import {getWeatherByCoordinates} from './src/services/weatherServiceClient';
import {WeatherDisplayData} from './src/types/weatherDisplayData';
import {getCurrentCoordinates} from './src/utils/geolocation';
import {searchWeather} from './src/utils/weatherSearch';
import {WeatherDisplayView} from './src/components/WeatherDisplayView';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [, setLocationPermissionStatus] = useState<PermissionStatus>();
  const [, setCurrentCoordinates] = useState<Coordinates>();
  const [weatherForCurrentLocation, setWeatherForCurrentLocation] =
    useState<WeatherDisplayData>();
  const [searchText, setSearchText] = useState<string>();
  const [searchWeatherData, setSearchWeatherData] =
    useState<WeatherDisplayData>();

  useEffect(() => {
    requestLocationPermissions().then(status => {
      setLocationPermissionStatus(status);
      if (status === RESULTS.GRANTED) {
        getCurrentCoordinates().then(coords => {
          setCurrentCoordinates(coords);
          getWeatherByCoordinates(coords.lat, coords.lon).then(data =>
            setWeatherForCurrentLocation(data),
          );
        });
      }
    });
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onSearch = useCallback(() => {
    if (searchText) {
      searchWeather(searchText).then(weather => setSearchWeatherData(weather));
    }
  }, [searchText]);

  const clearSearch = () => {
    setSearchText(undefined);
    setSearchWeatherData(undefined);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Searchbar
        placeholder="Search by city name, zip code, or coordinates"
        testID="searchBar"
        value={searchText}
        onChangeText={setSearchText}
        onIconPress={onSearch}
        onClearIconPress={clearSearch}
      />
      <WeatherDisplayView
        weatherDisplayData={
          searchWeatherData ? searchWeatherData : weatherForCurrentLocation
        }
      />
    </SafeAreaView>
  );
}

export default App;
