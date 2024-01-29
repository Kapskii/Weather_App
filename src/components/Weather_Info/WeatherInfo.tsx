import { memo } from "react";
import s from "./weatherInfo.module.css";
import { useAppSelector } from "../../RTK/store";


export const WeatherInfo = memo(() => {

    const weatherDescription = useAppSelector((state)=>state.weatherReducer.weather.weatherDescription);
    const icon = useAppSelector((state)=>state.weatherReducer.weather.icon);
    const feelsLike = useAppSelector((state)=>state.weatherReducer.weather.feelsLike);
    const humidity = useAppSelector((state)=>state.weatherReducer.weather.humidity);
    const minTemp = useAppSelector((state)=>state.weatherReducer.weather.minTemp);
    const maxTemp = useAppSelector((state)=>state.weatherReducer.weather.maxTemp);


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
