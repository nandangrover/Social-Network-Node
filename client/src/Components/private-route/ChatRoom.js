import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, onUpdate } from "../../actions/itemActions";
import { socket } from "./App";
// import ScrollArea from "react-scrollbar";
// import moment from 'moment';
import MessageTime from "./MessageTime";
import PropTypes from "prop-types";

class ChatRoom extends Component {
  componentDidMount() {
    this.props.getItems();
    socket.on("update", data => {
      console.log("counter|||||");
      
      this.props.onUpdate(data);
    });
  }
  componentDidUpdate() {
    const scrollElem = document.getElementsByClassName("ContainerScrollBar");
    scrollElem[0].scrollTop = scrollElem[0].scrollHeight;
  }
  onDeleteClick = id => {
    // this.props.deleteItem(id);
    socket.emit("delete", { message: id });
    socket.on("delete", id => {
      this.props.deleteItem(id.message);
    });
  };
  render() {
    
    const { items } = this.props.item;
    // console.log(items);

    // this.ScrollArea.refresh();
    // console.log(items);

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
        <TransitionGroup className="Shopping-list" />
        <div className="ContainerScrollBar">
          {/* <ScrollArea
            speed={0.8}
            className="area"
            contentClassName="content"
            horizontal={false}
          > */}
          {items.map(({ _id, name, date, userName }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              {/* <ListGroupItem */}
              <div
                className="textWrapper"
                style={{ right: "0px", position: "relative" }}
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
                </div>
                <div
                  style={{
                    marginBottom: "1em",
                    backgroundColor: "rgba(164, 255, 168, 0.85)",
                    maxWidth: "244px",
                    borderRadius: "13px",
                    padding: "12px",
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
                    style={{ position: "absolute", right: "7px", top: "7px" }}
                  >
                    &times;
                  </Button>
                  <MessageTime date={date} />
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
          {/* </ScrollArea> */}
        </div>
        {/* </ListGroup> */}
      </Container>
    );
  }

  componentWillUnmount(){
    socket.removeListener('update');
  }
}

ChatRoom.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};
ChatRoom.contextTypes = {
  scrollArea: PropTypes.object
};
const mapStateToProps = state => ({
  item: state.item,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getItems, deleteItem, onUpdate }
)(ChatRoom);
