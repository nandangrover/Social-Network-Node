import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Badge } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, onUpdate } from '../actions/itemActions';
import { socket } from "./App";
import moment from 'moment';
import PropTypes from 'prop-types';

class ChatRoom extends Component {

  componentDidMount() {
    this.props.getItems();
    socket.on('update', (data) => {
      this.props.onUpdate()
    })
  }
  onDeleteClick = (id) => {
    this.props.deleteItem(id);
    socket.emit('update', { message: 'updated' })
  }
  render() {
    const { items } = this.props.item;
    return (
      <Container>
        {/* <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={() => {
            const name = prompt('Enter Item');
            if (name) {
              this.setState(state => ({
                items: [...state.items, { id: uuid(), name }]
              }))
            }
          }}
        >Add Item
        </Button> */}
        <ListGroup style={{ wordBreak: 'break-all' }}>
          <TransitionGroup className="Shopping-list">
          </TransitionGroup>
          {items.map(({ _id, name, date }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem style={{ marginBottom: '1em' }} className="justify-content-between">
                <Button close
                  color="danger"
                  size="sm"
                  onClick={this.onDeleteClick.bind(this, _id)}
                  style={{ position: 'absolute', right: '7px' }}
                >&times;</Button>
                {name}
                <Badge pill
                  title={moment(date).toString()}
                  style={{ marginLeft: '10px', backgroundColor: 'white', color: 'gray', position: 'relative', top: '4px' }}>{moment(date).fromNow()}
                </Badge>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </ListGroup>
      </Container>
    )
  }
}

ChatRoom.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  item: state.item
})
export default connect(mapStateToProps, { getItems, deleteItem, onUpdate })(ChatRoom);