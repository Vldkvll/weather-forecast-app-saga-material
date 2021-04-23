const LOCAL_STORAGE_KEY = "locations";

export function saveToLocalStorage(locations) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locations));
}

export function readFromLocalStorage() {
    const storedLocations = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedLocations
        ? JSON.parse(storedLocations)
        : ["Kyiv", "Warsaw", "Rome", "London", "Washington", "New York"];
}

export function capitalizeString(string) {
    let words = string.split(" ");
    words = words.map(
        (element) => element.charAt(0).toUpperCase() + element.slice(1)
    );
    return words.join(" ");
}

export function isLetter(str) {
    // debugger
    return str.length >= 2 && str.match(/^[a-zA-Z]*$/i);
}

export function getResponseData(response) {
    // console.log("getResponseData")
    // console.log(response)
 
    const [weather] = response.weather || [];
    return {
        temp:
            response.main && response.main.temp
                ? Math.round(response.main.temp).toString()
                : "",
        description: weather ? weather.description : "",
        icon: weather
            ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
            : "",
        windTransform: response.wind ? response.wind.deg - 90 : null,
        windSpeed: response.wind ? Math.round(response.wind.speed) : 0,
    };
}

export function getCityWeatherDetails(result) {
    return result.list.map((forecast) => ({
        date: forecast.dt_txt.split(" ")[1].split(":")[0] + ":00",
        //max: forecast.main.temp_max,
        //min: forecast.main.temp_min
        temp: forecast.main.temp,
        feels: forecast.main.feels_like,
    }));
}
