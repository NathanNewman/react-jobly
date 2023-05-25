import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import JoblyNavbar from "./JoblyNavbar";
import Home from "./Home";
import Forms from "./Forms";
import { loginFields } from "./helpers/formFields";
import { signupFields } from "./helpers/formFields";
import JoblyApi from "./helpers/api";
import List from "./List"

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
              <List fetchData={JoblyApi.fetchCompanies} />
            </Route>
            <Route exact path="/jobs">
              <List fetchData={JoblyApi.fetchJobs} />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
