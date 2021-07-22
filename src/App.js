import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Profile from "./pages/notes/Profile";
import Home from "./pages/home/Home";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import AddNote from "./pages/notes/AddNote";
import ViewNote from "./pages/notes/ViewNote";

import "./App.css";


function App() {
  return (
    <>
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="/add">
            <AddNote />
          </Route>
          <Route path="/view/:id" component={ViewNote} />
        </Switch>
      </div>
    </>
  );
}

export default App;
