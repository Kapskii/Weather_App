import { memo } from "react";
import { WeatherType } from "../../App";
import s from "./tablo.module.css";

type PropsType = {
  weather: WeatherType
};

export const Tablo = memo((props: PropsType) => {
    const {city, temp, country} = props.weather;
  return (
    <div className={s.tabloWrapper}>
      <h1 className={s.weatherCity}>{city}, {country}</h1>
      <div className={s.weatherWpapper}>
        <h2 className={s.weatherTitle}> {temp !== undefined  ? `${temp}°C` : "Загрузка..."}</h2>
      </div>
    </div>
  );
});
