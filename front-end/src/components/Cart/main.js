import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AddEntity, SubEntity, RemoveEntity } from './Actions'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Card from '../Containers/Card'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { withStyles } from "@material-ui/core/styles";



const imagesFolder = require.context("../../../public", true)


const styles = theme => ({
    container: {
        display: "inline-block",
        width: "95%",
        marginTop: "10px"

    },
    tableHead: {
        "@media (max-width: 768px)": {
            display: "none",

        },
        // "@media (min-width: 992px)": {
        //     width: "80%",
        // },
        // "@media (min-width: 1200px)": {
        //     width: "70%",
        // },
    },
    tableCell: {
        "@media (max-width: 768px)": {
            display: "block",

        },
        // "@media (min-width: 768px)": {
        //     display: "block",
        // },
        // "@media (min-width: 992px)": {
        //     width: "80%",
        // },
        // "@media (min-width: 1200px)": {
        //     width: "70%",
        // },
    },
    image: {
        "@media (max-width: 576px)": {
            width: "150px",
        },
        "@media (min-width: 576px)": {
            width: "200px",
        },
        "@media (min-width: 992px)": {
            width: "250px",
        },
        "@media (min-width: 1200px)": {
            width: "300px",
        },
    }
})

const cellStyle = {
    //display: "block"
}
class Cart extends Component {

    //to remove the item completely
    handleSub = (id) => {
        this.props.SubEntity(id);
    }
    handleRemove = (id) => {
        this.props.RemoveEntity(id);
    }
    //to add the quantity
    handleAdd = (id) => {
        this.props.AddEntity(id);
    }
    render() {
        const { classes } = this.props;


        let addedItems = this.props.entities.length ?
            (
                this.props.entities.map(entity => {
                    return (
                        <TableRow key={entity.id}>
                            {/* <div style={{ position: "fixed", display: "block", minWidth: "100%" }}>
                                <img src={imagesFolder(entity.fields.imagePath.value[0])} title={entity.fields.imagePath.value[0]} style={{ width: "300px" }} />
                            </div> */}
                            {/* <TableCell align="center" style={{ position: "fixed", display: "block" }}> */}
                            <TableCell align="center" >
                                <img src={imagesFolder(entity.fields.imagePath.value[0])} title={entity.fields.imagePath.value[0]} className={classes.image} />
                            </TableCell>
                            <TableCell align="center" className={classes.tableCell}>
                                <span className="title"><b>{entity.fields.displayName.value}</b></span>
                            </TableCell>
                            <TableCell align="center" className={classes.tableCell}>
                                <p>
                                    <b>${entity.fields.price.value}</b>
                                </p>
                            </TableCell>
                            <TableCell align="center" className={classes.tableCell}>
                                <div>x{entity.quantity}</div>
                                <nobr>
                                    <Button style={{ minWidth: "20px" }} onClick={() => { this.handleSub(entity) }}><RemoveIcon /></Button>
                                    <Button style={{ minWidth: "20px" }} onClick={() => { this.handleAdd(entity) }}><AddIcon /></Button>
                                </nobr>

                            </TableCell>
                            <TableCell align="center" className={classes.tableCell}>
                                ${entity.fields.price.value * entity.quantity}
                            </TableCell>
                            <TableCell align="center" className={classes.tableCell}>
                                <Button onClick={() => { this.handleRemove(entity) }}><DeleteForeverIcon /></Button>
                            </TableCell>

                        </TableRow >

                    )
                })
            ) :

            (
                <p>Nothing.</p>
            )
        return (
            <div>
                <TableContainer component={Card} className={classes.container}>
                    <Table aria-label="simple table">
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell align="center" style={{ width: "10%" }}></TableCell>
                                <TableCell align="center">Product</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Total</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addedItems}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        entities: state.addedEntities,
        total: state.totalPrice
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddEntity: (id) => { dispatch(AddEntity(id)) },
        SubEntity: (id) => { dispatch(SubEntity(id)) },
        RemoveEntity: (id) => { dispatch(RemoveEntity(id)) }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));
