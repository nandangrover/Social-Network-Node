import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import AppNavBar from './AppNavBar';
import ChatRoom from './ChatRoom';
import ItemModal from './ItemModal';
import { Container } from 'reactstrap';
import openSocket from "socket.io-client";
// import { Provider } from 'react-redux';
// import store from '../store';
const socket = window.location.hostname === 'localhost' ? openSocket('http://localhost:5000') : openSocket(window.location.hostname);
class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <Container>
          <ItemModal />
          <ChatRoom />
        </Container>
      </div>
      // </Provider>
    );
  }
}
export { socket };
export default App;
