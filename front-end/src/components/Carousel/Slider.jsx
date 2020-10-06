import React from "react";

import ReactSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import Card from "../Containers/Card";


import Styles from "./Styles"
const useStyles = makeStyles((theme) => ({

    prevButton: {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)"
    },
    gridItem: {
        // marginLeft: "auto !important",
        // marginRight: "auto !important",
        //width: "50%"


    },
}));

const settings = {
    dots: true,
    infinite: true,
    accessibility: true,
    arrows: true,
    centerPadding: "50px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
};
const imagesFolder = require.context("../../../public", true)

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <ArrowRightIcon
            className={className}
            style={{ ...style, color: "black", }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <ArrowLeftIcon
            className={className}
            style={{ ...style, color: "black" }}
            onClick={onClick}
        />
    );
}
const getSlider = (imagePaths) => {
    return (
        <div>
            <ReactSlick
                {...settings}
            >
                {imagePaths?.map(imagePath => {
                    return <img src={imagesFolder(imagePath)} className={useStyles.image} width="100%"></img>
                })
                }
            </ReactSlick>
        </div>
    )
}

export default function Slider(props) {
    //const classes = useStyles();


    return (
        <Card>
            {getSlider(props.imagePaths)}
        </Card>


    )
}