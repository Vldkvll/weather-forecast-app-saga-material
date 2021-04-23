import { all, takeLatest } from "@redux-saga/core/effects";
import { FETCH_FAVORITES_START, FETCH_WEATHER_EVERY3HOURS_START, FETCH_WEATHER_START } from "../actions/actionTypes";
import { fetchFavoritesSaga, fetchWeatherByCityNameSaga } from "./saga";
import { fetchWeatherForecastByCityNameSaga } from "./sagaForecast";

export function* watchFavorites() {
    yield all([
        yield takeLatest(FETCH_FAVORITES_START, fetchFavoritesSaga)
    ]);
  }

export function* watcherSagasCities() {
    yield all([
      yield takeLatest(FETCH_WEATHER_START, fetchWeatherByCityNameSaga),
    ]);
  }
  
export function* watcherSagasForecast() {
    yield all([
      yield takeLatest(FETCH_WEATHER_EVERY3HOURS_START, fetchWeatherForecastByCityNameSaga)
    ]);
  }
  