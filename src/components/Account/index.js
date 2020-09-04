import React from 'react';
 
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import InfoChangeForm from '../InfoChange';
import BookStyles from '../GoogleBooks/books.module.scss'
import { AuthUserContext, withAuthorization } from '../Session';
 
const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
  <div className={BookStyles.main}>
  <h1>{authUser.displayName}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
    <InfoChangeForm />
   
  </div>
  )}
  </AuthUserContext.Consumer>

);
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AccountPage);