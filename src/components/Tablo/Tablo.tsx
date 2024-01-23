import { memo } from "react";
import s from "./tablo.module.css";
import { WeatherType } from "../../common/types/types";


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
