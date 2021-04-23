import {
    FETCH_FAVORITES_START,
    FETCH_FAVORITES_SUCCESS,
    FETCH_FAVORITES_FAIL,
    FETCH_WEATHER_SUCCESS,
    REMOVE_ERROR_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
    citiesArr: [],
    citiesData: [],
    error: "",
};

const favouriteWeatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FAVORITES_START:
            return {
                ...state,
                citiesArr: [...action.payload],
            };

        case FETCH_FAVORITES_SUCCESS:
            return {
                ...state,
                citiesData: [...action.payload],
            };

        case FETCH_FAVORITES_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case REMOVE_ERROR_SUCCESS:
            return {
                ...state,
                error: "",
            };

        case FETCH_WEATHER_SUCCESS:
            const newRefreshReduce = [...state.citiesData].reduce(
                (acc, element, i) => {
                    if (element["cityKey"] === action.payload.city) {
                        element.data = action.payload.data;
                    }
                    acc = [...acc, element];
                    return acc;
                },
                []
            );
            return {
                ...state,
                citiesData: [...newRefreshReduce],
            };

        default:
            return state;
    }
};

export default favouriteWeatherReducer;
