import React from 'react';


import GridContainer from '../components/Containers/GridContainer'
import GridItem from '../components/Containers/GridItem'
import Button from "@material-ui/core/Button";

import { makeStyles } from '@material-ui/core/styles';
import customTheme from '../components/Theme'

const imagesFolder = require.context("../../public/Images", true)

const useStyles = makeStyles((theme) => ({

    page: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',

    },
    image: {
        'backgroundImage': `url(${imagesFolder("./LogoName.png")})`,
        backgroundRepeat: 'space',
        backgroundAttachment: 'scroll',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',

        opacity: 0.5,
        'backgroundSize': '200px',

        height: '100%',
        width: '100%',
        position: 'fixed',
        display: 'block',
        willChange: 'transform',
        top: 0,
        left: 0,

    },
    landingImage: {
        opacity: 1,
        'backgroundImage': `url(${imagesFolder("./LandingImage.jpg")})`,
        height: '100%',
        width: '100%',
        position: 'absolute',
        display: 'block',
        willChange: 'transform',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'static',

    },
    content: {

    },
    mainButton: {
        color: 'primary',
        size: 'lg',
        backgroundColor: customTheme.palette.gold,
        "&:hover": {
            //backgroundColor: "#ffffff",
            color: customTheme.palette.primary.contrastText
        }
    },
    landingTitle: {
        backgroundColor: customTheme.palette.gold

    },
    landingBody: {
        backgroundColor: customTheme.palette.gold

    },
    LandingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '10%',
        //alignItems: 'center',
        //textAlign: 'center',
    }

}));


export default function Login() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.image}></div>
            <div className={classes.landingImage}></div>
            <div className={classes.page}>

                <div className={classes.content}>
                    <GridContainer spacing={0}
                        className={classes.LandingContainer}
                    >
                        <GridItem xs={12} sm={12} md={6}>
                            <h1 ><span className={classes.landingTitle}>Your Story Starts Here!</span></h1>
                            <h4 >
                                <span className={classes.landingBody}>
                                    Every landing page needs a small description after the big bold
                                    title, that{"'"}s why I added this text here. Think a nice
                                    message to add here to create a great first impression.
                                </span>
                            </h4>
                            <br />
                            <Button
                                className={classes.mainButton}
                                href="/shop"
                            >
                                <i className={classes.mainButton} />
                            Start Shopping
                        </Button>
                        </GridItem >
                    </GridContainer>

                </div>
            </div>
        </div>
    );
}