import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard.js";
// import { Login } from "./components/Login/Login.js";
// import { Signup } from "./components/Signup/Signup.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import { Admin } from "./components/Admin.js";
import { Home } from "./components/Home/Home.js";
import { QuestionsPerso } from "./components/QuestionsPerso/QuestionsPerso.js";
import { Dilemme } from "./components/Dilemme/Dilemme.js";
import { Results } from "./components/Results/Results.js";
import { Annexe } from "./components/Annexe/Annexe.js";
// import { Login } from "./components/Login/Login.js";
import { MBTI } from "./components/MBTI/MBTI.js";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/questions" component={ QuestionsPerso } />
            <Route exact path="/dilemme" component={ Dilemme } />
            <Route exact path="/annexe" component={ Annexe } />
            <Route exact path="/mbti" component={ MBTI } />
            <Route exact path="/resultats" component={ Results } />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            {/* <Route exact path="/login" component={ Login } /> */}
          </Switch>
        </div>
      </div>
    );
  }
}
export default App;