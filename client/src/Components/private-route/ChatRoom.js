import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, onUpdate } from "../../actions/itemActions";
import { socket } from "./App";
// import moment from 'moment';
import MessageTime from "./MessageTime";
import PropTypes from "prop-types";

class ChatRoom extends Component {
  state = {
    left: "650px"
  };
  componentDidMount() {
    this.props.getItems();
    socket.on("update", data => {
      this.props.onUpdate();
    });
  }
  onDeleteClick = id => {
    this.props.deleteItem(id);
    socket.emit("update", { message: "updated" });
  };
  render() {
    const { items } = this.props.item;
    console.log(items);

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
        {/* <ListGroup style={{ wordBreak: "break-all" }}> */}
        {/* <TransitionGroup className="Shopping-list" /> */}
        <div className="Container">
          {items.map(({ _id, name, date, userName }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              {/* <ListGroupItem */}
              <div
                className="textWrapper"
                style={{ left: "650px", position: "relative" }}
              >
                <div
                  className="userDetails"
                  style={{
                    fontWeight: "bold",
                    position: "relative",
                    width: "250px"
                  }}
                >
                  <div
                    className="userName"
                    style={{
                      marginLeft: "9px",
                      fontSize: "16px",
                      marginBottom: "0px"
                    }}
                  >
                    {userName}
                  </div>
                  <MessageTime date={date} />
                </div>
                <div
                  style={{
                    marginBottom: "1em",
                    backgroundColor: "#a4ffa8d9",
                    maxWidth: "160px",
                    borderRadius: "70px",
                    padding: "10px",
                    height: "auto",
                    wordBreak: "break-word",
                    position: "relative"
                  }}
                  className="chats"
                  id={_id}
                >
                  {name}
                  <Button
                    close
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                    style={{ position: "absolute", right: "7px" }}
                  >
                    &times;
                  </Button>
                  {/* <Badge pill
                  title={moment(date).toString()}
                  style={{ marginLeft: '10px', backgroundColor: 'white', color: 'gray', position: 'relative', top: '4px' }}>{moment(date).fromNow()}
                </Badge> */}
                  {/* <MessageTime date={date} /> */}
                  {/* </ListGroupItem> */}
                </div>
              </div>
            </CSSTransition>
          ))}
        </div>
        {/* </ListGroup> */}
      </Container>
    );
  }
}

ChatRoom.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getItems, deleteItem, onUpdate }
)(ChatRoom);
