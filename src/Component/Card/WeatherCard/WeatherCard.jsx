import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CardContent from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import RefreshIcon from "@material-ui/icons/Refresh";

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
        margin: "0 0px 5px 5px",
    },
    deleteButton: {
        zIndex: "1",
    },
}));

const WeatherCard = ({ location, onDelete, move, weatherData, onRefresh }) => {
    const classes = useStyles();
    const description = weatherData.description

    return (
        <>
            <Card className={classes.main}>
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="center"
                >
                    <ButtonBase onClick={move(location, description)} className="fullWidth">
                        <CardContent>
                            {weatherData ? (
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
                            ) : (
                                <CircularProgress />
                            )}
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
                            onClick={() => onRefresh(location)}
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
