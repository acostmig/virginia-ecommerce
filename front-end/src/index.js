import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Theme from "./components/Theme";

import cartReducer from './components/Cart/Reducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';


//window.$internal = { slim: 'http://35.174.39.18' };
window.$internal = { slim: 'http://localhost/api' };

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  }
  catch (e) {
    return undefined;

  }
}
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

const store = createStore(cartReducer);
store.subscribe(() => {
  saveState(store.getState());
});

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
    <Provider store={store}>
      <div>
        <ThemeProvider theme={Theme}>
          <App />

        </ThemeProvider >

      </div>
    </Provider>
  </Router >
);

ReactDOM.render(routing, document.getElementById("root"));
