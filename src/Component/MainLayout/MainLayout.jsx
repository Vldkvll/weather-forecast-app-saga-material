import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import WeatherCard from "../Card/WeatherCard/WeatherCard";
import MainCard from "../Card/MainCard/MainCard";
import { makeStyles } from "@material-ui/core/styles";

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

    useEffect(() => {}, []);

    // useEffect(() => {
    //     const getWeather = async () => {
    //         const result = await getWeatherByCityId(locationId);
    //         // debugger
    //         if (result.success) {
    //             // console.dir("(result.data");
    //             setWeatherData(result.data);
    //         } else {
    //             isSuccess(onDelete)(false);
    //         }
    //     };
    //     getWeather();
    // }, [weatherRefresh]);


    return (
        <Grid container className={classes.container}>
            <Grid item xs={false} sm={1} />
            <Grid item container sm={10} spacing={3}>
                
                

                {weatherLocations.map((location, index) => {
                    return (
                        <Grid item key={location} xs={8} sm={6}>
                            <WeatherCard
                                location={location}
                                onDelete={removeLocation(index)}
                                move={moveItemToFront}
                        
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
