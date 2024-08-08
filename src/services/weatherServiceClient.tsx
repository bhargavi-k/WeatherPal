export const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'apiKey';

export const getWeatherByCity = async (
  city: string,
): Promise<any | undefined> => {
  let queryParams = new URLSearchParams({
    q: city,
    units: 'imperial',
    appid: apiKey,
  });
  await fetch(`${weatherUrl}?${queryParams.toString()}`);
};
