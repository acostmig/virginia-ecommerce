import React from "react";
import Carousel from "react-slick";

import { makeStyles } from '@material-ui/core/styles';
import GridContainer from "./Containers/GridContainer";
import GridItem from "./Containers/GridItem";
import Card from "./Containers/Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({

    section: {
        padding: "70px 0"
    },
    marginAuto: {
        marginLeft: "auto !important",
        marginRight: "auto !important"
    },
    container: {
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        width: "100%",
        "@media (min-width: 576px)": {
            maxWidth: "540px"
        },
        "@media (min-width: 768px)": {
            maxWidth: "720px"
        },
        "@media (min-width: 992px)": {
            maxWidth: "960px"
        },
        "@media (min-width: 1200px)": {
            maxWidth: "1140px"
        }
    },
    image: {
        marginLeft: "auto",
        marginRight: "auto",
    },
    button: {
        "&:hover": {
            color: "#eed36b !important",
            background: "blue !important",

        }
        // color: 'green[500]',
        // backgroundColor: "#eed36b",
        // width: '70px',
        // height: '70px',

    }


}));

let images = [{
    path: "Images/background.jpg",
    id: 1
},
{
    path: "Images/LandingImage.jpg",
    id: 2
}
]
const nextArrows = () => {
    // return (<ArrowForwardIosIcon className={useStyles.root}></ArrowForwardIosIcon>)
    return <Button className={useStyles.button}>hello</Button>
}

const prevArrows = () => {
    return (<ArrowBackIosIcon color="primary" className={useStyles.arrows}></ArrowBackIosIcon>)
}

const getImages = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        nextArrow: nextArrows(),
        prevArrow: prevArrows()

    };
    return (

        <Carousel {...settings}>
            {images.map(image => {
                return <div><img src={image.path} alt={`image ${image.id}`} width="100%" height="100%" className={useStyles.image} /></div>
            })
            }
        </Carousel >
    )
}

export default function CarouselComponent() {
    const classes = useStyles();


    return (
        <div id="section" className={classes.section}>
            <div id="container" className={classes.container}>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6} className={classes.marginAuto}>
                        <Card carousel>
                            {getImages()}
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        </div >


    )
}