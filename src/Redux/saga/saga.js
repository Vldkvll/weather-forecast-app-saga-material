import {
    fetchWeatherSuccess,
    fetchWeatherFailed,
    fetchFavoritesFailed,
    fetchFavoritesSuccess,
} from "../actions/actionCreators";
import { getWeatherByCityName } from "../../Api/api";
import { all, call, put } from "redux-saga/effects";

export function* fetchWeatherByCityNameSaga(action) {
    try {
        const city = action.payload;
        const response = yield call(getWeatherByCityName, action.payload);
        const weatherData = Object.assign(
            {},
            { "data": response },
            { "city": city }
        );
        yield put(fetchWeatherSuccess(weatherData));
    } catch (err) {
        yield put(fetchWeatherFailed(err));
    }
}

export function* fetchFavoritesSaga(action) {
    let results = [];
    const apiCalls = yield action.payload.map((key) => fetchSingleFav(key));
    results = yield all(apiCalls);
    let checkErrors = false;
    for (let i = 0; i < results.length; i++) {
        if (typeof results[i] === "undefined") {
            checkErrors = true;
            yield put(fetchFavoritesFailed(results));
        }
    }
    if (!checkErrors) {
        yield put(fetchFavoritesSuccess(results));
    }
}

function* fetchSingleFav(cityKey) {
    try {
        const weatherData = yield call(getWeatherByCityName, cityKey);
        const transformedData = { cityKey, data: weatherData };
        return transformedData;
    } catch (error) {
        console.error("Error fetching Favorite");
        return undefined;
    }
}
