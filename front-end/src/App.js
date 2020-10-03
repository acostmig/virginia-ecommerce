import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Switch, Redirect } from "react-router-dom";



import Login from "./views/LoginPage";
//import Menu from "./views/MenuPage";
import Home from "./views/HomePage";
import ProductPage from "./views/ProductPage";
import About from "./views/AboutPage";
import Cart from "./views/CartPage";



const homeRedirect = () => <Redirect to='/home' />
const shopItemRedirect = () => <Redirect to='/shop/1' />

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
            <Route exact path="/shop" component={shopItemRedirect} />
            <Route path="/shop/:entityID" component={ProductPage} />
            <Route exact path="/cart" component={Cart} />

            <Route component={homeRedirect} />

          </Switch>
        </div>
      </div>

    );
  }
}

export default App;
