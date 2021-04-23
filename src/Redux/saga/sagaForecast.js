import {
  fetchWeatherEvery3HoursSuccess,
  fetchWeatherEvery3HoursFailed,
} from "../actions/actionCreators";
import { getWeatherForecastByCityName} from "../../Api/api";
import { call, put } from "redux-saga/effects";
import { getCityWeatherDetails,  } from "../../Utils/utils";

export function* fetchWeatherForecastByCityNameSaga(action) {
  try {
    const response = yield call(getWeatherForecastByCityName, action.payload);
    const weatherData = yield call(getCityWeatherDetails, response);
    yield put(fetchWeatherEvery3HoursSuccess(weatherData));
  } catch (err) {
    yield put(fetchWeatherEvery3HoursFailed(err));
  }
}
