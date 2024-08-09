import {render, screen} from '@testing-library/react-native';
import {WeatherDisplayView} from '../../../src/components/WeatherDisplayView';

describe('WeatherDisplayView', () => {
  const weatherData = {
    locationName: 'Little Elm',
    currentTemp: 100,
    feels_like: 103,
    temp_min: 78,
    temp_max: 106,
    conditions: 'Cloudy',
  };

  it('shows NoResults view if weather data is undefined', async () => {
    render(<WeatherDisplayView weatherDisplayData={undefined} />);
    const noResultsView = await screen.findByTestId('noResults');
    expect(noResultsView).toBeOnTheScreen();
  });

  it('shows view if weather data is passed in', async () => {
    render(<WeatherDisplayView weatherDisplayData={weatherData} />);
    const weatherDataView = await screen.findByTestId('weatherDataView');
    expect(weatherDataView).toBeOnTheScreen();
  });

  it('shows correct location name', async () => {
    render(<WeatherDisplayView weatherDisplayData={weatherData} />);
    const section = await screen.findByTestId('locationSection');

    expect(section).toBeOnTheScreen();
    expect(section).toHaveTextContent('Current Location', {exact: false});
    expect(section).toHaveTextContent(weatherData.locationName, {exact: false});
  });

  it('shows correct weather condition', async () => {
    render(<WeatherDisplayView weatherDisplayData={weatherData} />);
    const section = await screen.findByTestId('weatherConditionSection');
    expect(section).toBeOnTheScreen();
    expect(section).toHaveTextContent('Weather Condition', {exact: false});
    expect(section).toHaveTextContent(weatherData.conditions, {exact: false});
  });

  it('shows correct current temperature', async () => {
    render(<WeatherDisplayView weatherDisplayData={weatherData} />);
    const section = await screen.findByTestId('currentTempSection');
    expect(section).toBeOnTheScreen();
    expect(section).toHaveTextContent('Current Temperature', {exact: false});
    expect(section).toHaveTextContent('100\u00B0', {exact: false});
  });

  it('shows correct feels like temperature', async () => {
    render(<WeatherDisplayView weatherDisplayData={weatherData} />);
    const section = await screen.findByTestId('feelsLikeTempSection');
    expect(section).toBeOnTheScreen();
    expect(section).toHaveTextContent('Feels Like', {exact: false});
    expect(section).toHaveTextContent('103\u00B0', {exact: false});
  });

  it('shows correct max temperature', async () => {
    render(<WeatherDisplayView weatherDisplayData={weatherData} />);
    const section = await screen.findByTestId('maxTempSection');
    expect(section).toBeOnTheScreen();
    expect(section).toHaveTextContent('High', {exact: false});
    expect(section).toHaveTextContent('106\u00B0', {exact: false});
  });

  it('shows correct min temperature', async () => {
    render(<WeatherDisplayView weatherDisplayData={weatherData} />);
    const section = await screen.findByTestId('minTempSection');
    expect(section).toBeOnTheScreen();
    expect(section).toHaveTextContent('Low', {exact: false});
    expect(section).toHaveTextContent('78\u00B0', {exact: false});
  });
});
