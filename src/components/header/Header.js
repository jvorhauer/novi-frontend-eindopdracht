import React, {useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import "./Header.css";

function Header() {
  const history = useHistory();
  const {user, logout} = useContext(AuthContext);

  return (
    <header>
      {!user && (
        <>
          <div className="menu">
            <Link to="/">Home</Link>&nbsp;
          </div>
          <div className="auth">
            <button type="button" onClick={() => history.push("/signin")}>
              Aanmelden
            </button>
            <button type="button" onClick={() => history.push("/signup")}>
              Registreren
            </button>
          </div>
        </>
      )}
      {user && (
        <>
          <div className="menu">
            <Link to="/">Home</Link>&nbsp;
            <Link to="/profile">Mijn notities</Link>&nbsp;
            <Link to="/add">Nieuwe notitie</Link>&nbsp;
          </div>
          <div className="auth">
            <strong>Aangemeld als {user.username}</strong>&nbsp;
            (<a href="/" onClick={() => logout()}>afmelden</a>)
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
