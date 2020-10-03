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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dropdown from '../components/Dropdown'

import { getEntity } from '../globals/Entity'
import { AddEntity } from '../components/Cart/Actions'
import { useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({


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

        marginTop: "30px",
        marginRight: "50px",
        minHeight: "100px",
        minWidth: "100px",
        //display: "flex",
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
    loading: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(10, 0, 10),

    }
}));


export default function ProductPage(props) {
    const classes = useStyles();


    const [loading, setLoading] = React.useState(true);
    const [response, setResponse] = React.useState(null);

    const [descriptionOpen, setDescriptionOpen] = React.useState(true);
    const [extraDescriptionOpen, setExtraDescriptionOpen] = React.useState(false);

    const dispatch = useDispatch();

    const handleAddToCart = (entity) => {
        dispatch(AddEntity(entity));
    }
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
            default:
                console.log("incorrect Description Click")
                break;
        }
    }

    const entityID = props.match.params.entityID
    React.useEffect(() => {
        setLoading(true)

        getEntity(entityID).then(res => { setResponse(res); setLoading(false); }).catch(error => { setResponse(error) })

    }, []);
    return (
        <div id="container" className={classes.container}>
            {loading ? <div className={classes.loading}>
                <CircularProgress />
            </div> :
                <Card id="outerCard" className={classes.outerCard}>
                    <GridContainer id="GridContainer" className={classes.gridContainer} >
                        <GridItem xs={12} sm={12} md={6} className={classes.gridItem}>
                            <Slider imagePaths={response.fields.imagePath.value} />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6} className={classes.item}>
                            <Typography variant="h4" align="left" style={{ marginTop: "20px", fontWeight: "300" }}>
                                <span> {response.fields.displayName.value} </span>


                            </Typography>
                            <Divider style={{ backgroundColor: customTheme.palette.gold, height: "2px" }} />
                            <Typography variant="h5" align="right" style={{ marginTop: "20px", fontWeight: "300" }}>
                                $ {response.fields.price.value}
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

                            {response.fields.dropdown.value?.map(dropdown => {
                                return <FormControl className={classes.formControl}>
                                    <InputLabel id={dropdown.id}>{dropdown.displayName}</InputLabel>
                                    <Dropdown object={dropdown}></Dropdown>
                                </FormControl>
                            })}




                            <Button
                                className={classes.addToCartButton}
                                onClick={() => { handleAddToCart(response) }}
                            >
                                <i className={classes.addToCartButton} />
                            Add To Cart
                        </Button>
                        </GridItem>

                    </GridContainer>

                </Card>
            }
        </div >
    )
}