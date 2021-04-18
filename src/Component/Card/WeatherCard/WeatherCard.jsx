import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CardContent from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { getWeatherByCityName } from "../../../Api/api";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles({
    main: {
        flexGrow: "1",
    },
    locationText: {
        textAlign: "center",
    },
    deleteButton: {
        zIndex: "1",
    },
});

const isSuccess = (onDelete) => (status) => {
    // debugger
    if (!status) {
        alert("This City does not exist.");
    }
    return onDelete;
};

const WeatherCard = ({ location, onDelete, move }) => {
    const classes = useStyles();

    const [weatherData, setWeatherData] = useState({});
    const [weatherRefresh, setWeatherRefresh] = useState(false);
  

    useEffect(() => {
        const getWeather = async () => {
            const result = await getWeatherByCityName(location);
            // debugger
            if (result.success) {
                // console.dir("(result.data");
                setWeatherData(result.data);
            } else {
                isSuccess(onDelete)(false);
            }
        };
        getWeather();
    }, [location, onDelete, weatherRefresh]);

    const onRefresh = () => {
        setWeatherRefresh((prev)=> !prev)
    }

    
    return (
        <>
            <Card className={classes.main}>
                <Grid container spacing={12}>
                    <Grid item>
                        <ButtonBase onClick={move} className="fullWidth">
                            <CardContent>
                                {weatherData.temp && (
                                    <>
                                        <Typography
                                            variant="h4"
                                            className={classes.locationText}
                                        >
                                            {location}
                                        </Typography>
                                        <WeatherDetails data={weatherData} />
                                    </>
                                )}
                            </CardContent>
                        </ButtonBase>
                    </Grid>
                    <Grid
                        container
                        spacing={12}
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >
                        <Grid item>
                            <IconButton
                                onClick={onDelete}
                                className={classes.deleteButton}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <IconButton
                                onClick={onRefresh}
                                className={classes.deleteButton}
                            >
                                <RefreshIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default WeatherCard;
