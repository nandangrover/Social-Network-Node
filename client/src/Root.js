import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import openSocket from "socket.io-client";
import App from './Components/App';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/App" component={App} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

// export { socket };
export default Root