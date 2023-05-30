import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import JoblyNavbar from "./JoblyNavbar";
import Home from "./Home";
import Forms from "./Forms";
import { loginFields, signupFields, profileFields } from "./helpers/formFields";
import List from "./List"
import CompanyDetails from "./CompanyDetails";
import UserProfile from "./UserProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <JoblyNavbar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/sign-up">
              <Forms fields={signupFields} />
            </Route>
            <Route exact path="/login">
              <Forms fields={loginFields} />
            </Route>
            <Route exact path="/companies">
              <List listType="companies" />
            </Route>
            <Route exact path="/companies/:handle">
              <CompanyDetails />
            </Route>
            <Route exact path="/jobs">
              <List listType="jobs" />
            </Route>
            <Route exact path="/applications">
              <List listType="applications" />
            </Route>
            <Route exact path="/profile/:user">
              <Forms fields={profileFields} />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
