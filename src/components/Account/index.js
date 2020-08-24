import React from 'react';
 
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import InfoChangeForm from '../InfoChange';

import { AuthUserContext, withAuthorization } from '../Session';
 
const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
  <div>
  <h1>Account: {authUser.displayName}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
    <InfoChangeForm />
   
  </div>
  )}
  </AuthUserContext.Consumer>

);
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AccountPage);