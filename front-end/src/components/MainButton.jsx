import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

import Theme from './Theme'

const useStyles = makeStyles((theme) => ({
    mainButton: {
        color: 'primary',
        size: 'lg',
        backgroundColor: Theme.palette.gold,
        "&:hover": {
            //backgroundColor: "#ffffff",
            backgroundColor: Theme.palette.gold,

            color: Theme.palette.primary.contrastText
        }
    },
}))
export default function MainButton(props) {
    const classes = useStyles();
    const { children, ...rest } = props;

    return (
        <Button
            className={classes.mainButton}
            href={props.href}
            {...rest}
        >
            <i className={classes.mainButton} />
            {children}

        </Button>
    );
}