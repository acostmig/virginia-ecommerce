import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from '@material-ui/core/Hidden';

import { withStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from '@material-ui/core/Typography';
import HideOnScroll from './HideOnScroll'


const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: "inherit"
  },

  toolbar1: {
    justifyContent: 'center',
    display: 'flex',
  },
  toolbar2: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    justifyContent: 'center',


  },

  header: {
    textAlign: 'Center',
    marginRight: 'auto',
    position: 'absolute'


  },
  burgerButton: {
    marginRight: 'auto'
  },
  headerButtonGroup: {
    position: 'flex',


  },
  drawerButtonGroup: {

    display: 'none'
  },
  drawerButton: {
    display: 'none'

  }


});

let buttons =
  [
    {
      'DisplayName': 'Home',
      'href': 'home'
    },
    {
      'DisplayName': 'Shop',
      'href': 'shop'
    },
    {
      'DisplayName': 'About',
      'href': 'about'
    },

  ]

const buttonItem = (name, href) => {
  return (
    <Button
      key={name}
      id={name}
      variant="text"
      color="primary"
      className={styles.headerButton}
      href={href}
    >
      {name}
    </Button>
  );
};

//to be Used in drawer
const menuItem = (name, href) => {
  return (
    <MenuItem
      key={name}
      id={name}
      component="a"
      href={href}
      className={styles.drawerButton}>
      {name}
    </MenuItem>
  );
};
const menuButtons = (element) => {




  if (element === 'MenuItems') {
    return (
      <div className={styles.drawerButtonGroup}>
        {
          buttons.map(button => {
            return menuItem(button.DisplayName, button.href)
          })}
      </div>

    )
  }
  return (

    <div role="group" className={styles.headerButtonGroup}>
      {
        buttons.map(button => {
          return buttonItem(button.DisplayName, button.href)
        })
      }
    </div>
  )
}




class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });


  render() {
    const { classes } = this.props;
    return (
      <div className={styles.root} id="navBar">
        <CssBaseline />
        <HideOnScroll {...this.props}>
          <AppBar
            position="fixed"
            elevation={0}
            color="default"
            className={classes.appBar}

          >
            <Toolbar className={classes.toolbar1}>
              <div className={classes.burgerButton}>
                <IconButton

                  edge="start"
                  color="primary"
                  aria-label="Menu"
                  onClick={this.handleToggle}
                >
                  <MenuIcon />
                </IconButton>
              </div>
              <Typography className={classes.header} variant="h5" noWrap>
                Virginia Florian
          </Typography>

            </Toolbar>
            <Toolbar className={classes.toolbar2}>
              {menuButtons()}
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Drawer
          id="Drawer"
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
        > <Hidden smUp>
            {menuButtons('MenuItems')}
          </Hidden>
          {menuItem('Sign In', 'Login')}

        </Drawer>
      </div >
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);

