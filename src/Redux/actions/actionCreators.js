import * as types from "./actionTypes";

export function fetchWeatherStart(payload) {
    const action = {
        type: types.FETCH_WEATHER_START,
        payload,
    };
    return action;
}

export function fetchWeatherSuccess(payload) {
    const action = {
        type: types.FETCH_WEATHER_SUCCESS,
        payload,
    };
    return action;
}

export function fetchWeatherFailed(error) {
    const action = {
        type: types.FETCH_WEATHER_FAIL,
        payload: error,
    };
    return action;
}

export function fetchWeatherEveryHoursStart(payload) {
    console.log(payload)
    const action = {
        type: types.FETCH_WEATHER_EVERY3HOURS_START,
        payload,
    };
    return action;
}

export function fetchWeatherEvery3HoursSuccess(payload) {
    const action = {
        type: types.FETCH_WEATHER_EVERY3HOURS_SUCCESS,
        payload,
    };
    return action;
}

export function fetchWeatherEvery3HoursFailed(error) {
    const action = {
        type: types.FETCH_WEATHER_EVERY3HOURS_FAIL,
        payload: error,
    };
    return action;
}

export const fetchFavoritesStart = (payload) => {
    const action = {
        type: types.FETCH_FAVORITES_START,
        payload,
    };
    return action;
};

export const fetchFavoritesSuccess = (payload) => {
    const action = {
        type: types.FETCH_FAVORITES_SUCCESS,
        payload,
    };
    return action;
};
export const fetchFavoritesFailed = (error) => {
    const action = {
        type: types.FETCH_FAVORITES_FAIL,
        payload: error,
    };
    return action;
};
