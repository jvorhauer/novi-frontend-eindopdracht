import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const {user, logout} = useContext(AuthContext);

  function activate(here) {
    return path === here ? "active" : "";
  }

  return (
    <header>
      <div class="logo">
        <Link to="/">
          <img src="/logo_transparent.png" alt="Noviaal" />
        </Link>
      </div>
      <nav>
        {!user && (
          <ul>
            <li><Link className={activate("")} to="/">Home</Link></li>
            <li><Link className={activate("signin")} to="/signin">Aanmelden</Link></li>
            <li><Link className={activate("signup")} to="/signup">Registreren</Link></li>
          </ul>
        )}
        {user && (
          <ul>
            <li><Link className={activate("")} to="/profile">Home</Link></li>
            <li><Link className={activate("add")} to="/add">Nieuwe notitie</Link></li>
            <li><Link className={activate("users")} to="/users">Gebruikers</Link></li>
            <li><span class="spacer"></span></li>
            <li>
              <strong>Aangemeld als {user.username}</strong>&nbsp;
              <a href="/" onClick={() => logout()}>afmelden</a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
