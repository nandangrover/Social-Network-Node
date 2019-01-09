import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import openSocket from "socket.io-client";
import App from './Components/App';
import Landing from './Components/Landing';
import Register from './Components/Register';
import Login from './Components/Login';
import AppNavBar from './Components/AppNavBar';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <AppNavBar />
    <Route exact path="/" component={Landing} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

// export { socket };
export default Root