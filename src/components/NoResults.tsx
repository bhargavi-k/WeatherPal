import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    flexGrow: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: 'white', fontSize: 48},
});

export const NoResults = (): JSX.Element => {
  return (
    <View style={styles.container} testID={'noResults'}>
      <Icon size={48} source="alert-circle" color="white" testID="alert-icon" />
      <Text style={styles.text}>No Results</Text>
    </View>
  );
};
