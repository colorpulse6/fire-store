import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";

import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";
import NavStyles from "./navigation.module.scss";
import "bulma/css/bulma.css";
import bookImage from "../imgs/book.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => (
  <div>
    <AuthUserContext>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext>
  </div>
);

const NavigationAuth = () => {
  const [isActive, setisActive] = useState(false);

  return (
    <div className={NavStyles.container}>
      <li
        onClick={() => {
          setisActive(false);
        }}
      >
        <Link to={ROUTES.LANDING}>
          <img alt="book" src={bookImage} className={NavStyles.bookImage}></img>
        </Link>
      </li>
      <li
        onClick={() => {
          setisActive(false);
        }}
      >
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <div className={`dropdown ${isActive ? "is-active" : ""}`}>
          <div class="dropdown-trigger">
            <li
              onClick={() => {
                setisActive(!isActive);
              }}
              style={{ borderStyle: "none", cursor: "pointer" }}
              aria-haspopup="true"
              aria-controls="dropdown-menu2"
            >
              <a>Your Shelf</a>
              <span class="icon is-small">
                <FontAwesomeIcon
                  icon={faAngleDown}
                  alt="angle down"
                  style={{ marginLeft: "10px", width: "8px" }}
                />
              </span>
            </li>
          </div>
          
          <div class="dropdown-menu" id="dropdown-menu2" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <Link
                  to={ROUTES.BOOKS_READ}
                  onClick={() => {
                    setisActive(false);
                  }}
                >
                  Books Read
                </Link>
              </div>
              <div class="dropdown-item">
                <Link
                  to={ROUTES.TO_READ_LIST}
                  onClick={() => {
                    setisActive(false);
                  }}
                >
                  Books To Read
                </Link>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li>
        <AuthUserContext>
          {(authUser) => (
            <Link to={ROUTES.ACCOUNT}>{authUser.displayName}</Link>
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
};

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
