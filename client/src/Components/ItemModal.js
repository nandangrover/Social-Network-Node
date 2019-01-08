import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import { socket } from "./App"

class ItemModal extends Component {
  state = {
    modal: false,
    name: ''
  }


  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name
    }
    this.props.addItem(newItem);
    this.toggle();
    console.log("added");

    socket.emit('update', { message: newItem })
  }

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >Add Message</Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>New Post</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Type Something</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="What's on your mind?"
                  onChange={this.onChange}></Input>
                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                >Post</Button>
              </FormGroup>
            </Form>
          </ModalBody>

        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  item: state.item
})

export default connect(mapStateToProps, { addItem })(ItemModal);