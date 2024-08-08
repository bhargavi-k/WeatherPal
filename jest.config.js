module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['./jest-setup.ts'],
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(@react-native-community|react-navigation|@react-navigation/.*)',
  ],
};
