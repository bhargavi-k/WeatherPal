import {ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React, {PropsWithChildren} from 'react';
import {WeatherDisplayData} from '../types/weatherDisplayData';

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

type SectionProps = PropsWithChildren<{
  title: string;
  testID: string;
}>;

function Section({children, title, testID}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer} testID={testID}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}
interface WeatherDisplayProps {
  weatherDisplayData: WeatherDisplayData | undefined;
}
export const WeatherDisplayView = ({
  weatherDisplayData,
}: WeatherDisplayProps): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      {weatherDisplayData ? (
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
          testID={'weatherDataView'}>
          <Section title="Current Location" testID={'locationSection'}>
            {weatherDisplayData.locationName}
          </Section>
          <Section title="Weather Condition" testID={'weatherConditionSection'}>
            {weatherDisplayData.conditions}
          </Section>
          <Section title="Current Temperature" testID={'currentTempSection'}>
            {`${weatherDisplayData.currentTemp}\u00B0`}
          </Section>
          <Section
            title="Feels Like"
            testID={
              'feelsLikeTempSection'
            }>{`${weatherDisplayData.feels_like}\u00B0`}</Section>
          <Section
            title="High"
            testID={
              'maxTempSection'
            }>{`${weatherDisplayData.temp_max}\u00B0`}</Section>
          <Section
            title="Low"
            testID={
              'minTempSection'
            }>{`${weatherDisplayData.temp_min}\u00B0`}</Section>
        </View>
      ) : null}
    </ScrollView>
  );
};
