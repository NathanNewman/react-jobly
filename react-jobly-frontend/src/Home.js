import React, { useContext } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { logout } from "./helpers/auth";
import "./home.css";

function Home() {
  const history = useHistory();
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    history.push('/');
  };

  return (
    <div className="home">
      <h1 className="text-white font-weight-bold">Jobly</h1>
      <p className="text-white">All the jobs in one, convenient place.</p>
      <div className="button-group">
        {authenticated ? (
          <Button color="danger" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="primary" href="/login">
              Login
            </Button>
            <Button
              style={{ marginLeft: "30px" }}
              color="primary"
              onClick={handleLogout}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
