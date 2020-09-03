import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Icon from "@material-ui/core/Icon";
import { NutritionLabel } from "react-fda-nutrition-facts";
const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    width: 50,
    height: 50,
    fontSize: 13,
    backgroundColor: red[500]
  }
});

const addAndBeforLast = ingredients => {
  if (!ingredients[ingredients.length - 1].startsWith("and ")) {
    ingredients[ingredients.length - 1] =
      "and " + ingredients[ingredients.length - 1];
  }
  return ingredients.join(", ");
};

class Item extends React.Component {
  /*handleExpandClick = () => {
    this.setExpanded(!this.expanded);
  };
*/
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  expanded = () => {
    this.setState({ open: !this.state.open });
  };

  setExpanded = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="itemType" className={classes.avatar}>
              {this.props.itemType}
            </Avatar>
          }
          action={
            <Icon id="Price">
              {this.props.price != null ? "$" + this.props.price : " "}
            </Icon>
          }
          title={this.props.title}
          subheader={this.props.Origin}
        />
        <CardMedia
          className={classes.media}
          image={this.props.imageSrc}
          title={this.props.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Ingredients: {addAndBeforLast(this.props.Ingredients)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: this.state.open
            })}
            onClick={this.expanded}
            aria-expanded={this.state.open}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <CardContent>
            <NutritionLabel
              servingSize={"8oz"}
              calories={800}
              totalFat={25}
              saturatedFat={5}
              transFat={0}
              cholesterol={30}
              sodium={660}
              totalCarbs={31}
              dietaryFiber={0}
              sugars={5}
              protein={5}
              vitaminA={4}
              vitaminC={2}
              calcium={15}
              iron={4}
            />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

Item.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Item);
