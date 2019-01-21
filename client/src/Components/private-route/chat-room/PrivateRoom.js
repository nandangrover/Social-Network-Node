import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../App.css";
import PrivateChatRoom from "./PrivateChatRoom";
import { Container } from "reactstrap";
import AppNavBar from "../AppNavBar";
import openSocket from "socket.io-client";
// import openSocket from "socket.io-client";
// import SideNavBar from "./SearchBar";
// import { Provider } from 'react-redux';
// import store from '../store';
let params = (new URL(document.location)).searchParams;
const socket =
  window.location.hostname === "127.0.0.1"
    ? openSocket(`http://127.0.0.1:5000/${params.get('id')}`)
    : openSocket(`${window.location.hostname}/${params.get('id')}`);
class PrivateRoom extends Component {
  render() {
    return (
      // <Provider store={store}>
      <div className="PrivateRoom">
        <Container>
          <AppNavBar />
          <PrivateChatRoom />
        </Container>
      </div>
      // </Provider>
    );
  }
}
export { socket };
export default PrivateRoom;
