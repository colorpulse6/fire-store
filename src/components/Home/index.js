import React from "react";
import GoogleBooks from "../GoogleBooks"
import { withAuthorization } from "../Session";
import { AuthUserContext } from "../Session";

class HomePage extends React.Component {
 
  render() {
   
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <h1>Hello {authUser.displayName} </h1>
            <GoogleBooks />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
