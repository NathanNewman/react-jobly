import React, { useContext } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { logout } from "./helpers/auth";
import "./background.css";

function Home() {
  const history = useHistory();
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    history.push("/");
  };

  return (
    <div className="background">
      <h1 className="text-white font-weight-bold">Jobly</h1>
      {authenticated ? (
        <div>
          <p className="text-white">
            Welcome back! {localStorage.getItem("username")}
          </p>
          <div className="button-group">
            <Button color="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <p className="text-white">All the jobs in one, convenient place.</p>
            <div className="button-group"></div>
            <Button color="primary" href="/login">
              Login
            </Button>
            <Button
              style={{ marginLeft: "30px" }}
              href="sign-up"
              color="primary"
              onClick={handleLogout}
            >
              Sign Up
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
