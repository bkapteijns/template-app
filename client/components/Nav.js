import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Nav = () => {
  // eslint-disable-next-line
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="navbar-header">
        <Link className="navbar-brand" to={{ pathname: "/" }}>
          Template
        </Link>
      </div>
      <div
        className="container-fluid collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/public">
              Public
            </Link>
          </li>
          {isAuthenticated && (
            <li className="nav-item">
              <Link className="nav-link" to="/private">
                Private
              </Link>
            </li>
          )}
          <li className="nav-item dropdown">
            {isAuthenticated ? (
              <>
                <div
                  className="dropdown-toggle nav-link"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Profile
                </div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <Link className="dropdown-item" to="/profile">
                    Dashboard
                  </Link>
                  <Link className="dropdown-item" to="/images">
                    Images
                  </Link>
                  <Link className="dropdown-item" to="/settings">
                    Settings
                  </Link>
                  <Link className="dropdown-item" to="/admin">
                    Admin
                  </Link>
                  <div className="dropdown-divider" />
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={logout}
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <button
                className="btn nav-link"
                type="button"
                onClick={loginWithRedirect}
              >
                Log In
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
