import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { CurrentUserContext } from "../contexts/currentUser";

const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Medium
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" exact>
              Home
            </NavLink>
          </li>
          {currentUserState.isLoggedIn === false && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Sign up
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {currentUserState.isLoggedIn && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/article/new">
                  <i className="ion-compose">&nbsp; New Post</i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/profiles/${currentUserState.currentUser.username}`}
                >
                  <img
                    src={currentUserState.currentUser.image}
                    alt=""
                    className="user-pic"
                  />
                  &nbsp; {currentUserState.currentUser.username}
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default TopBar;
