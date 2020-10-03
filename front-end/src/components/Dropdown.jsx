import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';




// const useStyles = makeStyles((theme) => ({


// }));



export default function Dropdown(props) {

    //const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [currentValue, setCurrentValue] = React.useState('');

    const handleChange = (event) => {
        setCurrentValue(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Select
            className={props.ClassName}
            style={props.style}
            labelId={props.object.id}
            id={props.object.id}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={currentValue}
            onChange={handleChange}
        >

            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {props.object.values.map(value => {
                return <MenuItem value={value.value}>{value.displayName}</MenuItem>
            })}

        </Select>
    )
}
