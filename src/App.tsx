import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import { Tablo } from "./components/Tablo";
import { SearchForm } from "./components/Search/SearchForm";
import { weatherAPI } from "./api/weatherAPI";
import { HourlyWeather } from "./components/HourlyWeather";

export type WeatherType = {
  city: string;
  temp: number;
  feelsLike: number;
  icon: string;
};

export const App = () => {
  const [inputValue, setInputValue] = useState("Минск");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [weather, setWeather] = useState<WeatherType>({} as WeatherType);
  const [tempHour, setTempHour] = useState<any[]>([]);

  // console.log(tempHour);

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
          // console.log(data);
          
          const city = data.name;
          const temp = Math.round(data.main.temp);
          const feelsLike = Math.round(data.main.feels_like);
          const icon = getWeatherIcon(data.weather[0].icon);

          setWeather({ city, temp, feelsLike, icon });
          setInputValue("");
        })

        .catch(function (e) {
          alert(e.message);
        });
      weatherAPI.getHourly(inputValue).then(function ({ data }) {
        // console.log(data.list);
        setTempHour(data.list);
      });
    }
  }, [isButtonClicked]);

  return (
    <div className="app">
      <div className="searchWrapper">
        <SearchForm submit={handleSubmit} inputValue={inputValue} change={handleChange}/>
      </div>
      <div className="weatherBlock">
      <div className="weatherWrapper">
        <Tablo weather={weather} />
      </div>
      {/* <div className="hourlyWeaterWrapper">
        {tempHour.map((el, index) => (
          <HourlyWeather key={index} hWeather={el.main.temp} date={el.dt_txt} />
        ))}
      </div> */}
      </div>
    </div>
  );
};
