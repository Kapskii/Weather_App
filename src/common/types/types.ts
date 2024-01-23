export type WeatherType = {
    city: string;
    temp: number;
    feelsLike: number;
    icon: string;
    humidity?: number;
    country?: string;
    weatherDescription?: string;
    maxTemp: number;
    minTemp: number;
  };