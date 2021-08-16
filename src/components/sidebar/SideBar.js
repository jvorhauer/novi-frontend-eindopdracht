import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import makeUrl from '../../helpers/MakeUrl'
import makeHeaders from '../../helpers/MakeHeaders'
import './SideBar.css';

function Sidebar() {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const [otherUser, setOtherUser] = useState(null);
  const [error, setError] = useState("");
  const {user, logout} = useContext(AuthContext);
  const {id} = useParams();
  const token = localStorage.getItem("token");


  useEffect(() => {
    setError("");
    if (!user) {
      return;
    }
    const userId = id ? id : user.id;

    async function getOtherUser() {
      try {
        const other = await axios.get(makeUrl(`/api/users/${userId}`), makeHeaders(token));
        setOtherUser(other.data);
      } catch (e) {
        setError(e);
        console.error(e);
        setOtherUser(null);
      }
    }

    if (token && user) {
      getOtherUser();
    }
  }, [token, user, id]);

  function activate(here) {
    return path === here ? "active" : "";
  }

  return (
    <aside className="menu">
      <nav>
        <Link to="/">
          <img src="/linkedin_banner_image_1.png" alt="Noviaal" />
        </Link>
        {otherUser && (
          <ul>
            <li><Link className={activate("")} to="/profile">Mijn notities</Link></li>
            <li><Link className={activate("add")} to="/add">Nieuwe notitie</Link></li>
            <li><Link className={activate("users")} to="/users">Gebruikers</Link></li>
            <li>&nbsp;</li>
            <li>Naam</li>
            <li><strong>{otherUser.name}</strong></li>
            <li>Email</li>
            <li><strong>{otherUser.email}</strong></li>
            <li>Sinds</li>
            <li><strong>{otherUser.joined}</strong></li>
            <li>Notities</li>
            <li><strong>{otherUser.noteCount}</strong></li>
            <li>Volgt</li>
            <li><strong>{otherUser.follows}</strong></li>
            <li>Gevolgd door</li>
            <li><strong>{otherUser.followed}</strong></li>
            <li>&nbsp;</li>
            <li>
              <a href="/" onClick={() => logout()}>{user.username} afmelden</a>
            </li>
          </ul>
        )}
        {!user && !otherUser && (
          <ul>
            <li><Link className={activate("")} to="/">Home</Link></li>
            <li><Link className={activate("signin")} to="/signin">Aanmelden</Link></li>
            <li><Link className={activate("signup")} to="/signup">Registreren</Link></li>
          </ul>
        )}
        {error && (
          <ul>
            <li>&nbsp;</li>
            <li>Foutje...</li>
            <li><Link className={activate("signin")} to="/signin">Aanmelden</Link></li>
            <li><Link className={activate("signup")} to="/signup">Registreren</Link></li>
          </ul>
        )}
      </nav>
    </aside>
  )
}

export default Sidebar;
