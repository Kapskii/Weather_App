import s from "./tablo.module.css";

type PropsType = {
  getIcon: (icon: string) => string | undefined;
  icon: string;
  temperature: number;
  feelsLike: number;
};

export const Tablo = (props: PropsType) => {
  return (
    <div className={s.tabloWrapper}>
      <div className={s.weatherWpapper}>
        <img className={s.weatherIcon} src={props.getIcon(props.icon)} alt="Weather Icon" />
        <h1 className={s.weatherTitle}>{props.temperature !== 1000 ? `${props.temperature}°C` : "Loading..."}</h1>
      </div>
      <p>
        {props.feelsLike !== 1000 ? `Ощущаяется как ${props.feelsLike}°C` : "Loading..."}
      </p>
    </div>
  );
};
