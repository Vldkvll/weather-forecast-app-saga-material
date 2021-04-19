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
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from "@material-ui/icons/Refresh";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    main: {
        flexGrow: "1",
    },
    locationText: {
        textAlign: "center",
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
    },
    grid: {
        // padding: theme.spacing(1),
        margin: "0 0px 5px 5px",
    },
    deleteButton: {
        zIndex: "1",
    },
}));

const isSuccess = (onDelete) => (status) => {
    // debugger
    if (!status) {
        alert(`This City ${onDelete} does not exist.`);
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
            // console.log("weatherRefresh");
            // console.log("location");
            // console.log(location);
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
        setWeatherRefresh((prev) => !prev);
        // console.log("onRefresh");
        // console.log(onRefresh);
    };

    // setLocationId(weatherData.location)

    return (
        <>
            <Card className={classes.main}>
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >
                    <ButtonBase onClick={move(location)} className="fullWidth">
                        <CardContent>
                            {weatherData.temp ? (
                                <>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Grid>
                                            <div>
                                                <Typography
                                                    variant="h4"
                                                    className={
                                                        classes.locationText
                                                    }
                                                >
                                                    {location}
                                                </Typography>
                                            </div>
                                        </Grid>

                                        <Grid></Grid>

                                        <WeatherDetails data={weatherData} />
                                    </Grid>
                                </>
                            )
                        : <CircularProgress />}
                        </CardContent>
                    </ButtonBase>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    item
                    xs={12}
                    className={classes.grid}
                >
                    <Grid>
                        <IconButton
                            onClick={onDelete}
                            className={classes.deleteButton}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                    <Grid>
                        <IconButton
                            onClick={onRefresh}
                            className={classes.deleteButton}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default WeatherCard;
