import React, { useState } from "react";
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

const useStyles = makeStyles({
    dialogThem: {
        flexGrow: 1,
        textAlign: "center",
    },
});

function MainContainer() {
    const classes = useStyles();

    const history = useHistory();
    const { dataS, setValues } = useData();
    const [weatherLocations, setWeatherLocations] = useState(
        readFromLocalStorage
    );
    const [open, setOpen] = useState(false);

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
