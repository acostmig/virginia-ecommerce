import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MenuItem from "../components/Menu/MenuItem";
//import paella from "../../Images/MenuItems/paella.jpg";
import axios from 'axios';
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  container: {
    overflowY: "auto"
  },
  item: {
    marginBottom: "100px"
  }
});

const menuItem = props => {
  return (
    <Grid item={true} className={styles().item}>
      <MenuItem
        title={props.title}
        itemType={props.itemType}
        Origin={props.origin}
        Ingredients={props.ingredients}
        imageSrc={props.imageSrc}
        price={props.price}
      />
    </Grid>
  );
};

class Menu extends React.Component {
  state = { data: [], loading: null };
  getItems = () => {

    var object = [];

    /*get all existing menu items
      note: to be changed to get items by type
    */
    console.log('/api');
    console.log("why")
    this.setState({
      loading: true
    }, () => {
      axios.get("/api")
        .then(res => {


          //object = res.data;
          for (const [key, value] of Object.entries(res.data)) {
            object.push(<tr><td>{key}</td> <td>{value}</td></tr>);
          }
          this.setState({
            loading: false,
            data: object
          })

        });
    });
    //initiallize an array to be loaded with the menu item objects

  }

  render() {
    const { classes } = this.props;

    return (
      <Grid
        className={classes.container}
        container
        justify="center"
        spacing={3}
      >

        {
          this.state.loading === null ? this.getItems() : (this.state.loading === true ? <div id="lol"></div> : <table>{this.state.data}</table>)}

      </Grid>
    );
  }

}

Menu.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Menu);
