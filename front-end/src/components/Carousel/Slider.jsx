import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from 'react-awesome-slider/dist/styles.css';


import { makeStyles } from '@material-ui/core/styles';
import Card from "../Containers/Card";


import Styles from "./Styles"
const useStyles = makeStyles((theme) => ({


    gridItem: {
        // marginLeft: "auto !important",
        // marginRight: "auto !important",
        //width: "50%"


    },
}));

const imagesFolder = require.context("../../../public", true)

const getSlider = (imagePaths) => {
    return (

        <AwesomeSlider
            cssModule={[Styles, AwsSliderStyles]}
            bullets={false}
            animation="scaleOutAnimation"

        >
            {imagePaths?.map(imagePath => {
                return <div key={imagePath} data-src={imagesFolder(imagePath)} className={useStyles.image}></div>
            })
            }
        </AwesomeSlider>
    )
}

export default function Slider(props) {
    //const classes = useStyles();


    return (
        <Card carousel>
            {getSlider(props.imagePaths)}
        </Card>


    )
}