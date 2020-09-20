import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from 'react-awesome-slider/dist/styles.css';


import { makeStyles } from '@material-ui/core/styles';
import GridContainer from "../Containers/GridContainer";
import GridItem from "../Containers/GridItem";
import Card from "../Containers/Card";

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import Styles from "./Styles"
const useStyles = makeStyles((theme) => ({


    gridItem: {
        // marginLeft: "auto !important",
        // marginRight: "auto !important",
        //width: "50%"


    },
}));

const imagesFolder = require.context("../../../public", true)

//let itemID = 1
// let images = [{
//     path: imagesFolder(`./Images/shopItems/${itemID}/1.jpg`),
//     id: 1
// },
// {
//     path: `Images/shopItems/${itemID}/2.jpg`,
//     id: 2
// },
// {
//     path: `Images/shopItems/${itemID}/3.jpg`,
//     id: 3
// },
// {
//     path: `Images/shopItems/${itemID}/4.jpg`,
//     id: 4
// },

// ]


const getSlider = (imagePaths) => {
    return (

        <AwesomeSlider
            cssModule={[Styles, AwsSliderStyles]}
            bullets={false}
            animation="scaleOutAnimation"

        >


            {imagePaths.map(imagePath => {
                return <div data-src={imagesFolder(imagePath)} className={useStyles.image}></div>
            })
            }
        </AwesomeSlider>
    )
}

export default function Slider(props) {
    const classes = useStyles();


    return (
        <Card carousel>
            {getSlider(props.imagePaths)}
        </Card>


    )
}