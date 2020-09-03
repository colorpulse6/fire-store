import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";

import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import NavStyles from "./navigation.module.scss";

import bookImage from '../imgs/book.png'

const Navigation = () => (
  <div>
    <AuthUserContext>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext>
  </div>
);

const NavigationAuth = () => (
  <div className={NavStyles.container}>
    <li>
      <Link to={ROUTES.LANDING}><img src={bookImage} className={NavStyles.bookImage}></img></Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.YOUR_SHELF}>Your Shelf</Link>
    </li>
    <li>
      <AuthUserContext>
        {(authUser) => (
          <Link to={ROUTES.YOUR_SHELF}>{authUser.displayName}</Link>
        )}
      </AuthUserContext>
    </li>
    {/* <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li> */}
    <li>
      <SignOutButton />
    </li>
  </div>
);

const NavigationNonAuth = () => (
  <div className={NavStyles.container}>
    <li>
      <Link to={ROUTES.LANDING}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </div>
);

export default Navigation;
