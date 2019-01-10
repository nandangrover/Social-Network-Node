import React, { Component } from "react";
import { Badge } from "reactstrap";
import moment from "moment";

class MessageTime extends Component {
  constructor(props) {
    super(props);
    this.state = { date: moment(this.props.date).fromNow() };
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      date: moment(this.props.date).fromNow()
    });
  }
  render() {
    return (
      <Badge
        pill
        title={moment(this.props.date).toString()}
        style={{
          backgroundColor: "white",
          color: "gray",
          position: "relative",
          fontSize: "10px",
          top: "4px",
          display: "table-cell"
        }}
      >
        {this.state.date}
      </Badge>
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
}
export default MessageTime;
