import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavLink, Container } from "reactstrap";
import { Link } from "react-router-dom";
// import { logoutUser } from "../../actions/authAction";
// import { connect } from "react-redux";

// eslint-disable-next-line react/require-render-return
class NavBar extends Component {
  state = {
    isOpen: false
  };

  // toggle = () => {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <Link to="/App">Chat App</Link>
            {/* <NavbarBrand href="/">Chat App</NavbarBrand> */}
            {/* <NavbarToggler onClick={this.toggle} /> */}
            {/* <Collapse isOpen={this.state.isOpen} navbar> */}
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="https://github.com/nandangrover/">
                  Github
                </NavLink>
              </NavItem>
            </Nav>
            {/* </Collapse> */}
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
// export default AppNavBar;
