import React from 'react';
 
import { withFirebase } from '../Firebase';
import ButtonStyles from '../../constants/buttons.module.scss';
const SignOutButton = ({ firebase }) => (
  <button className={ButtonStyles.removeBook}type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);
 
export default withFirebase(SignOutButton);