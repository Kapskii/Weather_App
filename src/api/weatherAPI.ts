import { api_key, instance } from "../common/constants/instance"

export const weatherAPI = {
    getWeather(city: string) {
        return instance.get(`weather?q=${city}&lang=en&appid=${api_key}&units=metric`)
    },
    getHourly(city: string) {
        return instance.get(`forecast?q=${city}&lang=en&appid=${api_key}&units=metric`)
    }
}