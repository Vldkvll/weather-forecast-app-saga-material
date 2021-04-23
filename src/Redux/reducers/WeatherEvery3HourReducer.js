import {
    FETCH_WEATHER_EVERY3HOURS_SUCCESS,
    FETCH_WEATHER_EVERY3HOURS_START,
    FETCH_WEATHER_EVERY3HOURS_FAIL,
  } from "../actions/actionTypes";
  
  const initialState = {
    cityName: "",
    weatherData: null,
    error: "",
    units: ""
  };
  
  const weatherEvery3hourReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_WEATHER_EVERY3HOURS_START:
        return {
          ...state,
          cityName: action.payload.cityName,
          units: action.payload.units
        };
  
      case FETCH_WEATHER_EVERY3HOURS_SUCCESS:
        return {
          ...state,
          weatherData: action.payload,
        };
  
      case FETCH_WEATHER_EVERY3HOURS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default weatherEvery3hourReducer;
  