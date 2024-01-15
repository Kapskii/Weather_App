import s from './HourlyWeather.module.css'
import dayjs from 'dayjs'

type PropsType = {
    hWeather: number
    date: string
}


export const HourlyWeather = (props: PropsType) => {
    return(
        <div className={s.wrapper}>
            <span className={s.hourlyDate}>{dayjs(props.date).format('hh:mm A')}</span>
            <p>{Math.round(props.hWeather)}°C</p>
        </div>
    )
}