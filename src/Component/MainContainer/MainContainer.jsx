import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddButton from "../AddButton/AddButton";
import MainLayout from "../MainLayout/MainLayout";
import {
    saveToLocalStorage,
    readFromLocalStorage,
    capitalizeString,
    isLetter,
} from "../../Utils/utils";
import MainCard from "../Card/MainCard/MainCard";
import Navbar from "../Navbar/Navbar";
import { getWeatherByCityId } from "../../Api/api";
import Footer from "../Footer/Footer";

const useStyles = makeStyles({
    dialogThem: {
        flexGrow: 1,
        textAlign: "center",
    },
});

function MainContainer() {
    const classes = useStyles();
    const [weatherLocations, setWeatherLocations] = useState(
        readFromLocalStorage
    );
    const [open, setOpen] = useState(false);
    const [weatherObj, setWeatherObj] = useState("");
    const [weatherData, setWeatherData] = useState({});
    const [units, setUnits] = useState("metric");
    const [locationId, setLocationId] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.dir("locationId");
        console.dir(locationId);
        if (!locationId) return;
        const getWeather = async () => {
            const result = await getWeatherByCityId(locationId, units);

            console.dir("(result.data");
            setWeatherData(result.data);
            setWeatherObj(result);
            console.log(result);
            const data = result.list.map((forecast) => ({
                date: forecast.dt_txt.split(" ")[1].split(":")[0] + ":00",
                //max: forecast.main.temp_max,
                //min: forecast.main.temp_min
                temp: forecast.main.temp,
                feels: forecast.main.feels_like,
            }));
            setWeatherData(data);

            setIsOpen(true);
            // setLoading(false);
        };
        getWeather();
    }, [locationId, units]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddClick = () => {
        let location = document.getElementsByName("city")[0].value;
        console.log("location");
        console.log(location);
        if (!isLetter(location)) {
            alert(
                "Request must contain only English characters. Enter your request correctly, please. "
            );
            return;
        } else if (weatherLocations.includes(location)) {
            alert("This location already exists.");
        } else {
            setWeatherLocations([
                ...weatherLocations,
                capitalizeString(location),
            ]);
            saveToLocalStorage([
                ...weatherLocations,
                capitalizeString(location),
            ]);
            setOpen(false);
        }
    };

    const updateLocations = (locations) => {
        setWeatherLocations(Array.from(locations));

        saveToLocalStorage(locations);
    };

    const removeLocation = (index) => () => {
        updateLocations(
            weatherLocations.filter(
                (_, locationIndex) => locationIndex !== index
            )
        );
    };

    // console.log(weatherLocations)
    const moveItemToFront = (location) => () => {
        console.log("newarr");
        console.log(location);

        setLocationId(location);
        // newarr.unshift(newarr.splice(index, 1)[0]);
        // setWeatherLocations(newarr);
        // saveToLocalStorage(newarr);
    };

    return (
        <>
            <Navbar setIsOpen={setIsOpen} />
            {!isOpen && 
                (<>
                    <AddButton onClick={handleClickOpen} />
                    <MainLayout
                        weatherLocations={weatherLocations}
                        moveItemToFront={moveItemToFront}
                        removeLocation={removeLocation}
                        handleClickOpen={handleClickOpen}
                    />
                </>
            )}

            {isOpen && (
                <MainCard
                    weatherObj={weatherObj}
                    location={locationId}
                    data={weatherData}
                    units={units}
                    setUnits={setUnits}
                    isOpen={setIsOpen}
                />
            )}
            <Dialog
                className={classes.dialogThem}
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Location</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter a City Name:</DialogContentText>
                    <TextField
                        autoFocus
                        color="secondary"
                        margin="dense"
                        id="name"
                        label="City"
                        name="city"
                        type="text"
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddClick} color="secondary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </>
    );
}

export default MainContainer;
