import React, { Component } from "react";
// import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
// import Button from "@material-ui/core/Button";
// import Icon from "@material-ui/core/Icon";
// mport SaveIcon from '@material-ui/icons/Save';
import { connect } from "react-redux";
import { addItem } from "../../actions/itemActions";
import { socket } from "./App";
// import TextField from "@material-ui/core/TextField";

class ItemModal extends Component {
  state = {
    modal: false,
    name: "",
    placeholder: "Type a message"
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      userName: this.props.auth.user.name,
      userId: this.props.auth.user.id
    };
    this.props.addItem(newItem);
    this.toggle();
    this.setState({ name: "" });

    socket.emit("update", { message: newItem });
  };

  render() {
    return (
      <div>
        <div
          className="chatFooter"
          style={{ display: "inline-flex", outline: "none" }}
        >
          <textarea
            className="inputArea"
            placeholder={this.state.placeholder}
            onChange={this.onChange}
            name="name"
            value={this.state.name}
            style={{
              marginTop: "0px",
              marginBottom: "0px",
              width: "797px",
              marginLeft: "18px",
              left: "10px",
              resize: "none",
              backgroundColor: "#fffdfd",
              height: "34px",
              outline: "none",
              borderRadius: "5px",
              marginRight: "11px"
            }}
          />
          <button
            className="sendButton"
            onClick={this.onSubmit}
            style={{
              width: "100px",
              display: "table-cell",
              border: "none",
              color: "white",
              backgroundColor: "#2996f7",
              borderRadius: "5px",
              fontSize: "16px",
              fontFamily: "verdana",
              cursor: "pointer"
            }}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
