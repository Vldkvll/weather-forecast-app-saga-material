import { combineReducers } from "redux";
import WeatherEvery3hourReducer from "./WeatherEvery3HourReducer";
import favouriteWeatherReducer from "./FavouriteWeatherReducer";

const rootReducer = combineReducers({
    favorites: favouriteWeatherReducer,
    forecast: WeatherEvery3hourReducer,
});

export default rootReducer;
