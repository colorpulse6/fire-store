import React from 'react';

 //The createContext() function essentially creates two components. The FirebaseContext.Provider component is used to provide a Firebase instance once at the top-level of your React component tree, which we will do in this section; and the FirebaseContext.Consumer component is used to retrieve the Firebase instance if it is needed in the React component.

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
 
export default FirebaseContext;