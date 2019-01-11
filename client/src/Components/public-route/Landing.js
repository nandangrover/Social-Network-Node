import React, { Component } from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row" style={{ margin: "auto" }}>
            <div className="col s12 center-align">
              <h4>Social Network</h4>
              <p className="flow-text grey-text text-darken-1">Hello World.</p>
              <br />
              <Link
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                to="/Register"
              >
                Register
              </Link>
              <Link
                style={{
                  marginLeft: "2rem",
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect white hoverable black-text"
                to="/Login"
              >
                {" "}
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
