import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Theme from "./components/Theme";

import Login from "./views/LoginPage";
import Menu from "./views/MenuPage";
import Home from "./views/HomePage";
import ProductPage from "./views/ProductPage";
import About from "./views/AboutPage"


//window.$internal = { slim: 'http://35.174.39.18' };
window.$internal = { slim: 'http://localhost/api' };


axios.interceptors.request.use((config) => {


  let token = localStorage.getItem('token');


  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        'Authorization': token,
        'Cache-Control': 'no-cache,no-store,must-revalidate,max-age=-1,private',
        'Expires': '-1',
        'pragma': 'no-cache',
      }
    }
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      'X-Real-IP': localStorage.remoteAddress
    }
  }

}, (error) => {
  return Promise.reject(error);

});
const routing = (
  <Router>
    <div>
      <ThemeProvider theme={Theme}>
        <App />

      </ThemeProvider >

    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
