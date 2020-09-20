import React from "react";

import Slider from "../components/Carousel/Slider";
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from "../components/Containers/GridContainer";
import GridItem from "../components/Containers/GridItem";
import Card from "../components/Containers/Card";
import Typography from '@material-ui/core/Typography';
import customTheme from "../components/Theme"
import Collapse from '@material-ui/core/Collapse';

import Button from "@material-ui/core/Button";

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({

    carrousel: {


    },


    container: {
        flexGrow: 1,
        direction: "row",
        flexDirection: "row",
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        width: "100%",
        "@media (min-width: 576px)": {
            maxWidth: "500px"

        },
        "@media (min-width: 768px)": {
            maxWidth: "620px"
        },
        "@media (min-width: 992px)": {
            maxWidth: "960px"
        },
        "@media (min-width: 1200px)": {
            maxWidth: "1040px"
        },

    },


    outerCard: {
        padding: "25px 25px"

    },
    formControl: {
        minWidth: 120,

        marginTop: "30px",
        minHeight: "100px",
        minWidth: "100px",

        // display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    addToCartButton: {
        color: 'primary',
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: customTheme.palette.gold,
        float: "right",

        "&:hover": {
            backgroundColor: customTheme.palette.gold,
            color: customTheme.palette.primary.contrastText
        }
    },
}));
let images = [
    "./Images/shopItems/1/1.jpg",
    "./Images/shopItems/1/2.jpg",
    "./Images/shopItems/1/3.jpg",
    "./Images/shopItems/1/4.jpg"
]
export default function ProductPage(props) {
    const classes = useStyles();

    const entityID = props.match.params.entityID;
    const [age, setAge] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };




    const [descriptionOpen, setDescriptionOpen] = React.useState(true);
    const [extraDescriptionOpen, setExtraDescriptionOpen] = React.useState(false);

    const handleDescriptionClick = (section) => {

        switch (section) {
            case 1:
                setDescriptionOpen(!descriptionOpen)

                // set others to close
                setExtraDescriptionOpen(false)
                break;
            case 2:
                setExtraDescriptionOpen(!extraDescriptionOpen)

                // set others to close
                setDescriptionOpen(false)
                break;
        }
    }
    return (
        <div id="container" className={classes.container}>
            <Card id="outerCard" card className={classes.outerCard}>
                <GridContainer id="GridContainer" className={classes.gridContainer} >
                    <GridItem xs={12} sm={12} md={6} className={classes.gridItem}>
                        <Slider imagePaths={images} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} className={classes.item}>
                        <Typography variant="h4" align="left" style={{ marginTop: "20px", fontWeight: "300" }}>
                            <span> Virginia NYC Precious Bag </span>


                        </Typography>
                        <Divider style={{ backgroundColor: customTheme.palette.gold, height: "2px" }} />
                        <Typography variant="h5" align="right" style={{ marginTop: "20px", fontWeight: "300" }}>
                            $ 499
                        </Typography>
                        <ListItem
                            button
                            onClick={() => handleDescriptionClick(1)}
                            style={{ height: "20px", padding: "0", marginTop: "25px" }}
                        >
                            <ListItemText  >
                                <span >Description:</span>
                            </ListItemText>

                            {descriptionOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                        <Collapse in={descriptionOpen} timeout="auto" unmountOnExit>
                            <Typography variant="caption" color="primary" align="left" style={{ marginTop: "20px", fontWeight: "400", }}>
                                <span>
                                    here is where we need some sort of description about this item,
                                    scentially no more than 3-4 lines in length. Please be mindfull that
                                    we can modify this section's theme as you wish.
                            </span>
                            </Typography>
                        </Collapse>

                        <ListItem
                            button
                            onClick={() => handleDescriptionClick(2)}
                            style={{ height: "20px", padding: "0", marginTop: "5px" }}
                        >
                            <ListItemText>
                                <span >More Details:</span>
                            </ListItemText>

                            {extraDescriptionOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                        <Collapse in={extraDescriptionOpen} timeout="auto" unmountOnExit>
                            <Typography variant="caption" color="primary" align="left" style={{ marginTop: "20px", fontWeight: "400", }}>
                                <span style={{ backgroundColor: customTheme.palette.gold }}>
                                    <ul >
                                        <li>Storm and midnight-blue stretch cotton-blend</li>
                                        <li>Two button fastening</li>
                                        <li>84% Cotton, 14% Nylon, 2% Elastane</li>
                                        <li>Leather</li>
                                    </ul>

                                </span>
                            </Typography>
                        </Collapse>

                        <FormControl className={classes.formControl}>
                            <InputLabel id="color">Color</InputLabel>
                            <Select
                                labelId="color"
                                id="color"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Red"}>Red</MenuItem>
                                <MenuItem value={"Gold"}>Gold</MenuItem>
                                <MenuItem value={"Any"}>Any</MenuItem>
                            </Select>
                        </FormControl>

                        <Button
                            className={classes.addToCartButton}
                            onClick={() => { alert("The cart is still under development") }}
                        >
                            <i className={classes.addToCartButton} />
                            Add To Cart
                        </Button>
                    </GridItem>

                </GridContainer>

            </Card>
        </div >
    )
}