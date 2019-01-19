import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { logoutUser } from "../../actions/authAction";
import { connect } from "react-redux";

// eslint-disable-next-line react/require-render-return
class SideMenu extends Component {
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  hideMenu = e => {
    this.props.showMenu(false);
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
      <div
        className="menuHolder"
        style={{
          backgroundColor: "rgba(0,0,0,0.42)",
          height: "1010px",
          width: "230px",
          borderRadius: "9px",
          margin: "0px -30px 0px 0px",
          zIndex: "40",
          position: "relative"
        }}
      >
        <div
          className="close"
          style={{
            display: "inline-block",
            position: "relative",
            top: "440px",
            color: "#edf6ff",
            fontSize: "30px",
            width: "30px",
            height: "30px",
            cursor: "pointer",
            zIndex: "50"
          }}
          onClick={this.hideMenu}
        >
          X
        </div>
        <div
          className="username"
          style={{
            position: "relative",
            top: "431px",
            color: "white",
            fontSize: "21px",
            left: "31px",
            padding: "10px 41px 10px 43px",
            fontFamily: "verdana"
          }}
        >
          {this.props.auth.user.username}
        </div>
        <div className="directMsg">
          <span
            style={{
              position: "relative",
              top: "408px",
              color: "black",
              fontSize: "19px",
              borderRadius: "-155px",
              backgroundColor: "#dff0ff",
              padding: "10px 41px 10px 43px",
              border: "-1px solid",
              fontFamily: "verdana"
            }}
          >
            Direct Message
          </span>

          <ListGroup
            className="userHodler"
            style={{
              position: "relative",
              top: "410px",
              left: "1px",
              height: "256px",
              overflowY: "scroll",
              overflowX: "hidden"
            }}
          >
            <ListGroupItem color="success">Cras justo odio</ListGroupItem>
            <ListGroupItem color="success">
              Dapibus ac facilisis in
            </ListGroupItem>
            <ListGroupItem color="success">Morbi leo risus</ListGroupItem>
            <ListGroupItem color="success">
              Porta ac consectetur ac
            </ListGroupItem>
          </ListGroup>
        </div>
        <div className="logout">
          <Link
            to="/"
            onClick={this.onLogoutClick}
            style={{
              position: "relative",
              top: "540px",
              textAlign: "center",
              backgroundColor: "#333a40"
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(SideMenu);
// export default AppNavBar;
