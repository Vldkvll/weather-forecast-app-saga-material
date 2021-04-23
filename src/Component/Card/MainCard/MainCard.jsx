import React, { useCallback, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import { CSSTransition } from "react-transition-group";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import { useData } from "../../../DataContext/DataContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherEveryHoursStart } from "../../../Redux/actions/actionCreators";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: "5px",
        backdropFilter: "blur(100px)",
    },

    divider: {
        margin: ".5rem 0",
    },
}));

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const MainCard = () => {
    const classes = useStyles();
    const { dataS, setValues } = useData();
    const data = useSelector((state) => state.forecast.weatherData);
    const location = dataS.location;
    const units = dataS.units;
    const description = dataS.description;
    const dispatch = useDispatch();
    const onFetchCityDetails = useCallback(
        (params) => dispatch(fetchWeatherEveryHoursStart(params)),
        [dispatch]
    );

    useEffect(() => {
        if (!location) return;
        const cityName = location;
        onFetchCityDetails({ cityName, units });
    }, [location, onFetchCityDetails, units]);
    const theme = "";

    return (
        <>
            {data === null ? (
                <CircularProgress />
            ) : (
                <CSSTransition
                    appear
                    in={data[0]}
                    timeout={250}
                    classNames="fade"
                    unmountOnExit
                >
                    <Box className={classes.root} m={2} p={1}>
                        <Typography variant="h3">
                            {location}, {days[new Date().getDay()]}
                        </Typography>
                        <Typography variant="subtitle2">
                            {description}
                        </Typography>
                        <Divider className={classes.divider} />
                        <Typography variant="h4">
                            {units === "metric" ? (
                                <RiCelsiusFill />
                            ) : (
                                <RiFahrenheitFill />
                            )}{" "}
                        </Typography>
                        <FormControlLabel
                            onChange={() => {
                                units === "metric"
                                    ? setValues((dataS.units = "imperial"))
                                    : setValues((dataS.units = "metric"));
                            }}
                            checked={units === "metric"}
                            control={<Switch color="primary" />}
                        ></FormControlLabel>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                                data={data}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorUv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor={
                                                theme === "dark"
                                                    ? "#21D2DE"
                                                    : "#F85F0F"
                                            }
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor={
                                                theme === "dark"
                                                    ? "#21D2DE"
                                                    : "#F85F0F"
                                            }
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                    <linearGradient
                                        id="colorPv"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor={
                                                theme === "dark"
                                                    ? "#DE7A2A"
                                                    : "#9607F8"
                                            }
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor={
                                                theme === "dark"
                                                    ? "#DE7A2A"
                                                    : "#9607F8"
                                            }
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <Legend />
                                <XAxis
                                    stroke={
                                        theme === "dark"
                                            ? "#fff"
                                            : "rgba(0,0,0,7)"
                                    }
                                    dataKey="date"
                                />
                                <YAxis
                                    stroke={
                                        theme === "dark"
                                            ? "#fff"
                                            : "rgba(0,0,0,7)"
                                    }
                                />
                                <Tooltip />
                                <Line
                                    type="montoone"
                                    dataKey="temp"
                                    stroke={
                                        theme === "dark" ? "#21D2DE" : "#F85F0F"
                                    }
                                    fillOpacity={1}
                                    fill="url(#colorUv)"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="feels"
                                    stroke={
                                        theme === "dark" ? "#DE7A2A" : "#9607F8"
                                    }
                                    fillOpacity={1}
                                    fill="url(#colorPv)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </CSSTransition>
            )}
        </>
    );
};

export default MainCard;
