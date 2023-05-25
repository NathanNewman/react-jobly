import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { logout } from './helpers/auth';
import { AuthContext } from './helpers/AuthContext';

const JoblyNavbar = () => {
  const history = useHistory();
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    history.push('/login');
  };

  return (
    <Navbar color="light" light expand="md">
      <Link to="/" className="navbar-brand text-dark">Jobly</Link>
      <Nav className="ml-auto" navbar>
        {authenticated ? (
          <>
            <NavItem>
              <NavLink tag={Link} to="/companies" className="text-secondary">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/jobs" className="text-secondary">Jobs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/profile" className="text-secondary">Profile</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} onClick={handleLogout} to="/" className="text-secondary">Log Out</NavLink>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <NavLink tag={Link} to="/login" className="text-secondary">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/sign-up" className="text-secondary">Sign Up</NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default JoblyNavbar;