import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { logout } from "./helpers/auth";
import { AuthContext } from "./helpers/AuthContext";

const JoblyNavbar = () => {
  const history = useHistory();
  const { authenticated, setAuthenticated, username } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    history.push("/login");
  };

  return (
    <Navbar color="light" light expand="md">
      <Link to="/" className="navbar-brand text-dark">
        Jobly
      </Link>
      <Nav className="ml-auto" navbar>
        {authenticated ? (
          <>
            <NavItem>
              <Link to="/companies" className="nav-link text-secondary">
                Companies
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/jobs" className="nav-link text-secondary">
                Jobs
              </Link>
            </NavItem>
            <NavItem></NavItem>
            <NavItem>
              <Link
                to={`/profile/${username}`}
                className="nav-link text-secondary"
              >
                Profile
              </Link>
            </NavItem>
            <NavItem>
              <Link
                onClick={handleLogout}
                to="/"
                className="nav-link text-secondary"
              >
                Log Out
              </Link>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <Link to="/login" className="nav-link text-secondary">
                Login
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/sign-up" className="nav-link text-secondary">
                Sign Up
              </Link>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default JoblyNavbar;
