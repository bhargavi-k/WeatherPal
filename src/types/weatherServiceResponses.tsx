export type WeatherDataResponse = {
  coord: Coordinates;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  name: string;
};

export type Coordinates = {
  lat: number;
  lon: number;
};
