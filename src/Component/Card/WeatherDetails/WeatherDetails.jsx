import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Grid } from "@material-ui/core";

function WeatherDetails({
    data: { description, icon, temp, windSpeed, windTransform },
}) {

    return (
        <div>
            <Grid container justify="center" alignItems="center">
                {temp && <Typography variant="h6">{temp}&deg;C</Typography>}
                {icon && (
                    <Tooltip
                        style={{ width: "4em", margin: "0.5em" }}
                        title={description}
                        aria-label={description}
                    >
                        <Avatar alt={description} src={icon} />
                    </Tooltip>
                )}
                {windSpeed > 0 && (
                    <>
                        <Typography variant="h6">
                            {`${windSpeed} km/h`}
                            {windTransform !== null && (
                                <ArrowRightAltIcon
                                    style={{
                                        transform: `rotateZ(${windTransform}deg)`,
                                        marginLeft: "0.5em",
                                    }}
                                />
                            )}
                        </Typography>
                    </>
                )}
            </Grid>
        </div>
    );
}

export default WeatherDetails;
