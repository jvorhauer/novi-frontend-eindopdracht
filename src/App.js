import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Profile from "./pages/notes/Profile";
import Home from "./pages/home/Home";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import ViewNote from "./pages/notes/ViewNote";
import ListUsers from "./pages/users/ListUsers";
import "./App.css";


function App() {
  return (
    <main role="main">
      <Header />
      <div className="centered">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route path="/profile/:id" component={Profile} />
          <Route exact path="/users">
            <ListUsers />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="/view/:id/:mode" component={ViewNote} />
        </Switch>
      </div>
    </main>
  );
}

export default App;
