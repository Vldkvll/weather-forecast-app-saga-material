import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Brightness4SharpIcon from "@material-ui/icons/Brightness4Sharp";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    bar: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    },
    link: {
        flexGrow: 1,
        textAlign: "center",
        textDecoration: 'none',
        color: '#fff'
    },
    title: {
        flexGrow: 1,
        textAlign: "center",
        fontSize: "2em",
        textDecoration: 'none',
        color: '#fff'
    },
}));

export default function Navbar({ setIsOpen }) {
    const classes = useStyles();
    const location = useLocation();

    return (
        <div className={classes.root}>
            <AppBar className={classes.bar} position="static">
                <Toolbar>
                    {location.pathname !== "/" && (
                        <Link to="/">
                            <Brightness4SharpIcon />
                        </Link>
                    )}
                    {location.pathname !== "/" ? (
                        <Link to="/" className={classes.link}>
                            <Typography variant="h2" className={classes.title} >
                                Weather Forecast Worldwide
                            </Typography>
                        </Link>
                    ) : (
                        <Typography variant="h2" className={classes.title}>
                            Weather Forecast Worldwide
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
