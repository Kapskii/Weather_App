import s from "./tablo.module.css";
import { useAppSelector } from "../../RTK/store";


export const Tablo = () => {

    const city = useAppSelector((state)=>state.weatherReducer.weather.city);
    const temp = useAppSelector((state)=>state.weatherReducer.weather.temp);
    const country = useAppSelector((state)=>state.weatherReducer.weather.country);
    
  return (
    <div className={s.tabloWrapper}>
      <h1 className={s.weatherCity}>{city}, {country}</h1>
      <div className={s.weatherWpapper}>
        <h2 className={s.weatherTitle}> {temp !== undefined  ? `${temp}°C` : "Загрузка..."}</h2>
      </div>
    </div>
  );
};
