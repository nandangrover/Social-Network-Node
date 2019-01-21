import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { getUsers, storeCurrentRoomUsers, getTree } from "../../actions/userAction";
import { setNavUser } from "../../actions/navBarAction";


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      search: "",
      username:"",
      store: {
        from:"",
        to:""
      }
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value !== "") {
      this.props.getUsers(e.target.value);
    } else {
      this.props.users.users = [];
    }
    // console.log(e.target.value);
  };
  storeId = e => {
    this.setState({store:{to: e.target.id, from: this.props.auth.user.id}, username: e.target.name}, () => {
    this.props.storeCurrentRoomUsers(this.state.store);
    const from =  this.state.store.from;
    const to =  this.state.store.to;
    this.props.getTree(from, this.props.history,this.state.username, to);
    
    this.props.setNavUser(this.state.username);
    this.toggle();
      
    })
  };
  render() {
    const closeBtn = (
      <button className="close" onClick={this.toggle}>
        &times;
      </button>
    );
    const { users } = this.props.users;

    return (
      <div>
        {/* <div id="search" className="searchBar">
          <span
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={this.toggle}
          >
            <i className="fa fa-search" />
          </span>
        </div> */}
        <div id="search" className="searchBar">
          <span
            style={{ fontSize: "30px", cursor: "pointer" }}
            onClick={this.toggle}
          >
            <i className="fa fa-search" />
          </span>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} close={closeBtn}>
            Search Users
          </ModalHeader>
          <ModalBody>
            <input
              placeholder="Search"
              onChange={this.onChange}
              autoComplete="off"
              spellCheck="false"
              name="search"
              value={this.state.search}
            />
            <ListGroup>
              {users.map(({ username, _id }) => (
                <ListGroupItem
                  key={username}
                  tag="a"
                  name={username}
                  onClick={this.storeId}
                  style={{"cursor":"pointer"}}
                  id={_id}
                >
                  {username}
                </ListGroupItem>
              ))}
              {/* <ListGroupItem disabled tag="a" href="#">
                Nandan
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Amit
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Nandan
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Nandan
              </ListGroupItem>
              <ListGroupItem tag="a" href="#">
                Nandan
              </ListGroupItem> */}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Search
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth,
  nav: state.nav
});

export default connect(
  mapStateToProps,
  { getUsers, storeCurrentRoomUsers, getTree, setNavUser }
)(withRouter(SearchBar));
// export default SearchBar;
