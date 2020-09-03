import React from "react";
import GoogleBooks from "../GoogleBooks"
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";

class HomePage extends React.Component {

  render() {
    const { authUser } = this.context;
    console.log(authUser)
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <GoogleBooks />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
