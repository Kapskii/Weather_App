import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import { Tablo } from "./components/Tablo";
import { SearchForm } from "./components/Search/SearchForm";
import { weatherAPI } from "./api/weatherAPI";


export type WeatherType = {
  city: string
  temp: number
  feelsLike: number
  icon: string
}

export const App = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [weather, setWeather] = useState<WeatherType>({} as WeatherType)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsButtonClicked(false)
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonClicked(true)
    localStorage.setItem("cityName", inputValue)
  };

  const getWeatherIcon = (icon: string) => {
    return icon && `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  useEffect(()=>{
    const initialCity = localStorage.getItem("cityName")
    initialCity && setInputValue(initialCity)
    setIsButtonClicked(!!initialCity)
  }, [])

  useEffect(() => {
    if (isButtonClicked && inputValue) {
      weatherAPI.getWeather(inputValue)
        .then(function ({data}) {
          const city = data.name;
          const temp = Math.round(data.main.temp);
          const feelsLike = Math.round(data.main.feels_like);
          const icon = getWeatherIcon(data.weather[0].icon);

          setWeather({city, temp, feelsLike, icon})
          setInputValue("")
        })
        .catch(function (e) {
          alert(e.message)
        });
      // weatherAPI.getHourly(inputValue)
      //   .then(function({data}) {
      //     console.log(data);
      //   }) 
    }
  },[isButtonClicked]);

  return (
    <div className="app">
      <SearchForm submit={handleSubmit} inputValue={inputValue} change={handleChange}/>
      <Tablo weather={weather}/>
    </div>
  );
};
