import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
  });

  export const api_key = "2946dab900d3b8d0b048dfce7c8afb9d";
  