import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
    fab: {
        position: "fixed",
        top: "4em",
        right: "4em",
    },
});

function AddButton({ onClick }) {
    const classes = useStyles();
    return (
        <Fab
            className={classes.fab}
            onClick={onClick}
            aria-label="add weather location"
            color="secondary"
        > 
            <AddIcon />
        </Fab>
    );
}

export default AddButton;
