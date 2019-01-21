import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Container } from "reactstrap";
// import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authAction";
import { setNavUser } from "../../actions/navBarAction";
import { connect } from "react-redux";
import SearchBar from "./SearchBar";
import SideMenu from "./SideMenu";

// eslint-disable-next-line react/require-render-return
class AppNavBar extends Component {
  state = {
    isOpen: false,
    showMenu: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  setMenuState(props) {
    this.setState({ showMenu: props });
  }
  makeMenu = e => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    // console.log(this.props.nav);
    
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <SearchBar />
            <NavbarBrand href="#">{this.props.nav.user}</NavbarBrand>
            {/* <NavbarToggler onClick={this.toggle} /> */}
            {/* <Collapse isOpen={this.state.isOpen} navbar> */}
            <Nav className="ml-auto" navbar>
              <NavItem>
                {/* <Link to="/" onClick={this.onLogoutClick}>
                  Logout
                </Link> */}
                <span
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={this.makeMenu}
                >
                  &#9776;
                </span>
                {this.state.showMenu ? (
                  <SideMenu showMenu={this.setMenuState.bind(this)} />
                ) : null}
              </NavItem>
            </Nav>
            {/* </Collapse> */}
          </Container>
        </Navbar>
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
  { logoutUser, setNavUser }
)(AppNavBar);
// export default AppNavBar;
