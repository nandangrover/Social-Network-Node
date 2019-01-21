import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getTree, getItems, deleteItem, onUpdate } from "../../../actions/userAction";
import { setNavUser } from "../../../actions/navBarAction";
import ChatModal from "./ChatModal";
import { socket } from "../App";
import MessageTime from "../MessageTime";
import PropTypes from "prop-types";
// import openSocket from "socket.io-client";

// let params = (new URL(document.location)).searchParams;


class PrivateChatRoom extends Component {
  state ={
   chatId:"",
   user: "",
   params: ""
  }
  componentDidMount() {
    let params = (new URL(document.location)).searchParams;
    this.setState({chatId: params.get('id'),user:this.props.auth.user.username,params: atob(params.get('u'))})
    this.props.getItems(params.get('id'));
    this.props.setNavUser(atob(params.get('u')))
    // socket.emit("privateChat", { room:params.get('id'), message: "hello" })

    //Private socket
      socket.on('hi',function(data) {
         document.body.innerHTML = '';
         document.write(data);
      });

    socket.on(`${params.get('id')}`, data => {
      this.props.onUpdate(data);
      
    })
    // socket.emit("privateChat", { room:params.get('id'), message: "hello" });

    socket.on("update", data => {
      this.props.onUpdate(data);
    });
  }
  componentDidUpdate() {
    const scrollElem = document.getElementsByClassName("ContainerScrollBar");
    scrollElem[0].scrollTop = scrollElem[0].scrollHeight;
    // console.log(this.props.users.tree[0].chatId);
  }
  onDeleteClick = id => {
    this.props.deleteItem(id);
    socket.emit("delete", { message: id });
    socket.on("delete", id => {
      this.props.deleteItem(id.message);
    });
  };
  render() {
    const { items } = this.props.item;
    // console.log(items);
    
    return (
      <Container>
        {/* <ListGroup style={{ wordBreak: "break-all" }}> */}
        <TransitionGroup className="Shopping-list" />
        <div className="ContainerScrollBar">
          {/* <ScrollArea
            speed={0.8}
            className="area"
            contentClassName="content"
            horizontal={false}
          > */}
          {items.map(({ _id, text, date, from }) => (
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
                    {from}
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
                  {text}
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
                </div>
              </div>
            </CSSTransition>
          ))}
          {/* </ScrollArea> */}
        </div>
  <ChatModal currentSession={{chatId: this.state.chatId,from:this.state.user,to:this.state.params}}/>
        {/* </ListGroup> */}
      </Container>
    );
  }

  componentWillUnmount(){
    socket.removeListener('update');
  }
}

PrivateChatRoom.propTypes = {
  item: PropTypes.object.isRequired,
  getItems: PropTypes.func.isRequired,
};
PrivateChatRoom.contextTypes = {
  scrollArea: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  item: state.item,
  nav: state.nav

});
export default connect(
  mapStateToProps,
  { getTree, getItems, deleteItem, setNavUser, onUpdate }
)(PrivateChatRoom);
