import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const { user, logout } = useContext(AuthContext);

  function activate(here) {
    return path === here ? "active" : "";
  }

  return (
    <header>
      <nav>
        <ul>
          <li className="bigger">
            <Link className="home-link" to="/">
              <i className="fas fa-user-edit" title="Noviaal"></i>&nbsp;Noviaal
            </Link>
          </li>
          {!user && (
            <>
              <li><Link className={activate("signin")} to="/signin">Aanmelden</Link></li>
              <li><Link className={activate("signup")} to="/signup">Registreren</Link></li>
            </>
          )}
          {user && (
            <>
              <li><Link className={activate("")} to="/">Home</Link></li>
              <li><Link className={activate("profile")} to="/profile">Notities</Link></li>
              <li><Link className={activate("users")} to="/users">Gebruikers</Link></li>
              <li className="loggedin">
                <strong>Aangemeld als {user.username}</strong>&nbsp;
                <a href="/" onClick={() => logout()}>afmelden</a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
