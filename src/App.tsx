import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

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

  const getWeatherIconUrl = (icon: string) => {
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
        console.log(iconAddres);
        setIcon(iconAddres)
        
      })
      .catch(function (error) {
        console.log(error);
      });
  },[isButtonClicked && inputValue !== '']);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input value={inputValue} onChange={handleChange} />
        <button type="submit">get temperature</button>
      </form>
      <img src={getWeatherIconUrl(icon)} alt="Weather Icon" />
      <h1>{temp !== 1000 ? `${temp}°C` : "Loading..."}</h1>
      <p>{feelsLike !== 1000 ?`Ощущаяется как ${feelsLike}°C` : 'Loading...' }</p>

    </div>
  );
};
