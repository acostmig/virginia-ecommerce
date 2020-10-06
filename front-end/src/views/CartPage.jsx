import React, { useState, useEffect } from "react";

import Cart from '../components/Cart/main'
import { Empty } from '../components/Cart/Actions'
import { useDispatch, useSelector } from "react-redux";
import { getEntity } from '../globals/Entity';
import Card from '../components/Containers/Card'
import Button from '@material-ui/core/Button';
import customTheme from '../components/Theme'
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";
import Alert from '@material-ui/lab/Alert';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({

    outterCard: {
        padding: "25px",
        display: "inline-block",
        "@media (max-width: 576px)": {
            width: "100%",
        },
        "@media (min-width: 768px)": {
            width: "90%",
        },
        "@media (min-width: 992px)": {
            width: "80%",
        },
        "@media (min-width: 1200px)": {
            width: "70%",
        },
    },
    checkout: {
        textAlign: "right",
        margin: "20px"
    },
    checkoutButton: {
        color: 'primary',
        size: 'lg',
        backgroundColor: theme.palette.gold,
        "&:hover": {
            //backgroundColor: "#ffffff",
            backgroundColor: theme.palette.gold,

            color: theme.palette.primary.contrastText
        }
    },
    empty: {
        height: "30%",
        width: "30%",

        "@media (max-width: 768px)": {
            height: "50%",
            width: "50%"

        },

    },
    mainButton: {
        color: 'primary',
        size: 'lg',
        backgroundColor: customTheme.palette.gold,
        "&:hover": {
            backgroundColor: customTheme.palette.gold,
            color: customTheme.palette.primary.contrastText
        }
    },

}))
const stripePromise = loadStripe("pk_test_51HWtqXHGjtLJRyhClejcgkSj5MzEFomgJbNF6KDGC3V02th0KCLFKMT4r7TTKW75Xz3Fh9Rf2WLwks1jw2IVKU9Z00cBpBbW6U");


const imagesFolder = require.context("../../public", true)

const handleClick = async (state) => {

    state.addedEntities.map(entity =>
        entity.fields.imagePath.value = entity.fields.imagePath.value.map(imagePath => imagesFolder(imagePath))[0]
    )

    const stripe = await stripePromise;
    const response = await axios.post("api/open/stripe/create-session", state);
    const session = await response.data;
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
        sessionId: session.id,
    });
    if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
    }
};
function EmptyCart(props) {

    return (
        <div>

            <AddShoppingCartIcon
                href="/home"
                className={styles().empty}
            />
            <h1>
                Your Cart Is Empty
            </h1>
            <h5>
                Please add some items to the cart!
            </h5>
            <Button
                className={styles().mainButton}
                href="/shop"
            >
                <i className={styles().mainButton} />
                            Start Shopping
            </Button>
        </div>
    );
}
export default function CartPage() {
    const classes = styles(customTheme);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
            setSuccess(true)
            dispatch(Empty())
        }
        if (query.get("canceled")) {
            setMessage(
                "Order canceled - please continue to shop around and checkout when you're ready."
            );
            setSuccess(false)

        }
    }, []);
    //add cart action
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const subtotal = useSelector(state => state.totalPrice);
    const tax = useSelector(state => state.totalPrice === null ? 0 : (state.totalPrice * 0.07));
    const total = useSelector(state => (state.totalPrice + tax));

    return (
        <div style={{ textAlign: "center" }}>
            <Card className={classes.outterCard}>
                {message && <Alert style={{ justifyContent: "center" }} severity={success ? "success" : "error"}>{message}</Alert>}
                {subtotal == 0 ? <EmptyCart /> :
                    <div>
                        <Cart />
                        <div className={classes.checkout}>

                            <p>
                                <b>
                                    <span style={(tax === null || tax === 0) ? { display: "none" } : {}}>
                                        Subtotal: {subtotal === null ? 0 : subtotal.toFixed(2)}</span><br />
                                    <span style={(tax === null || tax === 0) ? { display: "none" } : {}} >
                                        Tax: {tax === 0 ? 0 : tax.toFixed(2)}
                                    </span><br />
                                    <span>Total: {total.toFixed(2)}</span><br />

                                </b>
                            </p>
                            <Button className={classes.checkoutButton} onClick={() => handleClick(state)}>
                                Checkout
                        </Button>
                        </div>
                    </div>
                }
            </Card>
        </div >
    )
}
