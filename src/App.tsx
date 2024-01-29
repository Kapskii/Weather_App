import React, { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { Tablo } from "./components/Tablo/Tablo";
import { SearchForm } from "./components/Search/SearchForm";
import { WeatherInfo } from "./components/Weather_Info/WeatherInfo";
import { useAppDispatch, useAppSelector } from "./RTK/store";
import { fetchWeather, setCity } from "./RTK/weatherSlice";
import { ErrorToast } from "./components/ErrorToast/ErrorToast";



export const App = () => {
  const city = useAppSelector((state) => state.weatherReducer.city);
  const dispatch = useAppDispatch();


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("cityName", city);
  };

  useEffect(() => {
    const initialCity = localStorage.getItem("cityName");
    initialCity && dispatch(setCity(initialCity));
  }, []);

  useEffect(() => {
    if (city) {
      dispatch(fetchWeather(city))
    }
  }, [city]);

  return (
    <div className="app">
      <div className="searchBlock">
        <SearchForm submit={handleSubmit} />
      </div>
      <div className="weatherBlock">
        <WeatherInfo />
        <Tablo/>
      </div>
      <ErrorToast/>
    </div>
  );
};
