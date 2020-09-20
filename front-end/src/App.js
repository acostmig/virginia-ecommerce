import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import Login from "./views/LoginPage";
import Menu from "./views/MenuPage";
import Home from "./views/HomePage";
import ProductPage from "./views/ProductPage";
import About from "./views/AboutPage"


const homeRedirect = () => <Redirect to='/home' />

class App extends Component {


  render() {
    return (
      <div>
        <Navbar />
        <div className="pages">
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/shop" component={ProductPage} />
            <Route path="/shop/:entityID" component={ProductPage} />
            <Route component={homeRedirect} />

          </Switch>
        </div>
      </div>

    );
  }
}

export default App;
