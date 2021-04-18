import axios from "axios";

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
            const [weather] = response.weather || [];
            const temp =
                response.main && response.main.temp
                    ? Math.round(response.main.temp).toString()
                    : "";
            const description = weather ? weather.description : "";
            const icon = weather
                ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
                : "";
            const windTransform = response.wind ? response.wind.deg - 90 : null;
            const windSpeed = response.wind
                ? Math.round(response.wind.speed)
                : 0;

            return {
                success: true,
                data: { temp, description, icon, windTransform, windSpeed },
            };
        }
        return { success: false, error: result.statusText };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


export const getWeatherByCityId = async (cityId) => {
    return await instance.get("/forecast/", {
        params: {
            id: cityId,
            appid: process.env.REACT_APP_WEATHER_API_KEY,
            units: "metric",
        },
    })
      .then((response) =>
       response.data
       
       )
      .catch((error) => {
        return { success: false, error: error.message };
      });
    }