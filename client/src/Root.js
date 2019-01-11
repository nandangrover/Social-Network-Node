import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
// import openSocket from "socket.io-client";
import App from "./Components/private-route/App";
import Landing from "./Components/public-route/Landing";
import Register from "./Components/public-route/Register";
import Login from "./Components/public-route/Login";
// import AppNavBar from './Components/private-route/AppNavBar';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import PrivateRoute from "./Components/private-route/PrivateRoute";
// import Dashboard from "./components/dashboard/Dashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        {/* <AppNavBar /> */}
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
          <PrivateRoute exact path="/App" component={App} />
        </Switch>
        {/* <Route exact path="/App" component={App} /> */}
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

// export { socket };
export default Root;
