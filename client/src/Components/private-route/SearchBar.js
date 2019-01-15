import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { getUsers } from "../../actions/userAction";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      search: ""
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
              name="search"
              value={this.state.search}
            />
            <ListGroup>
              {users.map(({ username }) => (
                <ListGroupItem key={username} tag="a" href="#">
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
  users: state.users
});

export default connect(
  mapStateToProps,
  { getUsers }
)(SearchBar);
// export default SearchBar;
