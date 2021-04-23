import React, { useCallback, useEffect, useState } from "react";
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
import { useData } from "../../DataContext/DataContext";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeErrorStart } from "../../Redux/actions/actionCreators";

const useStyles = makeStyles({
    dialogThem: {
        flexGrow: 1,
        textAlign: "center",
    },
});

function MainContainer() {
    const classes = useStyles();

    const history = useHistory();
    const error = useSelector((state) => state.favorites.error);
    const { setValues } = useData();
    const [weatherLocations, setWeatherLocations] = useState(
        readFromLocalStorage
    );
    const [open, setOpen] = useState(false);
    const errorLocation = error.cityKey;
    const dispatch = useDispatch();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddClick = () => {
        let location = document.getElementsByName("city")[0].value;
        if (!isLetter(location)) {
            alert(
                "Request must contain only English characters. Enter your request correctly, please."
            );
            return;
        } else if (weatherLocations.includes(capitalizeString(location))) {
            alert("This location already exists.");
            return
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

    const removeLocation = (params) => () => {
        updateLocations(
            weatherLocations.filter(
                (_, locationIndex) => locationIndex !== params
            )
        );
    };

    const DeleteErrorLocation = (params) => {
        const newWeather = weatherLocations.filter(
            (item, i) => item !== params
        );
        updateLocations(newWeather);
    };

    if (errorLocation) {
        setTimeout(
            (errorLocation) => {
                DeleteErrorLocation(errorLocation);
                alert("This location does not exists.");
            },
            1000,
            errorLocation
        );
    }
    const onRemoveError = useCallback(() => dispatch(removeErrorStart()), [
        dispatch,
    ]);

    useEffect(() => {
        if (!errorLocation) return;
        onRemoveError();
    }, [errorLocation, onRemoveError]);

    const moveItemToFront = (location, description) => () => {
        setValues({
            location,
            units: "metric",
            description,
        });
        history.push("./weather");
    };

    return (
        <>
            <AddButton onClick={handleClickOpen} />
            <MainLayout
                weatherLocations={weatherLocations}
                moveItemToFront={moveItemToFront}
                removeLocation={removeLocation}
                handleClickOpen={handleClickOpen}
            />
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
        </>
    );
}

export default MainContainer;
