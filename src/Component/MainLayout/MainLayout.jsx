import React, {useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import WeatherCard from "../Card/WeatherCard/WeatherCard";
import MainCard from "../Card/MainCard/MainCard";
import { makeStyles } from "@material-ui/core/styles";
import { getWeatherByCityId } from "../../Api/api";

let previousColor = 1;

const useStyles = makeStyles({
    container: {
        marginTop: "2em",
    },
    mainCard: {
        backgroundColor: "blue",
    },
});

function MainLayout({
    weatherLocations,
    removeLocation,
    moveItemToFront,
}) {

    // const [locationId, setLocationId] = useState('');
    
    const mainlocation = weatherLocations[0];
    const classes = useStyles();

    

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
            {/* don't forget add in GRID response layout !!!!!!!!!!!!!!!!!!!!*/}
            <Grid item xs={false} sm={1} />
            <Grid item container sm={10} spacing={3}>
                {/* <Grid item key={mainlocation} xs={12}>
                    <MainCard
                        className={classes.mainCard}
                        location={mainlocation}
                        onDelete={removeLocation(0)}
                    />
                </Grid> */}

                {weatherLocations.map((location, index) => {

                    return (
                        <Grid item key={location} xs={12} sm={6}>
                            <WeatherCard
                                location={location}
                                onDelete={removeLocation(index)}
                                onRefresh={onRefresh(index)}
                                move={moveItemToFront(index)}
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
