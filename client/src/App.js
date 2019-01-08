import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavBar from './Components/AppNavBar';
import ShoppingList from './Components/ShoppingList';
import ItemModal from './Components/ItemModal';
import { Container } from 'reactstrap';
import openSocket from "socket.io-client";
import { Provider } from 'react-redux';
import store from './store';

const socket = openSocket('http://localhost:5000');

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}
export { socket };
export default App;
