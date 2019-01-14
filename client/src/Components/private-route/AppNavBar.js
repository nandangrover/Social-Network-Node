import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authAction";
import { connect } from "react-redux";

// eslint-disable-next-line react/require-render-return
class AppNavBar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  onLogoutClick = e => {
    e.preventDefault();
    console.log("hereeee AppNavBar");

    this.props.logoutUser();
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Chat App</NavbarBrand>
            {/* <NavbarToggler onClick={this.toggle} /> */}
            {/* <Collapse isOpen={this.state.isOpen} navbar> */}
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/" onClick={this.onLogoutClick}>
                  Logout
                </Link>
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
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(AppNavBar);
// export default AppNavBar;
