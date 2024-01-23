import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import { Tablo } from "./components/Tablo/Tablo";
import { SearchForm } from "./components/Search/SearchForm";
import { weatherAPI } from "./api/weatherAPI";
import { WeatherInfo } from "./components/Weather_Info/WeatherInfo";

export type WeatherType = {
  city: string;
  temp: number;
  feelsLike: number;
  icon: string;
  humidity?: number;
  country?: string;
  weatherDescription?: string;
  maxTemp: number;
  minTemp: number;
};

export const App = () => {
  const [inputValue, setInputValue] = useState("Минск");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [weather, setWeather] = useState<WeatherType>({} as WeatherType);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsButtonClicked(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonClicked(true);
    localStorage.setItem("cityName", inputValue);
  };

  const getWeatherIcon = (icon: string) => {
    return icon && `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  useEffect(() => {
    const initialCity = localStorage.getItem("cityName");
    initialCity && setInputValue(initialCity);
    setIsButtonClicked(!!initialCity);
  }, []);

  useEffect(() => {
    if (isButtonClicked && inputValue) {
      weatherAPI
        .getWeather(inputValue)
        .then(function ({ data }) {
          console.log(data);

          const city = data.name;
          const temp = Math.round(data.main.temp);
          const feelsLike = Math.round(data.main.feels_like);
          const icon = getWeatherIcon(data.weather[0].icon);
          const humidity = data.main.humidity;
          const country = data.sys.country;
          const weatherDescription = data.weather[0].description;
          const maxTemp = Math.round(data.main.temp_max);
          const minTemp = Math.round(data.main.temp_min);

          setWeather({
            city,
            temp,
            feelsLike,
            icon,
            humidity,
            country,
            weatherDescription,
            maxTemp,
            minTemp,
          });
          setInputValue("");
        })
        .catch(function (e) {
          alert(e.message);
        });
    }
  }, [isButtonClicked]);
  console.log(weather);

  return (
    <div className="app">
      <div className="searchBlock">
        <SearchForm
          submit={handleSubmit}
          inputValue={inputValue}
          change={handleChange}
        />
      </div>
      <div className="weatherBlock">
        <WeatherInfo weather={weather} />
        <Tablo weather={weather} />
      </div>
    </div>
  );
};
