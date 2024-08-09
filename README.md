# WeatherPal
WeatherPal is a simple application designed to search for the current weather at a location. You can search for a location by city name, zip code, or using coordinates.

# Getting Started

## Step 1: Setup your api key
The `./scripts/configure.js` script will prompt you to enter your personal ApiKey for OpenWeatherMap in order to call the API.

To setup the application, run the following command from the root of your React Native project and provide your API key:

```bash
./scripts/configure.js
```

## Step 2: Start the Metro Server

You will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Using the Application
On the first app launch, WeatherPal will ask for location permissions in order to get your current location. 

On app start, if location permissions are granted, WeatherPal will display the weather at your current location.

You can search for the weather at a location by entering the city name, zip code, or coordinates (lat,lon) in the search bar and clicking on the search icon.

To clear a search, click on the 'x' icon in the search bar.



