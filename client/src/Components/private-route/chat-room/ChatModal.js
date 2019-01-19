import React, { Component } from "react";
// import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
// import Button from "@material-ui/core/Button";
// import Icon from "@material-ui/core/Icon";
// mport SaveIcon from '@material-ui/icons/Save';
import { connect } from "react-redux";
import { addItem } from "../../../actions/userAction";

// import uuid from "uuid";
// import { socket } from "./App";
// import TextField from "@material-ui/core/TextField";

class ChatModal extends Component {
  state = {
    modal: false,
    text: "",
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
  onEnter = e => {
    if (e.key === "Enter") {
      this.onSubmit(e);
    }
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.props.currentSession);
    

    const newItem = {
      text: this.state.text,
      chatId: this.props.currentSession.chatId,
      from: this.props.currentSession.from,
      to: this.props.currentSession.to
    };
    this.props.addItem(newItem);
    this.toggle();
    this.setState({ text: "" });
    // socket.emit("update", { message: newItem });
    // console.log(uuid());
  };

  render() {
    return (
      <div
        className="chatFooter"
        style={{
          display: "flex",
          outline: "none",
          marginTop: "7px",
          position: "relative"
        }}
      >
        <input
          className="inputArea"
          placeholder={this.state.placeholder}
          onChange={this.onChange}
          onKeyPress={this.onEnter}
          name="text"
          autoComplete="off"
          spellCheck="false"
          value={this.state.text}
          style={{
            marginTop: "0px",
            marginBottom: "0px",
            // width: "797px",
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
)(ChatModal);
