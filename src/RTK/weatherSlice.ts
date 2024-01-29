import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WeatherType } from "../common/types/types";
import { weatherAPI } from "../api/weatherAPI";
import { getWeatherIcon } from "../common/utils/getWeatherIcon";

type WeatherSliceType = {
  weather: WeatherType;
  city: string;
  error: string;
  loader: boolean;
};

const initialState: WeatherSliceType = {
  weather: {} as WeatherType,
  city: "Минск",
  error: "",
  loader: false,
};

export const fetchWeather = createAsyncThunk(
  "fetchWeather",
  async (city: string, thunkAPI) => {
    const response = await weatherAPI.getWeather(city);
    return response.data;
  }
);

export const weatherSlice = createSlice({
  name: "weatherReducer",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    removeError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      const weatherData: WeatherType = {
        city: action.payload.name,
        temp: Math.round(action.payload.main.temp),
        feelsLike: Math.round(action.payload.main.feels_like),
        icon: getWeatherIcon(action.payload.weather[0].icon),
        humidity: action.payload.main.humidity,
        country: action.payload.sys.country,
        weatherDescription: action.payload.weather[0].description,
        maxTemp: Math.round(action.payload.main.temp_max),
        minTemp: Math.round(action.payload.main.temp_min),
      };
      state.weather = weatherData;
      state.loader = false;
      state.error = "";
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.error = "Неверное значение";
      state.loader = false;
    });
    builder.addCase(fetchWeather.pending, (state, action) => {
      state.loader = true;
      state.error = "";
    });
  },
});

export const { setCity, removeError } = weatherSlice.actions;
