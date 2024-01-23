import { memo } from "react";
import { WeatherType } from "../../App";
import s from "./weatherInfo.module.css";

type PropsType = {
  weather: WeatherType;
};

export const WeatherInfo = memo((props: PropsType) => {
  const { weatherDescription, icon, feelsLike, humidity, minTemp, maxTemp } =
    props.weather;

  return (
    <div className={s.weatherInfo}>
      <p className={s.weatherInfo_description}>
        {weatherDescription}
        <img className={s.weatherInfo_image} src={icon} alt="weather-icon" />
      </p>
      <p className={s.weatherInfo_feelslike}>{feelsLike !== undefined ? `Ощущается как ${feelsLike}°C` : "Загрузка..."}</p>
      <p>Влажность: {humidity}%</p>
      <div className={s.weatherInfoTemp}>
        <span>Min temp: {minTemp}°C</span>
        <span>Max temp: {maxTemp}°C</span>
      </div>
    </div>
  );
});
