import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import ChatRoom from "./ChatRoom";
import ItemModal from "./ItemModal";
import { Container } from "reactstrap";
import AppNavBar from "./AppNavBar";
import openSocket from "socket.io-client";
// import SideNavBar from "./SearchBar";
// import { Provider } from 'react-redux';
// import store from '../store';
const socket =
  window.location.hostname === "127.0.0.1"
    ? openSocket("http://127.0.0.1:5000")
    : openSocket(window.location.hostname);
class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <div className="App">
        <Container>
          <AppNavBar />
          <ChatRoom />
          <ItemModal />
        </Container>
      </div>
      // </Provider>
    );
  }
}
export { socket };
export default App;
