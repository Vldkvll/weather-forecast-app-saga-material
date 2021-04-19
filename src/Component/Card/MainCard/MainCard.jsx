import React from "react";
import { Link, useLocation } from "react-router-dom";
import Brightness4SharpIcon from "@material-ui/icons/Brightness4Sharp";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
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
    linearGradient,
    defs,
} from "recharts";

const useStyles = makeStyles((theme) => ({
    root: {
        // border:
        // theme.palette.type === "dark"
        //     ? "1px solid white"
        //     : "1px solid rgba(0,0,0,.7)",
        borderRadius: "5px",
        backdropFilter: "blur(100px)",
    },

    divider: {
        margin: ".5rem 0",
    },
}));

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

//&#8457 fahrenheit
//&$8451 celsius

const MainCard = ({
    weatherObj,
    theme,
    location,
    data,
    units,
    setUnits,
    isOpen,
}) => {
    const classes = useStyles();
    console.log("MainCard");
    console.log(data);

    return (
        <CSSTransition
            appear
            in={data[0]}
            timeout={250}
            classNames="fade"
            unmountOnExit
        >
            <Box className={classes.root} m={2} p={1}>
            {/* <Link to="/">
                <Brightness4SharpIcon />
            </Link> */}
                <Typography variant="h3">
                    {location}, {days[new Date().getDay()]}
                </Typography>
                <Typography variant="subtitle2">
                    {weatherObj && weatherObj.list[0].weather[0].description}
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
                        isOpen(false);
                        units === "metric"
                            ? setUnits("imperial")
                            : setUnits("metric");
                    }}
                    checked={units === "metric"}
                    control={<Switch color="primary" />}
                ></FormControlLabel>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                                        theme === "dark" ? "#21D2DE" : "#F85F0F"
                                    }
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={
                                        theme === "dark" ? "#21D2DE" : "#F85F0F"
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
                                        theme === "dark" ? "#DE7A2A" : "#9607F8"
                                    }
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor={
                                        theme === "dark" ? "#DE7A2A" : "#9607F8"
                                    }
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <Legend />
                        <XAxis
                            stroke={theme === "dark" ? "#fff" : "rgba(0,0,0,7)"}
                            dataKey="date"
                        />
                        <YAxis
                            stroke={theme === "dark" ? "#fff" : "rgba(0,0,0,7)"}
                        />
                        <Tooltip />
                        <Line
                            type="montoone"
                            dataKey="temp"
                            stroke={theme === "dark" ? "#21D2DE" : "#F85F0F"}
                            fillOpacity={1}
                            fill="url(#colorUv)"
                        />
                        <Line
                            type="monotone"
                            dataKey="feels"
                            stroke={theme === "dark" ? "#DE7A2A" : "#9607F8"}
                            fillOpacity={1}
                            fill="url(#colorPv)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </CSSTransition>
    );
};

export default MainCard;
