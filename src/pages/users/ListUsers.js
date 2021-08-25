import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import makeUrl from '../../helpers/MakeUrl';
import makeHeaders from '../../helpers/MakeHeaders';
import './ListUsers.css';

function ListUsers() {
  const [privateContent, setPrivateContent] = useState(null);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const { page } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    function getUsers() {
      setError("");
      axios.get(makeUrl(`/api/users?page=${page ? page : 0}&size=19`), makeHeaders(token))
        .then(result =>
          setPrivateContent(result.data))
        .catch(error => {
          console.error(error);
          setError(`Ophalen van gebruikers is niet gelukt (${error})`)
        });
    }

    if (token && user) {
      getUsers();
    }
  }, [token, user, page]);

  return (
    <div className="content content-left">
      {error &&
        <article className="user-error-card">
          <h3>Foutje</h3>
          <p>
            {error}
          </p>
        </article>
      }
      {user && !error && privateContent && (
        privateContent.content.map((usr) => (
          <article className={`user-card ${usr.id === user.id ? 'self' : ''}`} key={usr.id}>
            <h3>
              {usr.id === user.id && (
                <Link to="/profile">{usr.name}</Link>
              )}
              {usr.id !== user.id && (
                <Link to={{ pathname: `/profile/${usr.id}` }}>{usr.name}</Link>
              )}
            </h3>
            <dl>
              <dt>Sinds</dt>
              <dd>{usr.joined}</dd>
              <dt>Email adres</dt>
              <dd>{usr.email}</dd>
              <dt>Aantal notities</dt>
              <dd>{usr.noteCount}</dd>
              <dt></dt>
            </dl>
          </article>
        ))
      )}
    </div>
  )
}

export default ListUsers;
