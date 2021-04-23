import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "@material-ui/core";
import WeatherCard from "../Card/WeatherCard/WeatherCard";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoritesStart, fetchWeatherStart } from "../../Redux/actions/actionCreators";
import { useHistory } from "react-router";

const useStyles = makeStyles({
    container: {
        marginTop: "2em",
    },
    mainCard: {
        backgroundColor: "blue",
    },
});

function MainLayout({ weatherLocations, removeLocation, moveItemToFront }) {
   

    // const mainlocation = weatherLocations[0];
    const classes = useStyles();

    const [weatherRefresh, setWeatherRefresh] = useState(false);
    const [locationRefresh, setLocationRefresh] = useState('');
    // const weatherData = useSelector((state) => state.weather.city);
    const weatherDataArr = useSelector((state) => state.favorites.citiesData);

    const dispatch = useDispatch();
    // const onFetchCityWeather = useCallback(
    //     (locationRefresh) => dispatch(fetchWeatherStart(locationRefresh)),
    //     [dispatch]
    // );
    const onFetchCities = useCallback(
        (weatherLocations) => dispatch(fetchFavoritesStart(weatherLocations)),
        [dispatch]
    );

    useEffect(() => {
        if (!locationRefresh) return;

        dispatch(fetchWeatherStart(locationRefresh));
    }, [locationRefresh, weatherRefresh, dispatch]);
    
    useEffect(() => {
        if (weatherLocations.length === 0) return;

        onFetchCities(weatherLocations);
    }, [weatherLocations, onFetchCities]);

    
    const onRefresh = (location) => {
        setWeatherRefresh((prev) => !prev);
        setLocationRefresh(location)
    };

    return (
        <Grid container className={classes.container}>
            <Grid item xs={false} sm={1} />
            <Grid item container sm={10} spacing={3}>
                
                

                {weatherDataArr.map((item, index) => {
                    return (
                        <Grid item key={item.cityKey} xs={8} sm={6}>
                            <WeatherCard
                                location={item.cityKey}
                                onDelete={removeLocation(index)}
                                move={moveItemToFront}
                                onRefresh={onRefresh}
                                weatherData={item.data}
                        
                            />
                        </Grid>
                    );
                })}
            </Grid>
            <Grid item xs={false} sm={1} />
        </Grid>
    );
}
export default MainLayout;
