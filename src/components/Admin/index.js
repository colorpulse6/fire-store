import React, { Component } from "react";

import { withFirebase } from "../Firebase";

class AdminPage extends Component {
  state = {
    loading: false,
    users: {},
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", (snapshot) => {
      this.setState({
        users: snapshot.val(),
        loading: false,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Admin</h1>
      </div>
    );
  }
}

export default withFirebase(AdminPage);
