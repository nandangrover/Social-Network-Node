import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";
import { storeCurrentRoomUsers, getTree } from "../../actions/userAction";
import { logoutUser } from "../../actions/authAction";
import { connect } from "react-redux";

// eslint-disable-next-line react/require-render-return
class SideMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      to: "",
    }
  }
  
  onUserClick = (username, users) => {
    let to = 0;
    users.forEach(id => {
      if(id!==this.props.auth.user.id){
        to = id;
        this.setState({to: id})
      }
    })
    // console.log(this.state.to);
    
    this.props.getTree(this.props.auth.user.id, this.props.history, username, to);
  }
  hideMenu = e => {
    this.props.showMenu(false);
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    // console.log(this.props.nav);
    
    return (
      <div
        className="menuHolder"
        style={{
          backgroundColor: "#f8f9fa",
          height: "1010px",
          width: "278px",
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
            color: "#020202",
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
            color: "#000000",
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
              color: "#FFFFFF",
              fontSize: "19px",
              borderRadius: "-155px",
              backgroundColor: "#333a40",
              padding: "10px 55px 10px 77px",
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
              top: "450px",
              left: "1px",
              height: "256px",
              color: "black",
              fontFamily: "verdana",
              overflowY: "scroll",
              overflowX: "hidden",
              cursor: "pointer"
            }}
          >
           <ListGroupItem className="justify-content-between" 
             key="group"
             onClick={() => this.props.history.push('/App')}
             >Group<Badge pill>14</Badge></ListGroupItem>
          {this.props.nav.chatHistory.map(({username,_id, user}) => (
             <ListGroupItem className="justify-content-between" 
             key={_id}
             onClick={() => this.onUserClick(username, user)}
             >{username}<Badge pill>14</Badge></ListGroupItem>
          ))}
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
  auth: state.auth,
  nav: state.nav
});

export default connect(
  mapStateToProps,
  { logoutUser, getTree }
)(withRouter(SideMenu));
// export default AppNavBar;
