import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Tablo } from "./components/Tablo";
import { SearchForm } from "./components/Search/SearchForm";

export const App = () => {
  const [temp, setTemp] = useState(1000);
  const [feelsLike, setFeelsLike] = useState(1000);
  const [icon, setIcon] = useState('');
  const [inputValue, setInputValue] = useState("Минск");
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsButtonClicked(false)
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonClicked(true)
    
  };

  const getWeatherIcon = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=2946dab900d3b8d0b048dfce7c8afb9d&units=metric`,
    })
      .then(function (response) {
        console.log(response);
        const temp = Math.round(response.data.main.temp);
        setTemp(temp);
        const feelsLike = Math.round(response.data.main.feels_like);
        setFeelsLike(feelsLike)
        const iconAddres = response.data.weather[0].icon;
        setIcon(iconAddres)
      })
      .catch(function (error) {
        console.log(error);
      });
  },[isButtonClicked]);

  return (
    <div className="app">
      <SearchForm submit={handleSubmit} inputValue={inputValue} change={handleChange}/>
      <Tablo getIcon={getWeatherIcon} icon={icon} temperature={temp} feelsLike={feelsLike}/>
    </div>
  );
};
