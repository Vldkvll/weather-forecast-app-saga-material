import { combineReducers } from "redux";
import WeatherReducer from "./WeatherReducer";
import WeatherEvery3hourReducer from "./WeatherEvery3HourReducer";
import favouriteWeatherReducer from "./FavouriteWeatherReducer";

const rootReducer = combineReducers({
    weather: WeatherReducer,
    favorites: favouriteWeatherReducer,
    forecast: WeatherEvery3hourReducer,
});

export default rootReducer;
