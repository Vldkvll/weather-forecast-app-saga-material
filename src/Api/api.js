import axios from "axios";
import { getResponseData } from "../Utils/utils";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const getWeatherByCityName = async (cityName) => {
    try {
        const result = await instance.get("/data/2.5/weather", {
            params: {
                q: cityName,
                appid: process.env.REACT_APP_WEATHER_API_KEY,
                units: "metric",
            },
        });
        if (result.status === 200) {
            const response = result.data;
            const {
                temp,
                description,
                icon,
                windTransform,
                windSpeed,
            } = getResponseData(response);
            return {
                temp,
                description,
                icon,
                windTransform,
                windSpeed,
            };
        }
        debugger
        return { error: result.statusText };
    } catch (error) {
        return { error};
    }
};

export const getWeatherForecastByCityName = async ({cityName, units}) => {
    return await instance
        .get("/data/2.5/forecast/", {
            params: {
                q: cityName,
                appid: process.env.REACT_APP_WEATHER_API_KEY,
                units,
                cnt: 9,
            },
            // headers: {
            //     // 'Access-Control-Allow-Origin': '*',
            //     // 'Content-Type': 'application/json',
            //     // mode: 'no-cors',
            //   }
        })
        .then((response) => response.data)
        .catch((error) => {
            return {  error: error.message };
        });
};
