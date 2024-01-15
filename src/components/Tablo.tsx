import { memo } from "react";
import { WeatherType } from "../App";
import s from "./tablo.module.css";

type PropsType = {
  weather: WeatherType
};

export const Tablo = memo((props: PropsType) => {
    const {city, temp, icon, feelsLike} = props.weather;
  return (
    <div className={s.tabloWrapper}>
      <h1 className={s.weatherCity}>{city}</h1>
      <div className={s.weatherWpapper}>
        <img className={s.weatherIcon} src={icon} alt="Weather Icon" />
        <h2 className={s.weatherTitle}> {temp !== undefined  ? `${temp}°C` : "Loading..."}</h2>
      </div>
      <p className={s.weatherFeelsLike}>{feelsLike !== undefined ? `Feels like ${feelsLike}°C` : "Loading..."} </p>
    </div>
  );
});
