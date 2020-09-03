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

let itemID = 1
let images = [{
    path: `Images/ShopItems/${itemID}/1.jpg`,
    id: 1
},
{
    path: `Images/ShopItems/${itemID}/2.jpg`,
    id: 2
},
{
    path: `Images/ShopItems/${itemID}/3.jpg`,
    id: 3
},
{
    path: `Images/ShopItems/${itemID}/4.jpg`,
    id: 4
},

]


const getSlider = () => {

    return (

        <AwesomeSlider
            cssModule={[Styles, AwsSliderStyles]}
            bullets={false}
            animation="scaleOutAnimation"

        >


            {images.map(image => {
                return <div data-src={image.path} id={image.id} className={useStyles.image}></div>
            })
            }
        </AwesomeSlider>
    )
}

export default function Slider() {
    const classes = useStyles();


    return (
        <GridItem xs={12} sm={12} md={6} className={classes.gridItem}>
            <Card carousel>
                {getSlider()}
            </Card>
        </GridItem>


    )
}